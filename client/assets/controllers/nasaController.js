app.controller('nasaController', ['userFactory','$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$mdDialog' , function(userFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $mdDialog){

//------------------------GRAB 10 MOST RECENT POSTS FROM APOD------------------------
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

//-----------------------ADD FAV WHEN HEART IS CLICKED-----------------------
	$scope.addFavorite = function(photoInfo){
		$scope.favorite = photoInfo;
		console.log("user = ", $scope.user);
		$scope.favorite.userId = $scope.user.id;
		console.log("favorite = ", $scope.favorite);
		userFactory.addNasaFavorite($scope.favorite, function(returnedData){
			console.log(returnedData);
		});
	};

//---------------------------OPEN PHOTO TAB---------------------------
	$scope.showPhoto = function(ev, clickedPhoto) {
		console.log("photo clicked");
		console.log("linked content = ", clickedPhoto);
    $mdDialog.show({
      controller: photoController,
      templateUrl: '../../partials/nasaPhotoPartial.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen
    });
		function photoController($scope, $mdDialog){
			$scope.clickedPhoto = clickedPhoto;
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.cancel = function() {
				$mdDialog.cancel();
			};
			$scope.answer = function(answer) {
				$mdDialog.hide(answer);
			};
		}
  };
}]);
