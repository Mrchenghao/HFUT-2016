var system = angular.module('sys-app',['ngMaterial','ngAnimate']);

system.controller('systemController',function($scope, $http, $location, $mdSidenav, $mdDialog, $mdMedia, $mdToast){
	
	$scope.compound_info = [];//侧边栏数据
	$scope.compound_tags = [];//导航栏数据
	
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
						id: compound_result[i].compound_id,
					});
				}
			}
		});
	}
	
	$scope.compound_by_keyboard = function($event,key_word){
		if ($event.keyCode == 13) {
			$scope.getCompoundResult(key_word);
		}
	}
	
	$scope.getCompoundInfo = function(id){
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
			url: '/system/searchCompound',
			method: 'POST',
			data: {
				token: login_token,
				id: id,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				$scope.compound_id = data.data.part.compound_id;
				$scope.name = data.data.part.name;
				$scope.nick_name = data.data.part.nick_name;
				$scope.mol_weight = data.data.part.mol_weight;
				$scope.exact_mass = data.data.part.exact_mass;
				$scope.formula = data.data.formula;
			}
		});
	}
	
	$scope.addCompoundTags = function(name){
		$scope.compound_tags.push(name);
	}
});
