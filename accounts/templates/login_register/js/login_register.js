var lr = angular.module('login-register',['ngMaterial','ngMessages']);

lr.controller("loginCtrl",function($scope){
	
	$scope.login = function(){
		var opt = {
			url: '/home/login',
			method: 'POST',
			data: JSON.stringify({
				username: username,
				password: password,
			}),
			headers: {'Content-Type': 'application/json'}
		};
		http(opt).success(function(data){
			if (data.isSuccessful) {
				$window.location.href = "project_page.html";
			} else{
				
			}
		});
	};
	
}).controller("registerCtrl",function($scope){
	
	$scope.register = function(){
		var opt = {
			url: '/home/register',
			method: 'POST',
			data: JSON.stringify({
				username: username,
				email: email,
				password: password,
				confirm: repassword
			}),
			headers: {'Content-Type': 'application/json'}
		};
		http(opt).success(function(data){
			if (data.isSuccessful) {
				$window.location.href = "project_page.html";
			} else{
				
			}
		});
	};
	
});

