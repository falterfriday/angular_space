angular
    .module('app')
    .controller('nasaController', ['userFactory','$scope','$rootScope', '$location', '$cookies', '$routeParams', '$timeout', '$mdSidenav', '$http', '$mdDialog' , function(userFactory, $scope, $rootScope, $location, $cookies, $routeParams, $timeout, $mdSidenav, $http, $mdDialog){

//------------------------GRAB 10 MOST RECENT POSTS FROM APOD------------------------
    $scope.getPhotos = function(){
        $scope.apiUrl = [];
        $scope.returnedDataArr = [];
        //loop sets date yesterday - 9 days ago
        for (var x = 1; x <= 11; x++){
            $scope.date = (new Date((new Date()).valueOf() - 1000*60*60*24* x )).toISOString().substring(0, 10);
            $scope.apiUrl.push('https://api.nasa.gov/planetary/apod?hd=True&date=' +$scope.date+ '&api_key=DRQGKkFd4I0cAg3uPQJHTAtd9BUjAGCDlDvZFNsB');
        }
        // loop grabs the url from the photo array and gets the associated data
        for (var y = 0; y < $scope.apiUrl.length; y++){
            $http.get( $scope.apiUrl[y] ).then(function(returnedData){
                $scope.returnedDataArr.push(returnedData.data);
            });
        }
    };
    $scope.getPhotos();

//--------------------CREATE ARRAY WITH USER FAVORITE URLS-------------------
    $scope.getFavUrls = function(){
        console.log("got the favs");
        // console.log("rootScope.user = ",$rootScope.user);
        userFactory.getFavUrls($rootScope.user, function(returnedData){
            $scope.userFavUrls = returnedData;
            console.log("controller returnedData = ", returnedData);
        });
    };
    $scope.getFavUrls();

//-------------------REMOVE FAV WHEN DELETE IS CLICKED-------------------
    $scope.deleteFavorite = function(favorite){
        favorite = {'url':favorite};
        console.log("click!",favorite);
        userFactory.deleteFavorite(favorite, function(returnedData){
            console.log("made it back!");
            $scope.getFavUrls();
        });
    };

//-----------------------ADD FAV WHEN HEART IS CLICKED-----------------------
    $scope.addFavorite = function(photoInfo){
        $scope.favorite = photoInfo;
        console.log("user = ", $rootScope.user);
        $scope.favorite.userId = $rootScope.user.id;
        console.log("favorite = ", $scope.favorite);
        userFactory.addNasaFavorite($scope.favorite, function(returnedData){
            console.log(returnedData);
            $scope.getFavUrls();
        });
    };

//---------------------------OPEN PHOTO TAB---------------------------
    $scope.showPhoto = function(ev, clickedPhoto) {
        console.log("photo clicked");
        console.log("linked content = ", clickedPhoto);
        $mdDialog.show({
            controller: photoController,
            templateUrl: '../../partials/nasaPhotoPartial.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen
        });
        function photoController($scope, $mdDialog, $rootScope){
            $scope.userLoggedIn = $rootScope.userLoggedIn;
            $scope.clickedPhoto = clickedPhoto;
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.hd = false;
            $scope.onChange = function(hdState){
                $scope.hd = hdState;
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
            $scope.getFavUrls1 = function(){
                console.log("get the favs");
                userFactory.getFavUrls($scope.$parent.user, function(returnedData){
                    $scope.userFavUrls = returnedData;
                    console.log("controller returnedData = ", returnedData);
                });
            };
            $scope.getFavUrls1();

            $scope.addFavorite1 = function(photoInfo){
                // console.log("photoInfo = ", photoInfo);
                $scope.favorite = photoInfo;
                $scope.favorite.userId = $rootScope.user.id;
                userFactory.addNasaFavorite($scope.favorite, function(returnedData){
                    // console.log(returnedData);
                    $scope.getFavUrls1();
                });
            };

            $scope.deleteFavorite1 = function(favorite){
                favorite = {'url':favorite};
                userFactory.deleteFavorite(favorite, function(returnedData){
                    console.log("made it back!");
                    $scope.getFavUrls1();
                });
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
