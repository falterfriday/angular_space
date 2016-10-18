angular
    .module('app')
    .controller('profileController', ['userFactory', '$scope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$mdDialog', '$window', '$rootScope', function(userFactory, $scope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $mdDialog, $window, $rootScope){

    $scope.getUserFavorites = function(){
        userFactory.getUserFavorites($rootScope.user, function(returnedData){
            console.log('returnedData = ', returnedData);
            $scope.userInfo = returnedData.data[0];
            $scope.userFavorites = returnedData.data[0]._favorites;
            console.log('userFavorites = ', $scope.userFavorites);
        });
    };
    $scope.getUserFavorites();

//---------------------------OPEN PHOTO TAB---------------------------
    $scope.showPhoto = function(ev, clickedPhoto) {
        console.log("photo clicked");
        console.log("linked content = ", clickedPhoto);
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '../../partials/profilePhotoPartial.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen
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
            $scope.deleteFavorite = function(favorite){
                userFactory.deleteFavorite(favorite, function(returnedData){
                    console.log("made it back!");
                    $mdDialog.cancel();
                });
            };
        }
    };
    $scope.deleteFavorite = function(favorite){
        userFactory.deleteFavorite(favorite, function(returnedData){
            console.log("made it back!");
            $scope.getUserFavorites();
        });
    };

//---------------------------DROPDOWN MENU---------------------------
    var originatorEv;

    $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
}]);
