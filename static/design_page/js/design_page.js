var editPro = angular.module('edit-app', ['ngMaterial']);

editPro.controller('designController', function($scope, $mdSidenav, $mdMedia, $http, $mdDialog, $mdToast) {
	$scope.search_info = [];//搜索结果
	
	//获得搜索结果
	$scope.getSearchResult = function(key_word){
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
			url: '/home/getSearchResult',
			method: 'POST',
			data: {
				token: login_token,
				key_word: key_word
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				var search_result = data.data;
				for (var i = 0;i < search_result.length;i++) {
					$scope.search_info.push({
						img: search_result[i].img,
						name: search_result[i].name
					});
				}
			}
		});
	}

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