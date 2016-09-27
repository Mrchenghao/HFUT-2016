var bio_pro = angular.module('projectApp', ['ngMaterial','ngAnimate']);

bio_pro.controller('projectController', function($scope, $http, $location, $mdSidenav, $mdDialog, $mdMedia, $mdToast) {
	$scope.project_info = [];//项目列表
	$scope.isEdit = false;//默认编辑状态为未编辑
//	$scope.isChosen = false;//默认未选中
	$scope.device_img_src = './img/logo_design.png';//主体图
//	$scope.addr = "";
//	$scope.chain_addr = "";
	$scope.length = 0;
	$scope.new_project_track = "";
	$scope.new_project_name = "";
	$scope.tracks = [];
	
	//反转分支的显示状态
	// $scope.toggle_device = function(index){
	// 	$scope.addr = $scope.project_info[index].name;
	// 	$scope.chain_addr = "";
	// 	$scope.getDevices(index, $scope.project_info[index].id);
	// 	$scope.project_info[index].isDeviceShowed = !$scope.project_info[index].isDeviceShowed;
	// }
	
	//更新当前页面内容
	$scope.update = function(){
		$scope.project_info = [];
		$scope.init();
	}
	
	//发送http请求从后台数据库导入项目列表到变量project_info中
	$scope.init = function(){
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
			url: '/home/getUserProject',
			method: 'POST',
			data: {
				token: login_token
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				var projects = data.data;
				for (var i = 0;i < projects.length;i++) {
					$scope.project_info.push({
						id:projects[i].project_id,
						name:projects[i].project_name,
						devices:[],
						isDeviceShowed:true,
						track:projects[i].track,
						function:projects[i].function,
						creator:projects[i].creator
					});
				}
			}
		});
	}
	
	//发送http请求获取下标为index对应的project_info的所有分支
	$scope.getDevices = function(index, id){
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
			url: '/home/getProjectDevices',
			method: 'POST',
			data: {
				token: login_token,
				project_id: id
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data) {
			console.log(data)
			$scope.project_info[index].devices = data.data;
		});
	}
	
	//点击分支事件，反转isChosen状态，改为选中；同步中间基因链的图
	$scope.device_clicked = function(device_id,device_name,project_id,len) {
//		$scope.isChosen = true;
		$scope.length = len;
//		$scope.chain_addr = device_name;
		sessionStorage.setItem('chain_id',JSON.stringify(device_id));
		sessionStorage.setItem('project_id',JSON.stringify(project_id));
        var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
            url: '/design/getResultImage',
            method: 'POST',
            data: {
                token: login_token,
                project_id: project_id,
                chain_id: device_id
            },
            headers: { 'Content-Type': 'application/json'}
        };
        $http(opt).success(function(data) {
            if (data.successful) {
                $scope.device_img_src = data.data;
            }
        });
	}
	
	//反转编辑状态
	 $scope.toggle_edit  = function(){
	 	$scope.isEdit = !$scope.isEdit;
	 }
	
	//删除分支
	$scope.delete_device = function(device_id){
		
	}
	
	//侧边栏方法
  	// $scope.openLeftMenu = function() {
   //  	$mdSidenav('left').toggle();
  	// };

  	$scope.showNewProjectDialog = function() {
  		Custombox.open({
            target:'./html/new_project.html',
            effect:'swell',
        });
        e.preventDefault();
        
		$http.get('/home/getTracks').success(function(data){
			if (data.successful) {
				$scope.tracks = data.data;
				console.log($scope.tracks);
			}
		});
  	}
  	
  	$scope.jumpToDesign = function(){
  		window.location.href = "../design_page/design_page.html";
  	}
  	
  	$scope.jumpToSystem = function(){
  		window.location.href = "../system_page/system_page.html";
  	}
  	
  	$scope.jumpToGene = function(){
  		window.location.href = "../gene_page/gene_page.html";
  	}
  	
  	//显示新建分支窗口
  	// $scope.showNewDeviceDialog = function(ev, project_id){
  	// 	var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
  	// 	$mdDialog.show({
  	// 		controller:NewDeviceCtrl,
  	// 		templateUrl:'html/new_device.tmp.html',
  	// 		parent:angular.element(document.body),
  	// 		targetEvent:ev,
  	// 		clickOutsideToClose:true,
  	// 		fullscreen:useFullScreen,
  	// 		locals:{$http:$http, $mdToast:$mdToast, project_id:project_id}
  	// 	}).then(function(answer){
  	// 		$scope.update();
  	// 	}, function(){
  	// 		$scope.update();
  	// 	});
  	// 	$scope.$watch(function(){
  	// 		return $mdMedia('xs') || $mdMedia('sm');
  	// 	}, function(wantsFullScreen){
  	// 		$scope.customFullscreen = (wantsFullScreen === true);
  	// 	});
  	// }
  	
  	// 显示新建项目窗口
  	// $scope.showNewProjectDialog = function(ev){
  	// 	var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
  	// 	$mdDialog.show({
  	// 		controller:NewProjectCtrl,
  	// 		templateUrl:'html/new_project.tmp.html',
  	// 		parent:angular.element(document.body),
  	// 		targetEvent:ev,
  	// 		clickOutsideToClose:true,
  	// 		fullscreen:useFullScreen,
  	// 		locals:{$http:$http, $mdToast:$mdToast}
  	// 	}).then(function(answer){
  	// 		$scope.update();
  	// 	}, function(){
  	// 		$scope.update();
  	// 	});
  	// 	$scope.$watch(function(){
  	// 		return $mdMedia('xs') || $mdMedia('sm');
  	// 	}, function(wantsFullScreen){
  	// 		$scope.customFullscreen = (wantsFullScreen === true);
  	// 	});
  	// }
	
	//删除项目
	$scope.delete_project = function(index, id){
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
			url: '/home/deleteProject',
			method: 'POST',
			data: JSON.stringify({
				token: login_token,
				project_id:id
			}),
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if (data.successful) {
				$scope.project_info.splice(index, 1);
				showToast($mdToast, "Project deleted successfully");
			} else{
				showToast($mdToast, "Project deleted FAILED");
			}
		});
	}
	
	//显示登出窗口
  	// $scope.showLogOutDialog = function(ev){
  	// 	var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
  	// 	$mdDialog.show({
  	// 		controller:LogOutCtrl,
  	// 		templateUrl:'html/logout.tmp.html',
  	// 		parent:angular.element(document.body),
  	// 		targetEvent:ev,
  	// 		clickOutsideToClose:true,
  	// 		fullscreen:useFullScreen,
  	// 		locals:{$http:$http, $mdToast:$mdToast}
  	// 	}).then(function(answer){
  			
  	// 	}, function(){
  			
  	// 	});
  	// 	$scope.$watch(function(){
  	// 		return $mdMedia('xs') || $mdMedia('sm');
  	// 	}, function(wantsFullScreen){
  	// 		$scope.customFullscreen = (wantsFullScreen === true);
  	// 	});
  	// }
  	
  	//显示修改密码窗口
  	// $scope.showChangePasswordDialog = function(ev){
  	// 	var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
  	// 	$mdDialog.show({
  	// 		controller:ChangePasswordCtrl,
  	// 		templateUrl:'html/change_password.tmp.html',
  	// 		parent:angular.element(document.body),
  	// 		targetEvent:ev,
  	// 		clickOutsideToClose:true,
  	// 		fullscreen:useFullScreen,
  	// 		locals:{$http:$http, $mdToast:$mdToast}
  	// 	}).then(function(answer){
  			
  	// 	}, function(){
  			
  	// 	});
  	// 	$scope.$watch(function(){
  	// 		return $mdMedia('xs') || $mdMedia('sm');
  	// 	}, function(wantsFullScreen){
  	// 		$scope.customFullscreen = (wantsFullScreen === true);
  	// 	});
  	// }
	
	// 页面初始化
	$scope.init();
  	
});

