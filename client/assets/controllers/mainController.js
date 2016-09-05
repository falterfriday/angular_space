app.controller('mainController', ['userFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$window', '$mdDialog', function(userFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $window, $mdDialog){

//-----------------------------LOGIN-----------------------------
  $scope.checkUserState = function(){
		if($cookies.getObject('user')){
			$scope.user = $cookies.getObject('user');
      $scope.userLoggedIn = true;
			console.log('user = ', $scope.user);
		} else {
      $scope.userLoggedIn = false;
			console.log('no current user data');
		}
	};
	$scope.checkUserState();

  $scope.logoutUser = function(){
    console.log("logout clicked");
    $cookies.remove('user');
    $scope.userLoggedIn = false;
    $scope.checkUserState();
  };

  //-----------------------------NAVBAR-----------------------------
  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  function buildToggler(componentId){
    return function(){
      $mdSidenav(componentId).toggle();
    };
  }

//------------------------LOGIN/REGISTRATION------------------------
	$scope.showLoginDialog = function(ev) {
    $mdDialog.show({
      templateUrl: '../../partials/loginPartial.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen
    })
    .then(function(answer){
      console.log('hit the .then');
      $scope.userLoggedIn = true;
      $scope.checkUserState();
    });
  };

  $scope.loginUser = function(){
    console.log($scope.existingUser);
    userFactory.loginUser($scope.existingUser, function(returnedData){
      if(returnedData.errors){
        $scope.login = {};
      } else {
        $cookies.putObject('user',{first_name:returnedData.first_name, last_name:returnedData.last_name, id:returnedData._id});
        $scope.hide();
      }
    });
  };

  $scope.registerUser = function(){
    // console.log(" uC newUser = ", $scope.newUser);
    userFactory.registerUser($scope.newUser, function(returnedData){
      console.log('returnedData = ', returnedData);
      if(returnedData.errors){
        $scope.errors = returnedData;
        $scope.newUser = {};
      } else {
  			$cookies.putObject('user',{first_name:returnedData.first_name, last_name:returnedData.last_name, id:returnedData._id});
        $scope.checkUserState();
      }
    });
  };
  $scope.hide = function(){
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}]);
