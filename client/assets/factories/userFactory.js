app.factory('userFactory', ['$http', function($http){

	function userFactory(){
		this.register = function(newUser, callback){
			console.log("hit the uF - register method");
			$http.post('/register', newUser).then(function(rtnData){
				console.log("uF rtnData = ", rtnData.data);
				if(typeof(callback) == "function"){
					callback(rtnData.data);
				}
			});
		};
	}
	return new userFactory();
}]);
