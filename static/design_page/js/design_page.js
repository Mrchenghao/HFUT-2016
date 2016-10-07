var editPro = angular.module('designApp', ['ngMaterial','ngAnimate','dndLists']);

editPro.controller('designController', function($scope, $mdSidenav, $mdMedia, $http, $mdDialog, $mdToast) {
	$scope.search_info = [];//搜索结果
	$scope.chain_info = [];//用户编辑的基因链
//  $scope.chain_new = [];
    $scope.delete_gene = [];
    $scope.recommend_info = [];
    $scope.float_right = false;
    $scope.float_left = true;
    
    $scope.list = {
        "A": $scope.search_info,
        "B": [
            {
                "type": "item",
                "id": 7
            },
            {
                "type": "item",
                "id": "8"
            },
            {
                "type": "item",
                "id": 16
            }
        ]
    }
    
    $scope.jumpToSystem = function(){
  		window.location.href = "../system_page/system_page.html";
  	}

	$scope.jumpToGene = function(){
  		window.location.href = "../gene_page/gene_page.html";
  	}
	
	$scope.jumpToProject = function(){
  		window.location.href = "../project_page/project_page.html";
  	}
	//修改密码模态框
	$scope.changePasswordDialog = function(){
		Custombox.open({
            target:'#cgPwd',
            effect:'fadein',
       	});
	}
	//确认修改密码
	$scope.change_password = function(old_password,new_password,re_password){
   	 	if (old_password.length == 0 || new_password.length == 0 || re_password.length == 0) {
   	 		Custombox.close();
   	 		showToast($mdToast, "Please Complete Your Info");
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
   					Custombox.close();
   					showToast($mdToast, "Password changed successfully");
   				} else{
   					Custombox.close();
   					showToast($mdToast, "Password changed FAILED");
   				}
   			});
   	 	}
   	}
	//登出模态框
	$scope.logoutDialog = function(){
		Custombox.open({
            target:'#logout',
            effect:'fadein',
       	});
	}
	//确认登出
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
   				Custombox.close();
   				window.location.href = "../login_register/login_register.html";
   			} else{
				Custombox.close();
				showToast($mdToast, "Something Strange Happened!!!");
   			}
   		});
   	}
    //拖动配置(user)
