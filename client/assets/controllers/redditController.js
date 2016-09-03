app.controller('redditController', ['mainFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', function(mainFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http){

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

}]);
