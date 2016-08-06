var system = angular.module('sys-app',['ngMaterial','ngAnimate']);

system.controller('systemController',function($scope, $http, $location, $mdSidenav, $mdDialog, $mdMedia, $mdToast){
	
	$scope.compound_info = [];
	
	$scope.getCompoundResult = function(key_word){
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
			url: '/system/searchCompound',
			method: 'POST',
			data: {
				token: login_token,
				key_word: key_word,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				var compound_result = data.data;
				for (var i = 0;i < compound_result.length;i++) {
					$scope.compound_info.push({
						name: compound_result[i].name,
					});
				}
			}
		});
	}
	
	$scope.compound_by_keyboard = function($event,key_word){
		if (event.keyCode == 13) {
			getCompoundResult(key_word);
		}
	}
});
