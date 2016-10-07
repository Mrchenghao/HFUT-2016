var gi = angular.module('geneInfoApp',[]);

gi.controller('geneInfoController',function($scope, $http){
	
	//数据定义
	$scope.gene_name = "";
	$scope.gene_definition = "";
	$scope.gene_url = "";
	$scope.gene_info = [];
	
	$scope.jumpToSystem = function(){
  		window.location.href = "../system_page/system_page.html";
  	}
	
	$scope.jumpToGene = function(){
  		window.location.href = "../gene_page/gene_page.html";
  	}
	
	$scope.jumpToProject = function(){
  		window.location.href = "../project_page/project_page.html";
  	}
	//修改密码模态框
	$scope.changePasswordDialog = function(){
		Custombox.open({
            target:'#cgPwd',
            effect:'fadein',
       	});
	}
	//确认修改密码
	$scope.change_password = function(old_password,new_password,re_password){
   	 	if (old_password.length == 0 || new_password.length == 0 || re_password.length == 0) {
   	 		Custombox.close();
   	 		showToast($mdToast, "Please Complete Your Info");
   		 	return;
   	 	} else {
   			var login_token = JSON.parse(sessionStorage.getItem('login'));
   			var opt = {
   				url: '/accounts/changePassword',
   				method: 'POST',
   				data: JSON.stringify({
   					token: login_token,
   					old_password: old_password,
   					new_password: new_password,
   					re_password: re_password
   				}),
   				headers: {'Content-Type': 'application/json'}
   			};
   			$http(opt).success(function(data){
   				if (data.successful) {
   					Custombox.close();
   					showToast($mdToast, "Password changed successfully");
   				} else{
   					Custombox.close();
   					showToast($mdToast, "Password changed FAILED");
   				}
   			});
   	 	}
   	}
	//登出模态框
	$scope.logoutDialog = function(){
		Custombox.open({
            target:'#logout',
            effect:'fadein',
       	});
	}
	//确认登出
	$scope.log_out = function(){
   		var login_token = JSON.parse(sessionStorage.getItem('login'));
   		var opt = {
   			url: '/accounts/logout',
   			method: 'POST',
   			data: JSON.stringify({
   				token: login_token,
   			}),
   			headers: {'Content-Type': 'application/json'}
   		};
   		$http(opt).success(function(data){
   			if (data.successful) {
   				Custombox.close();
   				window.location.href = "../login_register/login_register.html";
   			} else{
				Custombox.close();
				showToast($mdToast, "Something Strange Happened!!!");
   			}
   		});
   	}
	//网页初始化
	$scope.init = function(){
		var gene_name = sessionStorage.getItem("gene_name");
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
			url: '/geneRelationship/getGeneInfo',
			method: 'POST',
			data: {
				token: login_token,
				gene_name: gene_name,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				$scope.gene_name = gene_name;
				$scope.gene_definition = data.data.definition;
				$scope.gene_organism = data.data.organism;
				$scope.gene_url = data.data.gene_url;
			}
		});

		var opt = {
			url: '/geneRelationship/getRelatedPaper',
			method: 'POST',
			data: {
				token: login_token,
				gene_name: gene_name,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				data.data.forEach(function(r, index) {
					if(!r.paper_keyword.length)
						r.paper_keyword = 'None';
					$scope.gene_info.push({
						index: index,
						paper_title: r.paper_title,
						paper_link: r.paper_link,
						paper_keyword: r.paper_keyword,
						paper_abstract: r.paper_abstract,
					})
				});
			}
		});
		
		var opt = {
			url: '/geneRelationship/getRelatedGene',
			method: 'POST',
			data: {
				token: login_token,
				gene_name: gene_name,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				draw(data.data);
			}
		});
	}
	
	$scope.init();
});