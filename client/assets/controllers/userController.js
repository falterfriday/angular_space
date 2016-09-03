app.controller('userController', ['userFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$mdDialog', '$window', function(userFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $mdDialog, $window){
	// $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showLoginDialog = function(ev) {
    $mdDialog.show({
      controller: LoginController,
      templateUrl: '../../partials/loginPartial.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false,
      fullscreen: $scope.customFullscreen
    });
  };
  // ----------------controller-ception?!----------------
  function LoginController($scope, $mdDialog) {
    $scope.loginUser = function(){
      console.log($scope.existingUser);
      userFactory.loginUser($scope.existingUser, function(returnedData){
        if(returnedData.error){
          console.log('login unsucessful');
          $scope.login = {};
        } else {
          $cookies.putObject('user',{first_name:returnedData.first_name, last_name:returnedData.last_name, id:returnedData._id});
          $scope.cancel();
          $window.location.reload();
        }
      });
      $scope.login = {};
    };
    $scope.registerUser = function(){
      console.log(" uC newUser = ", $scope.newUser);
      userFactory.registerUser($scope.newUser, function(returnedData){
        if(returnedData.error){
          console.log(returnedData.error);
          $scope.errors = returnedData;
          $scope.newUser = {};
        } else {
    			$cookies.putObject('user',{first_name:returnedData.first_name, last_name:returnedData.last_name, id:returnedData._id});
          console.log('current user = ', $scope.user);
          $scope.cancel();
          $window.location.reload();
        }
	    });
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }
}]);
