var angularObj = angular.module('designApp', ['ng-sortable']);
angularObj.controller('designController', function($scope, $http) {
	
	$scope.search_info = [
		{img: '../img/DNA.png',name: 'A'},
		{img: '../img/Device.png',name: 'B'},
	];//搜索结果
	$scope.chain_info = [
		{img: '../img/DNA.png',name: '1'},
		{img: '../img/DNA.png',name: '2'},
		{img: '../img/DNA.png',name: '3'},
		{img: '../img/DNA.png',name: '4'},
		{img: '../img/DNA.png',name: '5'},
		{img: '../img/DNA.png',name: '6'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
		{img: '../img/DNA.png',name: '7'},
	];//用户编辑的基因链
	
	$scope.$watchCollection("chain_info", function(newVal, oldVal, scope){
    	// $scope.updateMiddleChain(newVal, oldVal);
    	$scope.computeBackground();
    	console.log(newVal);
    });
	
	$scope.putConfig = {
		group: {
			name:'d_gene',
            pull:true,
            put:['s_gene','r_gene'],
		},
		animation: 150,
		handle:'.handle',
	};
	
	$scope.pullConfig = {
		group: {
			name:'s_gene',
            pull:'clone',
            put:false,
		},
        sort:false,
		animation: 150,
        handle:'.handle'
	};

    $scope.recommendConfig = {
        group: {
            name:'r_gene',
            pull:'clone',
            put:false,
        },
        sort:false,
        animation: 150,
    };

    $scope.deleteConfig = {
        group: {
            name:'delete',
            pull:false,
            put:['d_gene'],
        },
        sort:true,
        animation: 150,
    };
    
    $scope.computeBackground = function(){
  	    for (var i = 0;i < $scope.chain_info.length;i++) {
            if ((Math.floor(i / 5) + 1) % 2 == 0) {
                $scope.chain_info[i].float_right = true;
                $scope.chain_info[i].float_left = false;
                if ((i + 1) % 5 == 0) {
                    //头
                    $scope.chain_info[i].rb = true;
                    $scope.chain_info[i].lt = false;
                    $scope.chain_info[i].lb = false;
                    $scope.chain_info[i].rt = false;
                    $scope.chain_info[i].line = false;
                } else if (i % 5 == 0) {
                    //尾
                    $scope.chain_info[i].rb = false;
                    $scope.chain_info[i].lt = true;
                    $scope.chain_info[i].lb = false;
                    $scope.chain_info[i].rt = false;
                    $scope.chain_info[i].line = false;
                } else {
                    //中间
                    $scope.chain_info[i].rb = false;
                    $scope.chain_info[i].lt = false;
                    $scope.chain_info[i].lb = false;
                    $scope.chain_info[i].rt = false;
                    $scope.chain_info[i].line = true;
                }
            } else {
                $scope.chain_info[i].float_right = false;
                $scope.chain_info[i].float_left = true;
                if ((i + 1) % 5 == 0) {
                    //尾
                    $scope.chain_info[i].rb = false;
                    $scope.chain_info[i].lt = false;
                    $scope.chain_info[i].lb = true;
                    $scope.chain_info[i].rt = false;
                    $scope.chain_info[i].line = false;
                } else if (i % 5 == 0) {
                    //头
                    $scope.chain_info[i].rb = false;
                    $scope.chain_info[i].lt = false;
                    $scope.chain_info[i].lb = false;
                    $scope.chain_info[i].rt = true;
                    $scope.chain_info[i].line = false;
                } else {
                    //中间
                    $scope.chain_info[i].rb = false;
                    $scope.chain_info[i].lt = false;
                    $scope.chain_info[i].lb = false;
                    $scope.chain_info[i].rt = false;
                    $scope.chain_info[i].line = true;
                }
            }
        }
    }
});