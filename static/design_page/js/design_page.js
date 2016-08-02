var editPro = angular.module('edit-app', ['ngMaterial']);

editPro.controller('designController', function($scope, $mdSidenav, $mdMedia, $http, $mdDialog, $mdToast) {
	$scope.search_info = [];//搜索结果
	
	//获得所有基因
	$scope.getAllGene = function(){
		$http.get("/home/getAllGene").success(function(data) {
			if (data.isSuccessful) {
				var gene_info = data.gene_info;
				for(var i = 0;i < gene_info.length;i++){
					$scope.search_info.push({
						img: gene_info[i].img,
						name: gene_info[i].name
					});
				}
			}
		});
	};

	//侧边栏方法
  	$scope.openLeftMenu = function() {
    	$mdSidenav('left').toggle();
  	};
  	
  	//添加功能标签按钮事件方法
  	$scope.showAddFunctionTagsDialog = function(ev){
  		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
  		$mdDialog.show({
  			controller:AddFunctionTagsCtrl,
  			templateUrl:'html/new_function_tags.tmp.html',
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
  	
  	//页面初始化时显示所有基因
  	$scope.getAllGene();
});

function AddFunctionTagsCtrl($scope, $mdDialog) {
	
  	$scope.hide = function() {
	    $mdDialog.hide();
  	};
  	
  	$scope.cancel = function() {
	    $mdDialog.cancel();
  	};
  	
  	$scope.add_function_tags = function(){
  		
  	};
}