// function NewDeviceCtrl($scope, $mdDialog, $http, $mdToast, project_id){
// 	$scope.new_device_name = "";
// 	$scope.project_id = project_id;
	
// 	$scope.hide = function(){
// 		$mdDialog.hide();
// 	}
	
// 	$scope.cancel = function(){
// 		$mdDialog.cancel();
// 	}
	
// 	$scope.create_device = function(){
// 		var login_token = JSON.parse(sessionStorage.getItem('login'));
// 		var opt = {
// 			url: "/home/createProjectDevice",
// 			method: 'POST',
// 			data: JSON.stringify({
// 				token: login_token,
// 				device_name: $scope.new_device_name,
// 				project_id: project_id
// 			}),
// 			headers: {'Content-Type': 'applicaiton/json'}
// 		}
// 		$http(opt).success(function(data){
// 			if ($scope.new_device_name.length == 0) {
// 				return;
// 			} else{
// 				if (data.successful) {
// 					$mdDialog.hide();
// 					showToast($mdToast, "Device created SUCCESS");
// 				} else{
// 					$mdDialog.hide();
// 					showToast($mdToast, "Device created FAILED");
// 				}
// 			}
// 		})
// 	}
// }

//function NewProjectCtrl($scope, $mdDialog, $http, $mdToast){
//	$scope.tracks = [];
//	$scope.new_project_track = "";
//	$scope.new_project_name = "";
//	
//	$scope.init = function(){
//		$http.get('/home/getTracks').success(function(data){
//			if (data.successful) {
//				$scope.tracks = data.data;
//				console.log($scope.tracks);
//			}
//		});
//	}
//	
//	$scope.init();
//	
//	$scope.hide = function(){
//		$mdDialog.hide();
//	}
//	
//	$scope.cancel = function(){
//		$mdDialog.cancel();
//	}
//	
//	$scope.create_project = function(new_project_name, new_project_track){
//		// if (new_project_track.length == 0 || new_project_name.length == 0) {
//		// 	return;
//		// } else{
//			console.log(new_project_name);
//			var login_token = JSON.parse(sessionStorage.getItem('login'));
//			var opt = {
//				url: '/home/createNewProject',
//				method: 'POST',
//				data: JSON.stringify({
//					token: login_token,
//					project_name: new_project_name,
//					track: new_project_track,
//				}),
//				headers: {'Content-Type': 'application/json'}
//			};
//			$http(opt).success(function(data){
//				if (data.successful) {
//					$mdDialog.hide();
//					showToast($mdToast, "Project created successfully");
//				} else{
//					$mdDialog.hide();
//					showToast($mdToast, "Project created FAILED");
//				}
//			});
//		// }
//	}
//}

