app.controller('nasaController', ['mainFactory', 'userFactory','$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', function(mainFactory, userFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http){

	$scope.getPhotos = function(){
		$scope.apiUrl = [];
		$scope.returnedDataArr = [];
		//loop sets date yesterday - 9 days ago
		for (var x = 1; x <= 10; x++){
			$scope.date = (new Date((new Date()).valueOf() - 1000*60*60*24* x )).toISOString().substring(0, 10);
			$scope.apiUrl.push('https://api.nasa.gov/planetary/apod?hd=True&date=' +$scope.date+ '&api_key=DRQGKkFd4I0cAg3uPQJHTAtd9BUjAGCDlDvZFNsB');
		}
		// loop grabs the url from the photo array and gets the associated data
		for (var y = 0; y < $scope.apiUrl.length; y++){
			$http.get( $scope.apiUrl[y] ).then( function(returnedData){
				$scope.returnedDataArr.push(returnedData.data);
			});
		}
	};
	$scope.getPhotos();

	$scope.addFavorite = function(photoInfo){
		$scope.favorite = photoInfo;
		$scope.favorite.userId = $scope.user.id;
		console.log("favorite = ", $scope.favorite);
		userFactory.addFavorite($scope.favorite, function(returnedData){
			console.log(returnedData);
		});
	};
}]);
