app.controller('profileController', ['userFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$mdDialog', '$window', function(userFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $mdDialog, $window){

	$scope.getUserFavorites = function(){
		userFactory.getUserFavorites($scope.user, function(returnedData){
			console.log('returnedData = ', returnedData.data[0]);
			$scope.userInfo = returnedData.data[0];
			$scope.userFavorites = returnedData.data[0]._favorites;
			console.log('userFavorites = ', $scope.userFavorites);
		});
	};
	$scope.getUserFavorites();
}]);
