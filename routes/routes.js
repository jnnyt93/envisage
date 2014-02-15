var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');
/*
 * Handler for the main home/login page.
 */

var getMain = function(req, res) {
	// If the user has previously logged in, attempts to go to
	res.render('main.html');
};


var routes = { 
  get_main: getMain,  
};

module.exports = routes;