//	$scope.putConfig = {
//		group: {
//			name:'d_gene',
//          pull:true,
//          put:['s_gene','r_gene'],
//		},
//		animation: 150,
//		onUpdate: function(evt) {
//			var login_token = JSON.parse(sessionStorage.getItem('login'));
//			var chain_id = JSON.parse(sessionStorage.getItem('chain_id'));
//			var project_id = JSON.parse(sessionStorage.getItem('project_id'));
//			var part_id = $scope.chain_info[$scope.chain_info.length - 1].part_id;
//          $scope.getMrkvChain(part_id);
//
//          for (var i = 0;i < $scope.chain_info.length;i++) {
//              if ((Math.floor(i / 5) + 1) % 2 == 0) {
//                  $scope.chain_info[i].float_right = true;
//                  $scope.chain_info[i].float_left = false;
//                  if ((i + 1) % 5 == 0) {
//                      //头
//                      $scope.chain_info[i].rb = true;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = false;
//                  } else if (i % 5 == 0) {
//                      //尾
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = true;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = false;
//                  } else {
//                      //中间
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = true;
//                  }
//              } else {
//                  $scope.chain_info[i].float_right = false;
//                  $scope.chain_info[i].float_left = true;
//                  if ((i + 1) % 5 == 0) {
//                      //尾
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = true;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = false;
//                  } else if (i % 5 == 0) {
//                      //头
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = true;
//                      $scope.chain_info[i].line = false;
//                  } else {
//                      //中间
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = true;
//                  }
//              }
//          }
//
//			var opt = {
//				url: '/design/updateChain',
//				method: 'POST',
//				data: {
//					token: login_token,
//					project_id: project_id,
//					chain_id: chain_id,
//					chain_info: evt.models,
//				},
//				headers: { 'Content-Type': 'application/json'}
//			};
//
//			$http(opt).success(function(data) {
//  			if (data.successful) {
//  				showToast($mdToast,"save SUCCESS!");
//  			}
//  		});
//		},
//      onAdd: function(evt) {
//          console.log($scope.chain_info);
//          var login_token = JSON.parse(sessionStorage.getItem('login'));
//          var chain_id = JSON.parse(sessionStorage.getItem('chain_id'));
//          var project_id = JSON.parse(sessionStorage.getItem('project_id'));
//          var part_id = $scope.chain_info[$scope.chain_info.length - 1].part_id;
//          $scope.getMrkvChain(part_id);
//
//          for (var i = 0;i < $scope.chain_info.length;i++) {
//              if ((Math.floor(i / 5) + 1) % 2 == 0) {
//                  $scope.chain_info[i].float_right = true;
//                  $scope.chain_info[i].float_left = false;
//                  if ((i + 1) % 5 == 0) {
//                      //头
//                      $scope.chain_info[i].rb = true;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = false;
//                  } else if (i % 5 == 0) {
//                      //尾
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = true;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = false;
//                  } else {
//                      //中间
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = true;
//                  }
//              } else {
//                  $scope.chain_info[i].float_right = false;
//                  $scope.chain_info[i].float_left = true;
//                  if ((i + 1) % 5 == 0) {
//                      //尾
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = true;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = false;
//                  } else if (i % 5 == 0) {
//                      //头
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = true;
//                      $scope.chain_info[i].line = false;
//                  } else {
//                      //中间
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = true;
//                  }
//              }
//          }
//          console.log(evt)
//          $scope.chain_new.push({
//              img: evt.model.img,
//              name: evt.model.name,
//              part_id: evt.model.part_id,
//          });
//
//
//          var opt = {
//              url: '/design/updateChain',
//              method: 'POST',
//              data: {
//                  token: login_token,
//                  project_id: project_id,
//                  chain_id: chain_id,
//                  chain_info: $scope.chain_new,
//              },
//              headers: { 'Content-Type': 'application/json'}
//          };
//
//          $http(opt).success(function(data) {
//              if (data.successful) {
//                  showToast($mdToast,"save SUCCESS!");
//              }
//          });
//      },
//      onRemove: function(evt) {
//          console.log('aaa');
//          console.log(evt);
//          var login_token = JSON.parse(sessionStorage.getItem('login'));
//          var chain_id = JSON.parse(sessionStorage.getItem('chain_id'));
//          var project_id = JSON.parse(sessionStorage.getItem('project_id'));
//          
//          var part_id = $scope.chain_info[$scope.chain_info.length - 1].part_id;
//          $scope.getMrkvChain(part_id);
//
//          $scope.chain_info.splice(evt.oldIndex,1);
//          $scope.chain_new = $scope.chain_info.concat();
//          for (var i = 0;i < $scope.chain_info.length;i++) {
//              if ((Math.floor(i / 5) + 1) % 2 == 0) {
//                  $scope.chain_info[i].float_right = true;
//                  $scope.chain_info[i].float_left = false;
//                  if ((i + 1) % 5 == 0) {
//                      //头
//                      $scope.chain_info[i].rb = true;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = false;
//                  } else if (i % 5 == 0) {
//                      //尾
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = true;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = false;
//                  } else {
//                      //中间
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = true;
//                  }
//              } else {
//                  $scope.chain_info[i].float_right = false;
//                  $scope.chain_info[i].float_left = true;
//                  if ((i + 1) % 5 == 0) {
//                      //尾
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = true;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = false;
//                  } else if (i % 5 == 0) {
//                      //头
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = true;
//                      $scope.chain_info[i].line = false;
//                  } else {
//                      //中间
//                      $scope.chain_info[i].rb = false;
//                      $scope.chain_info[i].lt = false;
//                      $scope.chain_info[i].lb = false;
//                      $scope.chain_info[i].rt = false;
//                      $scope.chain_info[i].line = true;
//                  }
//              }
//          }
//          var opt = {
//              url: '/design/updateChain',
//              method: 'POST',
//              data: {
//                  token: login_token,
//                  project_id: project_id,
//                  chain_id: chain_id,
//                  chain_info: $scope.chain_info,
//              },
//              headers: { 'Content-Type': 'application/json'}
//          };
//
//          $http(opt).success(function(data) {
//              if (data.successful) {
//                  showToast($mdToast,"save SUCCESS!");
//              }
//          });
//      },
//	};

    //拖动配置(side)
