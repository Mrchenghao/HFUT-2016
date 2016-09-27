var page2 = angular.module('page2-app',[]);

page2.controller('page2Controller',function($scope, $http){
	
	//数据定义
	$scope.gene_name = "";
	$scope.gene_introduction_text = "";
	$scope.production_text = "";
	$scope.abstract_text1 = "";
	$scope.abstract_text2 = "";
	$scope.abstract_text3 = "";
	$scope.keyword1 = [];
	$scope.keyword2 = [];
	$scope.keyword3 = [];
	
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
				$scope.abstract_text1 = data.data[0].paper_abstract;
				$scope.abstract_text2 = data.data[1].paper_abstract;
				$scope.abstract_text3 = data.data[2].paper_abstract;
				$scope.paper_link1 = data.data[0].paper_link;
				$scope.paper_link2 = data.data[1].paper_link;
				$scope.paper_link3 = data.data[2].paper_link;
				$scope.paper_title1 = data.data[0].paper_title;
				$scope.paper_title2 = data.data[1].paper_title;
				$scope.paper_title3 = data.data[2].paper_title;
				$scope.keyword1 = data.data[0].paper_keyword;
				$scope.keyword2 = data.data[1].paper_keyword;
				$scope.keyword3 = data.data[2].paper_keyword;
			}
		});
	}
	
	$scope.init();
	
});