// function LogOutCtrl($scope, $mdDialog, $http){
	
// 	$scope.hide = function(){
// 		$mdDialog.hide();
// 	}
	
// 	$scope.cancel = function(){
// 		$mdDialog.cancel();
// 	}
	
// 	$scope.log_out = function(){
// 		var login_token = JSON.parse(sessionStorage.getItem('login'));
// 		var opt = {
// 			url: '/accounts/logout',
// 			method: 'POST',
// 			data: JSON.stringify({
// 				token: login_token,
// 			}),
// 			headers: {'Content-Type': 'application/json'}
// 		};
// 		$http(opt).success(function(data){
// 			if (data.successful) {
// 				$mdDialog.hide();
// 				window.location.href = "../login_register/login_register.html";
// 			} else{
				
// 			}
// 		});
		
// 	}
// }

// function ChangePasswordCtrl($scope, $mdDialog, $http, $mdToast){
	
// 	$scope.old_password = "";
// 	$scope.new_password = "";
// 	$scope.re_password = "";
	
// 	$scope.hide = function(){
// 		$mdDialog.hide();
// 	}
	
// 	$scope.cancel = function(){
// 		$mdDialog.cancel();
// 	}
	
// 	$scope.change_password = function(old_password,new_password,re_password){
// 	 	if (old_password.length == 0 || new_password.length == 0 || re_password.length == 0) {
// 		 	return;
// 	 	} else {
// 			var login_token = JSON.parse(sessionStorage.getItem('login'));
// 			var opt = {
// 				url: '/accounts/changePassword',
// 				method: 'POST',
// 				data: JSON.stringify({
// 					token: login_token,
// 					old_password: old_password,
// 					new_password: new_password,
// 					re_password: re_password
// 				}),
// 				headers: {'Content-Type': 'application/json'}
// 			};
// 			$http(opt).success(function(data){
// 				if (data.successful) {
// 					$mdDialog.hide();
// 					showToast($mdToast, "Password changed successfully");
// 				} else{
// 					$mdDialog.hide();
// 					showToast($mdToast, "Password changed FAILED");
// 				}
// 			});
// 	 	}
// 	}
// }

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
