var monk = require('monk');
var uuid = require('node-uuid');
var db = monk('localhost:27017/test');
var stories_count = 0;
/*
 * Handler for the main home/login page.
 */

var getMain = function(req, res) {
	// If the user has previously logged in, attempts to go to
	res.render('main.ejs');
};

var getStories = function(req, res) {
	var collection = db.get('stories');
	var arr = [];
	for (var i = 0; i < 8; i++){
		var rand = Math.floor(Math.random() * stories_count);
		collection.findOne({index: rand}, function(err, doc){
			if (err) throw err;
			else arr.push(doc);
	})
	res.send(arr);
}
}
var postStory = function(req, res) {
	var story = {};
	story._id = uuid.v1();
	story.title = req.body.title;
	story.poster = req.body.fullname;
	story.content = req.body.content;
	story.reads = 0;
	story.likes = 0;
	story.index = stories_count;

	stories_count++;

	var collection = db.get('stories');
	collection.insert(story, function(err, doc){
		if (err) throw err;
		else res.send(200);
	})
}


var routes = { 
  get_main: getMain,  
};

module.exports = routes;
