angular
    .module('app')
    .controller('redditController', redditController);

redditController.$inject = [
                    'userFactory',
                    'photoFactory',
                    '$scope',
                    '$rootScope',
                    '$location',
                    '$cookies',
                    '$routeParams',
                    '$timeout',
                    '$mdSidenav',
                    '$http',
                    '$mdDialog'];

function redditController(
                    userFactory,
                    photoFactory,
                    $scope,
                    $rootScope,
                    $location,
                    $cookies,
                    $routeParams,
                    $timeout,
                    $mdSidenav,
                    $http,
                    $mdDialog
                        ){

    //Grab the 25 latest photos from reddit
    $scope.getPhotos = function(){
        $scope.photos = photoFactory.getRedditPhotos();
    }();

    //TODO: get more button or scroll load
    //use https://www.reddit.com/r/spaceporn/.json?&count=25&after=t3_51imls to get the next 25

    //CREATE ARRAY WITH USER FAVORITE URLS
    $scope.getFavUrls = function(){
        userFactory.getFavUrls($rootScope.user, function(returnedData){
            $scope.userFavUrls = returnedData;
        });
    }();

    //ADD FAV WHEN HEART IS CLICKED
    $scope.addFavorite = function(photoInfo){
        $scope.favorite = photoInfo.data;
        $scope.favorite.userId = $rootScope.user.id;
        userFactory.addRedditFavorite($scope.favorite, function(returnedData){
            $scope.getFavUrls();
        });
    };

    //REMOVE FAV WHEN DELETE IS CLICKED
    $scope.deleteFavorite = function(favorite){
        favorite = {'url':favorite};
        userFactory.deleteFavorite(favorite, function(returnedData){
            $scope.getFavUrls();
        });
    };
    //OPEN PHOTO DIALOG
    $scope.showPhoto = function(ev, clickedPhoto, $scope){
        $mdDialog.show({
            controller: photoController,
            templateUrl: '/partials/redditPhotoPartial.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen:false
        });
        function photoController($scope, $rootScope, $mdDialog){
            $scope.userLoggedIn = $rootScope.userLoggedIn;
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
            $scope.getFavUrls1 = function(){
                userFactory.getFavUrls($scope.$parent.user, function(returnedData){
                    $scope.userFavUrls = returnedData;
                });
            };
            $scope.getFavUrls1();

            $scope.addFavorite1 = function(photoInfo){
                $scope.favorite = photoInfo.data;
                $scope.favorite.userId = $rootScope.user.id;
                userFactory.addRedditFavorite($scope.favorite, function(returnedData){
                    $scope.getFavUrls1();
                });
            };

            $scope.deleteFavorite1 = function(favorite){
                favorite = {'url':favorite};
                userFactory.deleteFavorite(favorite, function(returnedData){
                    $scope.getFavUrls1();
                });
            };
        }
    };

    //DROPDOWN MENU
    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
    };
}
