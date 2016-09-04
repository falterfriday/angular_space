app.controller('redditController', ['mainFactory','userFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$mdDialog' , function(mainFactory, userFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $mdDialog){

  $scope.getPhotos = function(){
    $http.get('https://www.reddit.com/r/spaceporn/.json?').then(function(returnedData){
      $scope.photos = [];
      for (var x = 0; x <= 10; x++){
        $scope.photos.push(returnedData.data.data.children[x]);
      }
      console.log($scope.photos);
    });
  };
  $scope.getPhotos();

  $scope.addFavorite = function(photoInfo){
		$scope.favorite = photoInfo.data;
		$scope.favorite.userId = $scope.user.id;
		console.log("favorite = ", $scope.favorite);
		userFactory.addRedditFavorite($scope.favorite, function(returnedData){
			console.log(returnedData);
		});
	};

//---------------------------OPEN PHOTO TAB---------------------------
  $scope.showPhoto = function(ev, clickedPhoto) {
		// $scope.clickedPhoto = clickedPhoto;
		console.log("photo clicked");
		console.log("linked content = ", clickedPhoto);
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '../../partials/photoPartial.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    });
		function DialogController($scope, $mdDialog){
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
