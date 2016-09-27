app.controller('mainController', ['userFactory', '$scope', '$rootScope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$window', '$mdDialog', function(userFactory, $scope, $rootScope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $window, $mdDialog){

//-----------------------------LOGIN-----------------------------
    $rootScope.checkUserState = function(){
        if($cookies.getObject('user')){
            $rootScope.user = $cookies.getObject('user');
            $rootScope.userLoggedIn = true;
            // console.log("$rootScope.userLoggedIn: ", $rootScope.userLoggedIn);
            // console.log('user = ', $rootScope.user);
            return $rootScope.userLoggedIn;
        } else {
            $rootScope.userLoggedIn = false;
            // console.log("$rootScope.userLoggedIn: ", $rootScope.userLoggedIn);
            // console.log('no current user data');
        }
    };
    $rootScope.checkUserState();

    $rootScope.logoutUser = function(){
        // console.log("logout clicked");
        $cookies.remove('user');
        $rootScope.checkUserState();
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
            // console.log('hit the .then');
            // console.log("$scope.userLoggedIn: ", $scope.userLoggedIn);
            $rootScope.checkUserState();
        });
    };

    $scope.loginUser = function(){
        // console.log($scope.existingUser);
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
        userFactory.registerUser($scope.newUser, function(returnedData){
        // console.log('returnedData = ', returnedData);
            if(returnedData.errors){
                $scope.errors = returnedData;
                $scope.newUser = {};
            } else {
                $cookies.putObject('user',{first_name:returnedData.first_name, last_name:returnedData.last_name, id:returnedData._id});
                $rootScope.checkUserState();
                $scope.hide();
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
