app.controller('photoController', ['photoFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', function(photoFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http){
	// console.log('photo controller');

	$scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
		};
    }

	$scope.getPhotos = function(){
		var date = new Date();
		var today = date.toISOString().substring(0, 10);
		var yesterday = new Date((new Date()).valueOf() - 1000*60*60*24);
		yesterday = yesterday.toISOString().substring(0, 10);
		var twoDaysAgo = new Date((new Date()).valueOf() - 1000*60*60*24*2);
		twoDaysAgo = twoDaysAgo.toISOString().substring(0, 10);
		var threeDaysAgo = new Date((new Date()).valueOf() - 1000*60*60*24*3);
		threeDaysAgo = threeDaysAgo.toISOString().substring(0, 10);
		$http.get('https://api.nasa.gov/planetary/apod?hd=True&date=' +today+ '&api_key=DRQGKkFd4I0cAg3uPQJHTAtd9BUjAGCDlDvZFNsB')
		.success(function(rtnData){
			$scope.photo = rtnData;
			console.log('rtnData = ', rtnData);
		})
		.error(function(error, status, headers, config){
			console.log(status);
			console.log("Error retrieving image");
		});
		$http.get('https://api.nasa.gov/planetary/apod?hd=True&date=' +yesterday+ '&api_key=DRQGKkFd4I0cAg3uPQJHTAtd9BUjAGCDlDvZFNsB')
		.success(function(rtnData){
			$scope.photo2 = rtnData;
			console.log('rtnData = ', rtnData);
		})
		.error(function(error, status, headers, config){
			console.log(status);
			console.log("Error retrieving image");
		});
		$http.get('https://api.nasa.gov/planetary/apod?hd=True&date=' +twoDaysAgo+ '&api_key=DRQGKkFd4I0cAg3uPQJHTAtd9BUjAGCDlDvZFNsB')
		.success(function(rtnData){
			$scope.photo3 = rtnData;
			console.log('rtnData = ', rtnData);
		})
		.error(function(error, status, headers, config){
			console.log(status);
			console.log("Error retrieving image");
		});
		$http.get('https://api.nasa.gov/planetary/apod?hd=True&date=' +threeDaysAgo+ '&api_key=DRQGKkFd4I0cAg3uPQJHTAtd9BUjAGCDlDvZFNsB')
		.success(function(rtnData){
			$scope.photo4 = rtnData;
			console.log('rtnData = ', rtnData);
		})
		.error(function(error, status, headers, config){
			console.log(status);
			console.log("Error retrieving image");
		});
	};
	$scope.getPhotos();
}]);
