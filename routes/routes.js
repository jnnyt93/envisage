var monk = require('monk');
var uuid = require('node-uuid');
var db = monk('localhost:27017/test');
var jQuery = require('jquery');
var stories_count = 8;

/*
 * Handler for the main home/login page.
 */

 var getMain = function(req, res) {
	// If the user has previously logged in, attempts to go to
	res.render('main.ejs');
};

var getStories = function(req, res) {
	var collection = db.get('stories');
	// console.log(collection.find());
	// console.log(stories_count);
	var arr = [];		
		collection.find({}, function(err, docs){
			// res.send(doc);
			if (err) throw err;
			else {				
				while (arr.length < Math.min(stories_count,8)) {
					var rand = Math.floor(Math.random() * stories_count);
					arr.push(docs[rand]);
				}
				var result = {stories: arr};
				res.send(result);								
			}
		})		
	
}


var getRelated = function(req, res) {
	var collection = db.get('stories');
	var arr = [];
	while (arr.length <= Math.min(8, stories_count)){
		var rand = Math.floor(Math.random() * stories_count);
		collection.find({tag: req.body.tag}, function(err, doc){
			if (err) throw err;
			else {
				while (arr.length <= 8) {
					var rand = Math.floor(Math.random() * stories_count);
					arr.push(docs[rand]);
				}
				var result = {stories: arr};
				res.send(result);		
			}
		})		
	}
	var result = {};
	result.stories = arr;
	res.send(result);
}

var postStory = function(req, res) {
	var story = {};
	story._id = uuid.v1();
	story.title = req.body.title;
	story.poster = req.body.fullname;
	story.content = req.body.content;
	story.views = 0;
	story.likes = 0;
	story.tag = req.body.tag;
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
	post_story: postStory,
	get_stories: getStories,
	get_related: getRelated  
};

module.exports = routes;
