var bio_pro = angular.module('bio-app', ['ngMaterial','ngAnimate']);

bio_pro.controller('proController', function($scope, $http, $location, $mdSidenav, $mdDialog, $mdMedia, $mdToast) {
	$scope.project_info = [];//项目列表
	$scope.isEdit = false;//默认编辑状态为未编辑
	$scope.isChosen = false;//默认未选中
	$scope.device_img_src = "img/logo_design.png";//主体图
	$scope.length = 0;
	
	//反转分支的显示状态
	$scope.toggle_device = function(index){
		$scope.getDevices(index, $scope.project_info[index].id);
		$scope.project_info[index].isDeviceShowed = !$scope.project_info[index].isDeviceShowed;
	}
	
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
	$scope.device_clicked = function(device_id) {
		$scope.isChosen = true;
		$http.get("/home/getResultImage?id=" + device_id).success(function(data) {
			if (data.isSuccessful) {
				console.log(data);
				$scope.device_img_src = data.filePath;
			} else {
				console.log(data);
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
  	$scope.openLeftMenu = function() {
    	$mdSidenav('left').toggle();
  	};
  	
  	//显示新建分支窗口
  	$scope.showNewDeviceDialog = function(ev, project_id){
  		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
  		$mdDialog.show({
  			controller:NewDeviceCtrl,
  			templateUrl:'html/new_device.tmp.html',
  			parent:angular.element(document.body),
  			targetEvent:ev,
  			clickOutsideToClose:true,
  			fullscreen:useFullScreen,
  			locals:{$http:$http, $mdToast:$mdToast, project_id:project_id}
  		}).then(function(answer){
  			$scope.update();
  		}, function(){
  			$scope.update();
  		});
  		$scope.$watch(function(){
  			return $mdMedia('xs') || $mdMedia('sm');
  		}, function(wantsFullScreen){
  			$scope.customFullscreen = (wantsFullScreen === true);
  		});
  	}
  	
  	//显示新建项目窗口
  	$scope.showNewProjectDialog = function(ev){
  		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
  		$mdDialog.show({
  			controller:NewProjectCtrl,
  			templateUrl:'html/new_project.tmp.html',
  			parent:angular.element(document.body),
  			targetEvent:ev,
  			clickOutsideToClose:true,
  			fullscreen:useFullScreen,
  			locals:{$http:$http, $mdToast:$mdToast}
  		}).then(function(answer){
  			$scope.update();
  		}, function(){
  			$scope.update();
  		});
  		$scope.$watch(function(){
  			return $mdMedia('xs') || $mdMedia('sm');
  		}, function(wantsFullScreen){
  			$scope.customFullscreen = (wantsFullScreen === true);
  		});
  	}
	
	//删除项目
	$scope.delete_project = function(index, id){
		var opt = {
			url: '/home/deleteProject',
			method: 'POST',
			data: JSON.stringify({
				id:id
			}),
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if (data.isSuccessful) {
				$scope.project_info.splice(index, 1);
				showToast($mdToast, "Project deleted successfully");
			} else{
				showToast($mdToast, "Project deleted FAILED");
			}
		});
	}
	
	// 页面初始化
	$scope.init();
  	
});

function NewDeviceCtrl($scope, $mdDialog, $http, $mdToast, project_id){
	$scope.new_device_name = "";
	$scope.project_id = project_id;
	
	$scope.hide = function(){
		$mdDialog.hide();
	}
	
	$scope.cancel = function(){
		$mdDialog.cancel();
	}
	
	$scope.create_device = function(){
		var opt = {
			url: "/home/newDevice",
			method: 'POST',
			data: JSON.stringify({
				name: $scope.new_device_name,
				id: project_id
			}),
			headers: {'Content-Type': 'applicaiton/json'}
		}
		$http(opt).success(function(data){
			if ($scope.new_device_name.length == 0) {
				return;
			} else{
				if (data.isSuccessful) {
					$mdDialog.hide();
					showToast($mdToast, "Device created SUCCESS");
				} else{
					$mdDialog.hide();
					showToast($mdToast, "Device created FAILED");
				}
			}
		})
	}
}

function NewProjectCtrl($scope, $mdDialog, $http, $mdToast){
	$scope.tracks = [];
	$scope.new_project_track = "";
	$scope.new_project_name = "";
	
	$scope.init = function(){
		$http.get('/home/getTracks').success(function(data){
			if (data.successful) {
				$scope.tracks = data.data;
				console.log($scope.tracks);
			}
		});
	}
	
	$scope.init();
	
	$scope.hide = function(){
		$mdDialog.hide();
	}
	
	$scope.cancel = function(){
		$mdDialog.cancel();
	}
	
	$scope.create_project = function(){
		if ($scope.new_project_track.length == 0 || $scope.new_project_name.length == 0) {
			return;
		} else{
			var opt = {
				url: '/home/newProject',
				method: 'POST',
				data: JSON.stringify({
					name: $scope.new_project_name,
					track: $scope.new_project_track
				}),
				headers: {'Content-Type': 'application/json'}
			};
			$http(opt).success(function(data){
				if (data.isSuccessful) {
					$mdDialog.hide();
					showToast($mdToast, "Project created successfully");
				} else{
					$mdDialog.hide();
					showToast($mdToast, "Project created FAILED");
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
