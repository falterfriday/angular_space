app.controller('redditController', ['userFactory', '$scope', '$rootScope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$mdDialog' , function(userFactory, $scope, $rootScope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $mdDialog){

//------------------------GRAB 25 MOST RECENT POSTS ON R/SPACEPORN------------------------
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

//--------------------CREATE ARRAY WITH USER FAVORITE URLS-------------------
    $scope.getFavUrls = function(){
        console.log("get the favs");
        userFactory.getFavUrls($scope.user, function(returnedData){
            $scope.userFavUrls = returnedData;
            console.log("controller returnedData = ", returnedData);
        });
    };
    $scope.getFavUrls();
//-----------------------ADD FAV WHEN HEART IS CLICKED-----------------------
    $scope.addFavorite = function(photoInfo){
        $scope.favorite = photoInfo.data;
        console.log("photoInfo = ", photoInfo.data);
        console.log("user = ", $rootScope.user);
        $scope.favorite.userId = $rootScope.user.id;
        console.log("favorite = ", $scope.favorite);
        userFactory.addRedditFavorite($scope.favorite, function(returnedData){
            console.log(returnedData);
            $scope.getFavUrls();
        });
    };

//-------------------REMOVE FAV WHEN DELETE IS CLICKED-------------------
    $scope.deleteFavorite = function(favorite){
        console.log("click!",favorite);
        // userFactory.deleteFavorite(favorite, function(returnedData){
        //     console.log("made it back!");
        //     $scope.getUserFavorites();
        // });
    };
//---------------------------OPEN PHOTO DIALOG---------------------------
    $scope.showPhoto = function(ev, clickedPhoto){
        console.log("clicked photo content = ", clickedPhoto);
        $mdDialog.show({
            controller: photoController,
            templateUrl: '../../partials/redditPhotoPartial.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen
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
        }
    };

//---------------------------DROPDOWN MENU---------------------------
    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
    };
}]);
