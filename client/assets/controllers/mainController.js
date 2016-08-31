app.controller('mainController', ['mainFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', function(photoFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http){

	$scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
			};
    }
}]);
