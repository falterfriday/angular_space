console.log('routes.js connected');

var users = require('../controllers/users.js');

module.exports = function(app){
	app.post('/create_user', users.createUser);
};
