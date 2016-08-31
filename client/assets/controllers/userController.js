app.controller('userController', ['userFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$mdDialog', function(userFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $mdDialog){
	// console.log("userController");
	$scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showLoginDialog = function(ev) {
    $mdDialog.show({
      controller: LoginController,
      templateUrl: '../../partials/loginPartial.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false,
      fullscreen: $scope.customFullscreen
    })
    .then(function(answer) {
      // $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      // $scope.status = 'You cancelled the dialog.';
    });
  };
  function LoginController($scope, $mdDialog) {
    $scope.loginUser = function(){
      console.log($scope.login);
      $scope.login = {};
    };
    $scope.registerUser = function(){
      console.log($scope.newUser);
      $scope.newUser = {};
      userFactory.register($scope.newUser, function(rtnData){
        if(rtnData.error){
          console.log(rtnData.error);
          $scope.errors = rtnData;
          $scope.newUser = {};
        } else {
			$cookies.putObject('user',{first_name:retData.first_name, last_name:retData.last_name});
			$location.url('/');
        }
		});
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }
}]);
