/* jshint esversion: 6 */
var mongoose = require('mongoose'),
	express = require('express'),
	bodyparser = require('body-parser'),
	path = require('path'), root=__dirname,
	port = process.env.PORT || 8000,
	app = express();
app.use(bodyparser.json());
app.use(express.static(path.join(root, 'client')));
/*app.use(express.static(path.join(root, 'node_modules')));*/
app.use(express.static(path.join(root, 'bower_components')));
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function(){
	console.log(`running on port ${port}`);
});