//	$scope.pullConfig = {
//		group: {
//			name:'s_gene',
//          pull:'clone',
//          put:false,
//		},
//      sort:false,
//		animation: 150,
//      handle:'.handle'
//	};

//  $scope.recommendConfig = {
//      group: {
//          name:'r_gene',
//          pull:'clone',
//          put:false,
//      },
//      sort:false,
//      animation: 150,
//  };

//  $scope.deleteConfig = {
//      group: {
//          name:'delete',
//          pull:false,
//          put:['d_gene'],
//      },
//      sort:true,
//      animation: 150,
//  };


	//页面初始化
	$scope.init = function(){
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var chain_id = JSON.parse(sessionStorage.getItem('chain_id'));
		var project_id = JSON.parse(sessionStorage.getItem('project_id'));
		var opt = {
			url: '/design/getChain',
			method: 'POST',
			data: {
				token: login_token,
				chain_id: chain_id,
				project_id: project_id,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data) {
			if (data.successful) {
				$scope.chain_result = data.data;
				for (var i = 0;i < $scope.chain_result.length;i++) {
                	$scope.chain_new = $scope.chain_result.concat()
					$scope.chain_info.push({
						img: '../img/' + $scope.chain_result[i].part_type + '.png',
						name: $scope.chain_result[i].part_name,
                        part_id:$scope.chain_result[i].part_id,
					});

                    if ((Math.floor(i / 5) + 1) % 2 == 0) {
                        //偶数行
                        $scope.chain_info[i].float_right = true;
                        $scope.chain_info[i].float_left = false;
                        if ((i + 1) % 5 == 0) {
                            //头
                            $scope.chain_info[i].rb = true;
                        } else if (i % 5 == 0) {
                            //尾
                            $scope.chain_info[i].lt = true;
                        } else {
                            //中间
                            $scope.chain_info[i].line = true;
                        }
                    } else {
                        //奇数行
                        $scope.chain_info[i].float_right = false;
                        $scope.chain_info[i].float_left = true;
                        if ((i + 1) % 5 == 0) {
                            //尾
                            $scope.chain_info[i].lb = true;
                        } else if (i % 5 == 0) {
                            //头
                            $scope.chain_info[i].rt = true;
                        } else {
                            //中间
                            $scope.chain_info[i].line = true;
                        }
                    }
				}
			}
		});
	}

	//获得搜索结果
	$scope.getSearchResult = function(key_word){
		var login_token = JSON.parse(sessionStorage.getItem('login'));
		var opt = {
			url: '/design/searchParts',
			method: 'POST',
			data: {
				token: login_token,
				keyword: key_word
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				var search_result = data.data;
                $scope.search_info = [];
				for (var i = 0;i < search_result.length;i++) {
					$scope.search_info.push({
						img: '../img/' + search_result[i].part_type + '.png',
						name: search_result[i].part_name,
						part_id: search_result[i].part_id,
					});
				}
			}
		});
	}
	
	$scope.search_by_keyboard = function($event,key_word){
		console.log('aaa');
      	if($event.keyCode == 13) {//回车
          	$scope.getSearchResult(key_word);
      	}
  	};
  	
  	//获得马尔科夫链
  	$scope.getMrkvChain = function(part_id){
  		var login_token = JSON.parse(sessionStorage.getItem('login'));
  		var opt = {
			url: '/design/getMRecommend',
			method: 'POST',
			data: {
				token: login_token,
				part_id: part_id
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				var recommend_result = data.data;
                console.log(recommend_result)
                $scope.recommend_info = [];
				for (var i = 0;i < recommend_result.length;i++) 
					for (var j = 0;j < recommend_result[i].length;j++){
						$scope.recommend_info.push({
							img: '../img/' + recommend_result[i][j].part_type + '.png',
							name: recommend_result[i][j].part_name,
							part_id: recommend_result[i][j].part_id,
						});
					}
			}
		});
  	};
  	
  	//获得基因信息
  	$scope.getGeneInfo = function(name){
  		var login_token = JSON.parse(sessionStorage.getItem('login'));
  		var opt = {
			url: '/design/getParts',
			method: 'POST',
			data: {
				token: login_token,
				part_name: name,
			},
			headers: { 'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if(data.successful){
				$scope.part_type = data.data.part.part_type;
				$scope.part_nick_name = data.data.part.nickname;
				$scope.part_short_desc = data.data.part.short_desc;
				$scope.description = data.data.part.description;
				$scope.score = data.data.part.score;
				$scope.papers = data.data.paper;
			}
		});
  	}

  	$scope.init();
  	
  	//显示登出窗口
