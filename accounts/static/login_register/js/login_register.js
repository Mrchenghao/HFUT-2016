var lr = angular.module('login-register',['ngMaterial','ngMessages']);

lr.controller("loginCtrl",function($scope,$http){
	
	$scope.login = function(username,password){
		var opt = {
			url: '/accounts/login',
			method: 'POST',
			data: JSON.stringify({
				username: username,
				password: password,
			}),
			headers: {'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
			if (data.isSuccessful) {
				$window.location.href = "project_page.html";
			} else{
				
			}
		});
	};
	
}).controller("registerCtrl",function($scope,$http){
	
	$scope.register = function(username,email,password,repassword){
		var opt = {
			url: '/accounts/register',
			method: 'POST',
			data: JSON.stringify({
				username: username,
				email: email,
				password: password,
				repassword: repassword
			}),
			headers: {'Content-Type': 'application/json'}
		};
		$http(opt).success(function(data){
<<<<<<< HEAD:accounts/static/login_register/js/login_register.js
			if (data.successful) {
				alert("Register SUCCESS!");
=======
			if (data.isSuccessful) {
				$window.location.href = "project_page.html";
>>>>>>> 2f35002081db44a502f5430ace160fd576f14c79:accounts/templates/login_register/js/login_register.js
			} else{
				alert(data.error.msg)
			}
		});
	};
	
});

