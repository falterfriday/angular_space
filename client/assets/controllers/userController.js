app.controller('userController', ['userFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$mdDialog', '$window', function(userFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $mdDialog, $window){

  $scope.customFullscreen = false;

  $scope.checkUserState = function(){
		if($cookies.getObject('user')){
			$scope.user = $cookies.getObject('user');
			console.log('current user = ', $scope.user);
		} else {
			$scope.user = null;
			console.log('no current user data');
		}
	};

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
    $scope.checkUserState = function(){
  		if($cookies.getObject('user')){
  			$scope.user = $cookies.getObject('user');
  			console.log('current user = ', $scope.user);
  		} else {
  			$scope.user = null;
  			console.log('no current user data');
  		}
  	};
    $scope.loginUser = function(){
      console.log($scope.existingUser);
      userFactory.loginUser($scope.existingUser, function(returnedData){
        if(returnedData.errors){
          console.log('login unsucessful');
          $scope.login = {};
        } else {
          $cookies.putObject('user',{first_name:returnedData.first_name, last_name:returnedData.last_name, id:returnedData._id});
          // $window.location.reload();
          $scope.checkUserState();
          $scope.cancel();
        }
      });
      $scope.login = {};
    };
    $scope.registerUser = function(){
      console.log(" uC newUser = ", $scope.newUser);
      userFactory.registerUser($scope.newUser, function(returnedData){
        console.log('returnedData = ', returnedData);
        if(returnedData.errors){
          console.log(returnedData.error);
          $scope.errors = returnedData;
          $scope.newUser = {};
        } else {
    			$cookies.putObject('user',{first_name:returnedData.first_name, last_name:returnedData.last_name, id:returnedData._id});
          console.log('current user = ', $scope.user);
          $scope.cancel();
          // $window.location.reload();
          $scope.checkUserState();
        }
	    });
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }
}]);
