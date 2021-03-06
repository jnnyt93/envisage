var monk = require('monk');
var db = monk('localhost:5000/test');

/*
 * Handler for the main home/login page.
 */

 var getMain = function(req, res) {
	res.render('main.ejs');
};

var getStories = function(req, res) {
	var collection = db.get('stories');

	var arr = [];		
	collection.find({}, function(err, docs){
		if (err) throw err;
		else {
		console.log("------Length: " +docs.length+" ---------");				
			while (arr.length < Math.min(docs.length,8)) {
				var rand = Math.floor(Math.random() * docs.length);
				var contains = false;
				for (var i = 0; i < arr.length; i++) {						
					if (arr[i]._id === docs[rand]._id) {
						contains = true;
						break;
					}							
				}
				if (!contains)
					arr.push(docs[rand]);					
			}
			var result = {stories: arr};
			res.send(result);								
		}
	})	
}

var getByID = function(req, res) {
	var collection = db.get('stories');
	var oid = collection.id(req.query.id);
	collection.findById(oid, function(err, doc){
		if (err) throw err;
		else {
			res.send(doc);
		}
	})
}


var getRelated = function(req, res) {
	var collection = db.get('stories');
	var arr = [];
	
	var rand = Math.floor(Math.random() * stories_count);
	collection.find({tag: req.query.tag}, function(err, docs){
		if (err) throw err;
		else {
			while (arr.length < Math.min(8, docs.length) ){
				var rand = Math.floor(Math.random() * docs.length);
				arr.push(docs[rand]);
				if (arr.length == docs.length) break;
			}
			var result = {stories: arr};
			console.log(result);
			res.send(result);		
		}
	})		
}

var postStory = function(req, res) {
	var story = {};
	// story._id = uuid.v1();
	story.title = req.body.title;
	story.poster = req.body.poster;
	story.content = req.body.content;
	story.views = 0;
	story.likes = 0;
	story.tag = req.body.tag;

	if (story.title == '' || story.title == undefined) {
		res.send(403);
	}
	if (story.content == '' || story.content == undefined) {
		res.send(403);
	}
	if (story.tag == '' || story.tag == undefined) {
		res.send(403);
	}

	var collection = db.get('stories');
	collection.insert(story, function(err, doc){
		if (err) res.send(504);
		else res.send(200);
	})
}


var routes = { 
	get_main: getMain,
	post_story: postStory,
	get_stories: getStories,
	get_related: getRelated,
	get_byid: getByID  
};

module.exports = routes;
