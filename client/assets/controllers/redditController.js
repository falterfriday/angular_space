app.controller('redditController', ['userFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$mdDialog' , function(userFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $mdDialog){

//----------------------CHECK LOGIN STATUS----------------------
  // $scope.checkUserState = function(){
	// 	if($cookies.getObject('user')){
	// 		$scope.user = $cookies.getObject('user');
  //     $scope.userLoggedIn = true;
	// 		console.log('user = ', $scope.user);
	// 	} else {
	// 		// $scope.user = null;
  //     $scope.userLoggedIn = false;
	// 		console.log('no current user data');
	// 	}
	// };
	// $scope.checkUserState();

//------------------------GRAB 20 MOST RECENT POSTS ON R/SPACEPORN------------------------
  $scope.getPhotos = function(){
    $http.get('https://www.reddit.com/r/spaceporn/.json?').then(function(returnedData){
      $scope.photos = [];
      for (var x = 0; x <= 20; x++){
        $scope.photos.push(returnedData.data.data.children[x]);
      }
      console.log($scope.photos);
    });
  };
  $scope.getPhotos();

//-----------------------ADD FAV WHEN HEART IS CLICKED-----------------------
  $scope.addFavorite = function(photoInfo){
		$scope.favorite = photoInfo.data;
		$scope.checkUserState();
		console.log("user = ", $scope.user);
		$scope.favorite.userId = $scope.user.id;
		console.log("favorite = ", $scope.favorite);
		userFactory.addRedditFavorite($scope.favorite, function(returnedData){
			console.log(returnedData);
		});
	};

//---------------------------OPEN PHOTO DIALOG---------------------------
  $scope.showPhoto = function(ev, clickedPhoto) {
		console.log("photo clicked");
		console.log("linked content = ", clickedPhoto);
    $mdDialog.show({
      controller: photoController,
      templateUrl: '../../partials/redditPhotoPartial.html',
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
