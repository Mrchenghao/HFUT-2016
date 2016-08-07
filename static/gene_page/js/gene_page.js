var gene = angular.module('gene-app',['ngMaterial','ngAnimate']);

gene.controller('geneController',function($scope, $http, $location, $mdSidenav, $mdDialog, $mdMedia, $mdToast){
	
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
	
	$scope.getGeneInfo = function(key_word){
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
			url: '/geneRelationship/searchGenes',
			method: 'POST',
			data: {
				token: login_token,
				keyword: key_word,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				$scope.gene_info = [];
				var gene_result = data.data;
				console.log(gene_result);
				for (var i = 0;i < gene_result.length;i++) {
					$scope.gene_info.push({
						name: gene_result[i],
					});
				}
			}
		});
	}
	
	//显示登出窗口
  	$scope.showLogOutDialog = function(ev){
  		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
  		$mdDialog.show({
  			controller:LogOutCtrl,
  			templateUrl:'html/logout.tmp.html',
  			parent:angular.element(document.body),
  			targetEvent:ev,
  			clickOutsideToClose:true,
  			fullscreen:useFullScreen,
  			locals:{$http:$http, $mdToast:$mdToast}
  		}).then(function(answer){
  			
  		}, function(){
  			
  		});
  		$scope.$watch(function(){
  			return $mdMedia('xs') || $mdMedia('sm');
  		}, function(wantsFullScreen){
  			$scope.customFullscreen = (wantsFullScreen === true);
  		});
  	}
  	
  	//显示修改密码窗口
  	$scope.showChangePasswordDialog = function(ev){
  		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
  		$mdDialog.show({
  			controller:ChangePasswordCtrl,
  			templateUrl:'html/change_password.tmp.html',
  			parent:angular.element(document.body),
  			targetEvent:ev,
  			clickOutsideToClose:true,
  			fullscreen:useFullScreen,
  			locals:{$http:$http, $mdToast:$mdToast}
  		}).then(function(answer){
  			
  		}, function(){
  			
  		});
  		$scope.$watch(function(){
  			return $mdMedia('xs') || $mdMedia('sm');
  		}, function(wantsFullScreen){
  			$scope.customFullscreen = (wantsFullScreen === true);
  		});
  	}
	
});

function LogOutCtrl($scope, $mdDialog, $http){
	
	$scope.hide = function(){
		$mdDialog.hide();
	}
	
	$scope.cancel = function(){
		$mdDialog.cancel();
	}
	
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
				$mdDialog.hide();
				window.location.href = "../login_register/login_register.html";
			} else{
				
			}
		});
		
	}
}

function ChangePasswordCtrl($scope, $mdDialog, $http, $mdToast){
	
	$scope.old_password = "";
	$scope.new_password = "";
	$scope.re_password = "";
	
	$scope.hide = function(){
		$mdDialog.hide();
	}
	
	$scope.cancel = function(){
		$mdDialog.cancel();
	}
	
	$scope.change_password = function(old_password,new_password,re_password){
	 	if (old_password.length == 0 || new_password.length == 0 || re_password.length == 0) {
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
					$mdDialog.hide();
					showToast($mdToast, "Password changed successfully");
				} else{
					$mdDialog.hide();
					showToast($mdToast, "Password changed FAILED");
				}
			});
	 	}
	}
}

var last = {
	bottom: false,
	top: true,
	left: false,
	right: true
};

var toastPosition = angular.extend({},last);

function sanitizePosition(){
	var current = toastPosition;
	if (current.bottom && last.top) current.top = false;
	if (current.top && last.bottom) current.bottom = false;
	if (current.right && last.left) current.left = false;
	if (current.left && last.right) current.right = false;
	last = angular.extend({},current);
}

var getToastPosition = function(){
	sanitizePosition();
	return Object.keys(toastPosition)
		.filter(function(pos) { return toastPosition[pos]; })
		.join(' ');
} 

function showToast($mdToast, msg){
	var pinTo = getToastPosition();
	var toast = $mdToast.simple()
		.textContent(msg)
		.highlightAction(true)
		.position(pinTo);
	$mdToast.show(toast).then(function(response){
		if(response == 'ok'){
			
		}
	});
}