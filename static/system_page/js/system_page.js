var system = angular.module('sys-app',['ngMaterial','ngAnimate']);

system.controller('systemController',function($scope, $http, $location, $mdSidenav, $mdDialog, $mdMedia, $mdToast){
	
	$scope.compound_info = [];//侧边栏数据
	$scope.compound_tags = [];//导航栏数据
	
	$scope.jumpToSystem = function(){
  		window.location.href = "../system_page/system_page.html";
  	}
	
	$scope.jumpToGene = function(){
  		window.location.href = "../gene_page/gene_page.html";
  	}
	
	$scope.jumpToProject = function(){
  		window.location.href = "../project_page/project_page.html";
  	}
	
	$scope.getCompoundResult = function(key_word){
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
			url: '/system/searchCompound',
			method: 'POST',
			data: {
				token: login_token,
				keyword: key_word,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				$scope.compound_info = [];
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
			url: '/system/getCompound',
			method: 'POST',
			data: {
				token: login_token,
				compound_id: id,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				$scope.compound_id = data.data.compound_id;
				$scope.name = data.data.name;
				$scope.nick_name = data.data.nicknames;
				$scope.mol_weight = data.data.mol_weight;
				$scope.exact_mass = data.data.exact_mass;
				$scope.formula = data.data.formula;
			}
		});
	}
	
	$scope.addCompoundTags = function(compound){
		if($scope.compound_tags.indexOf(compound) == -1)
			$scope.compound_tags.push(compound);
	}
	
	$scope.removeAllCompoundTags = function(){
		$scope.compound_tags = [];
	}
	
	$scope.runCompoundTags = function(){
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
			url: '/system/getRelatedCompound',
			method: 'POST',
			data: {
				token: login_token,
				compound_tags: $scope.compound_tags,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				draw(data.data);
			}
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
});

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