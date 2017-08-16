/* jshint esversion: 6 */
angular
    .module('app')
    .factory('photoFactory',photoFactory);

photoFactory.$inject = ['$http'];

function photoFactory($http){

    return {
        getNasaPhotos: getNasaPhotos,
        getRedditPhotos: getRedditPhotos
    };

    function getNasaPhotos(){
        console.log("hit the photoFactory")
        var returnedDataArr = [];
        var apiUrlString;
        var date;

        for (var x = 1; x <= 10; x++){
            date = (new Date( new Date() - 1000*60*60*24* x ).toISOString()).substring(0,10);            
            apiUrlString = 'https://api.nasa.gov/planetary/apod?hd=True&date=' + date + '&api_key=DRQGKkFd4I0cAg3uPQJHTAtd9BUjAGCDlDvZFNsB';
            $http.get(apiUrlString).then(function(returnedData){
                returnedDataArr.push(returnedData.data);
            });
        }
        console.log("returnedDataArr from photoFactory");
        return returnedDataArr;
    }

    function getRedditPhotos(){
        $http.get('https://www.reddit.com/r/spaceporn/.json?').then(function(returnedData){
            $scope.photos = [];
            for (var x = 0; x <= 24; x++){
                $scope.photos.push(returnedData.data.data.children[x]);
            }
        });
    }
}
