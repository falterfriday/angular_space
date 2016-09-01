app.factory('userFactory', ['$http', function($http){

	function userFactory(){
		this.register = function(newUser, callback){
			console.log("uF - newUser = ", newUser);
			$http.post('/create_user', newUser).then(function(rtnData){
				console.log("uF rtnData = ", rtnData.data);
				if(typeof(callback) == "function"){
					callback(rtnData.data);
				}
			});
		};
	}
	return new userFactory();
}]);
