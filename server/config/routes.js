console.log('routes.js connected');

var users = require('../controllers/users.js');

module.exports = function(app){
	app.post('/create_user', users.createUser);
	app.post('/login', users.loginUser);
	app.post('/addFavorite', users.addFavorite);
	app.post('/getUserInfo', users.getUserInfo);
	app.post('/getUserFavorites', users.getUserFavorites);
};