//	$scope.showLogOutDialog = function(ev){
//		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
//		$mdDialog.show({
//			controller:LogOutCtrl,
//			templateUrl:'html/logout.tmp.html',
//			parent:angular.element(document.body),
//			targetEvent:ev,
//			clickOutsideToClose:true,
//			fullscreen:useFullScreen,
//			locals:{$http:$http, $mdToast:$mdToast}
//		}).then(function(answer){
//			
//		}, function(){
//			
//		});
//		$scope.$watch(function(){
//			return $mdMedia('xs') || $mdMedia('sm');
//		}, function(wantsFullScreen){
//			$scope.customFullscreen = (wantsFullScreen === true);
//		});
//	}
  	
  	//显示修改密码窗口
//	$scope.showChangePasswordDialog = function(ev){
//		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
//		$mdDialog.show({
//			controller:ChangePasswordCtrl,
//			templateUrl:'html/change_password.tmp.html',
//			parent:angular.element(document.body),
//			targetEvent:ev,
//			clickOutsideToClose:true,
//			fullscreen:useFullScreen,
//			locals:{$http:$http, $mdToast:$mdToast}
//		}).then(function(answer){
//			
//		}, function(){
//			
//		});
//		$scope.$watch(function(){
//			return $mdMedia('xs') || $mdMedia('sm');
//		}, function(wantsFullScreen){
//			$scope.customFullscreen = (wantsFullScreen === true);
//		});
//	}
});

//function LogOutCtrl($scope, $mdDialog, $http){
//	
//	$scope.hide = function(){
//		$mdDialog.hide();
//	}
//	
//	$scope.cancel = function(){
//		$mdDialog.cancel();
//	}
//	
//	$scope.log_out = function(){
//		var login_token = JSON.parse(sessionStorage.getItem('login'));
//		var opt = {
//			url: '/accounts/logout',
//			method: 'POST',
//			data: JSON.stringify({
//				token: login_token,
//			}),
//			headers: {'Content-Type': 'application/json'}
//		};
//		$http(opt).success(function(data){
//			if (data.successful) {
//				$mdDialog.hide();
//				window.location.href = "../login_register/login_register.html";
//			} else{
//				
//			}
//		});
//		
//	}
//}

//function ChangePasswordCtrl($scope, $mdDialog, $http, $mdToast){
//	
//	$scope.old_password = "";
//	$scope.new_password = "";
//	$scope.re_password = "";
//	
//	$scope.hide = function(){
//		$mdDialog.hide();
//	}
//	
//	$scope.cancel = function(){
//		$mdDialog.cancel();
//	}
//	
//	$scope.change_password = function(old_password,new_password,re_password){
//	 	if (old_password.length == 0 || new_password.length == 0 || re_password.length == 0) {
//		 	return;
//	 	} else {
//			var login_token = JSON.parse(sessionStorage.getItem('login'));
//			var opt = {
//				url: '/accounts/changePassword',
//				method: 'POST',
//				data: JSON.stringify({
//					token: login_token,
//					old_password: old_password,
//					new_password: new_password,
//					re_password: re_password
//				}),
//				headers: {'Content-Type': 'application/json'}
//			};
//			$http(opt).success(function(data){
//				if (data.successful) {
//					$mdDialog.hide();
//					showToast($mdToast, "Password changed successfully");
//				} else{
//					$mdDialog.hide();
//					showToast($mdToast, "Password changed FAILED");
//				}
//			});
//	 	}
//	}
//}

var last = {
	bottom: true,
	top: false,
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