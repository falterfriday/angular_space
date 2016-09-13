app.controller('redditController', ['userFactory', '$scope', '$rootScope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$mdDialog' , function(userFactory, $scope, $rootScope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $mdDialog){

//------------------------GRAB 20 MOST RECENT POSTS ON R/SPACEPORN------------------------
  $scope.getPhotos = function(){
    $http.get('https://www.reddit.com/r/spaceporn/.json?').then(function(returnedData){
      $scope.photos = [];
      for (var x = 0; x <= 24; x++){
        $scope.photos.push(returnedData.data.data.children[x]);
      }
      console.log($scope.photos);
    });
  };
  $scope.getPhotos();

//TODO: get more button or scroll load
//use https://www.reddit.com/r/spaceporn/.json?&count=25&after=t3_51imls to get the next 25

//-----------------------ADD FAV WHEN HEART IS CLICKED-----------------------
  $scope.addFavorite = function(photoInfo){
		$scope.favorite = photoInfo.data;
		console.log("photoInfo = ", photoInfo.data);
		console.log("user = ", $rootScope.user);
		$scope.favorite.userId = $rootScope.user.id;
		console.log("favorite = ", $scope.favorite);
		userFactory.addRedditFavorite($scope.favorite, function(returnedData){
			console.log(returnedData);
		});
	};

//---------------------------OPEN PHOTO DIALOG---------------------------
  $scope.showPhoto = function(ev, clickedPhoto) {
		console.log("clicked photo content = ", clickedPhoto);
    $mdDialog.show({
      controller: photoController,
      templateUrl: '../../partials/redditPhotoPartial.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen
  	}).then(function(answer){
	  console.log("what what?!");
  });
		function photoController($scope, $rootScope, $mdDialog){
			$scope.userLoggedIn = $rootScope.userLoggedIn
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
