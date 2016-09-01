app.controller('mainController', ['mainFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', function(photoFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http){
	if($cookies.getObject('user')){
		$scope.user = $cookies.getObject('user');
		console.log('current user = ', $scope.user);
	}
	$scope.toggleLeft = buildToggler('left');
	$scope.toggleRight = buildToggler('right');

	function buildToggler(componentId) {
		return function() {
			$mdSidenav(componentId).toggle();
		};
	}
}]);
