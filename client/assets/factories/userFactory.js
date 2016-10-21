/* jshint esversion: 6 */
angular
	.module('app')
	.factory('userFactory',userFactory);

userFactory.$inject = ['$http'];

function userFactory($http){

	return {
		getFavUrls: getFavUrls,
		loginUser: loginUser,
		registerUser: registerUser,
		addNasaFavorite: addNasaFavorite,
		addRedditFavorite: addRedditFavorite,
		getUserFavorites: getUserFavorites,
		deleteFavorite: deleteFavorite
	};

///////////////////////////////////////////////////////////////////////

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
			logger.error(`Failed to retrieve user favorites! ${error.data}`);
		}
	}
	function loginUser(existingUser){
		console.log("uF - loginUser = ", existingUser);
		return $http.post('/login', existingUser)
			.then(getUserSuccess)
			.catch(getUserFail);

		function getUserSuccess(returnedUser){
			console.log("returnedUser = ", returnedUser);
			return returnedUser.data;
		}
		function getUserFail(error){
			logger.error(`Failed to login user! ${error.data}`);
		}
	}
	function registerUser(newUser){
		// console.log("uF - newUser = ", newUser);
		return $http.post('/create_user', newUser)
			.then(registerUserSuccess)
			.catch(registerUserFail);

		function registerUserSuccess(returnedUser){
			console.log("returnedUser = ", returnedUser);
			return returnedUser.data;
		}
		function registerUserFail(error){
			logger.error(`Failed to register user! ${error.data}`);
		}
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
