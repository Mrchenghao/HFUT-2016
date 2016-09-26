var page2 = angular.module('page2-app',[]);

page2.controller('page2Controller',function($scope, $http){
	
	$scope.gene_name = "";
	$scope.gene_introduction_text = "";
	$scope.production_text = "";
	$scope.abstract_text1 = "";
	$scope.abstract_text2 = "";
	$scope.abstract_text3 = "";
	$scope.keyword1 = [];
	$scope.keyword2 = [];
	$scope.keyword3 = [];
	
	$scope.init = function(){
		var gene_id = sessionStorage.getItem("gene_id");
		var opt = {
			url: '/geneRelationship/searchGenes',
			method: 'POST',
			data: {
				gene_id: gene_id,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				$scope.gene_name = "";
				$scope.gene_introduction_text = "";
				$scope.production_text = "";
				$scope.abstract_text1 = "";
				$scope.abstract_text2 = "";
				$scope.abstract_text3 = "";
				$scope.keyword1 = [];
				$scope.keyword2 = [];
				$scope.keyword3 = [];
			}
		});
	}
	
	$scope.init();
	
});