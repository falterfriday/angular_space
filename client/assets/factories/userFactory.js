app.factory('userFactory', ['$http', function($http){

	function userFactory(){
		this.registerUser = function(newUser, callback){
			// console.log("uF - newUser = ", newUser);
			$http.post('/create_user', newUser).then(function(returnedData){
				// console.log("uF returnedData = ", returnedData.data);
				if(typeof(callback) == "function"){
					callback(returnedData.data);
				}
			});
		};
		this.loginUser = function(existingUser, callback){
			// console.log("uF - loginUser = ", existingUser);
			$http.post('/login', existingUser).then(function(returnedData){
				// console.log("uF - returnedData = ", returnedData.data);
				callback(returnedData.data);
			});
		};
		this.addNasaFavorite = function(favorite, callback){
			// console.log("uF - favorite = ", favorite);
			$http.post('/addNasaFavorite', favorite).then(function(returnedData){
				callback(returnedData);
			});
		};
		this.addRedditFavorite = function(favorite, callback){
			// console.log("uF - favorite = ", favorite);
			$http.post('/addRedditFavorite', favorite).then(function(returnedData){
				callback(returnedData);
			});
		};
		this.getUserFavorites = function(user, callback){
			// console.log('uF - getUserFavorites', user);
			$http.post('/getUserFavorites', user).then(function(returnedData){
				callback(returnedData);
			});
		};
		this.deleteFavorite = function(favorite, callback){
			console.log('uF delete');
			$http.post('/deleteFavorite', favorite).then(function(returnedData){
				callback(returnedData);
			});
		};
	}
	return new userFactory();
}]);
