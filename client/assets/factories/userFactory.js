/* jshint esversion: 6 */
angular
	.module('app')
	.factory('userFactory',userFactory);

userFactory.$inject = ['$http'];

function userFactory($http){

	return {
		registerUser: registerUser,
		loginUser: loginUser,
		addNasaFavorite: addNasaFavorite,
		addRedditFavorite: addRedditFavorite,
		getFavUrls: getFavUrls,
		getUserFavorites: getUserFavorites,
		deleteFavorite: deleteFavorite
	};

///////////////////////////////////////////////////////////////////////

	function registerUser(newUser, callback){
		// console.log("uF - newUser = ", newUser);
		$http.post('/create_user', newUser).then(function(returnedData){
			// console.log("uF returnedData = ", returnedData.data);
			if(typeof(callback) == "function"){
				callback(returnedData.data);
			}
		});
	}
	function loginUser(existingUser, callback){
		// console.log("uF - loginUser = ", existingUser);
		$http.post('/login', existingUser).then(function(returnedData){
			// console.log("uF - returnedData = ", returnedData.data);
			callback(returnedData.data);
		});
	}
	function addNasaFavorite(favorite, callback){
		// console.log("uF - favorite = ", favorite);
		$http.post('/addNasaFavorite', favorite).then(function(returnedData){
			callback(returnedData);
		});
	}
	function addRedditFavorite(favorite, callback){
		// console.log("uF - favorite = ", favorite);
		$http.post('/addRedditFavorite', favorite).then(function(returnedData){
			callback(returnedData);
		});
	}
	function getUserFavorites(user){
		console.log("uF user = ", user);
		return $http.post('/getUserFavorites', user)
			.then(getDataSuccess)
			.catch(getDataFailed);

		function getDataSuccess(returnedData){
			console.log("returnedData = ", returnedData);
			return returnedData;
		}
		function getDataFailed(error){
			logger.error(`Failed to retrieve user favorites. ${error.data}`);
		}
	}

	function getFavUrls(user, callback){
		console.log("user = ", user);
		$http.post('/getFavUrls', user).then(function(returnedData){
			console.log("uF returnedData = ", returnedData);
			var arrFavs = [];
			if (returnedData.data.length > 0){
				favoritesData = returnedData.data[0]._favorites;
				for (var i = 0; i < favoritesData.length ; i++){
					arrFavs.push(favoritesData[i].url);
				}
			}
			// console.log("userFactory returnedData = ", favoritesData);
			callback(arrFavs);
		});
	}
	function deleteFavorite(favorite, callback){
		console.log('uF delete', favorite);
		$http.post('/deleteFavorite', favorite).then(function(returnedData){
			callback(returnedData);
		});
	}
}
