app.controller('mainController', ['mainFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$window', function(mainFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $window){
	if($cookies.getObject('user')){
		$scope.user = $cookies.getObject('user');
		console.log('current user = ', $scope.user);
	} else {
		$scope.user = null;
		console.log('no current user data');
	}
	$scope.toggleLeft = buildToggler('left');
	$scope.toggleRight = buildToggler('right');

	$scope.logoutUser = function(){
		console.log("logout clicked");
		$cookies.remove('user');
		$window.location.reload();
	};
	function buildToggler(componentId){
		return function(){
			$mdSidenav(componentId).toggle();
		};
	}
}]);
