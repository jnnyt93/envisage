var drawBox = function() {

	var url = "/getstories";
	var stories = [];
	$.get(url, function (data, status) {
		if (status === 'success') {
			console.log("Printing result:" + arr);
			var arr = data.stories;
			current_stories = data.stories.slice(0);
			console.log(current_stories);
			console.log(data.stories);
			$('.wrap').empty();
			for (var i = 1; i <= arr.length; i++) {
				if (arr[i] != undefined) {
					var id = arr[i]._id;
					var title = arr[i].title;
					var order = i;
					var html = generateBoxHTML(id, title, order);
					$('.wrap').append(html);
					$('#id')
				}				
			}
		}
	})
}

var generateBoxHTML = function(id, title, order) {
	var img = '/img/img';
	var trigger = 'trigger_overlay';
	
	img += order + '.png';
	trigger += order;

	var result = '<div id="' + id + '" class="box" >'+
      	'<div class="boxInner">'+
        '<img id="' + trigger+ '" src="'+img+'" />'+
        '<div class="titleBox">'+title+'</div>'+
      	'</div></div>';

    return result;
}

var updateStoryModal = function(i) {
	console.log(current_stories);
	var story = current_stories[i];
	var title = story.title;
	var poster = story.poster;
	var content = story.content;

	$('#modal-title').empty();
	$('#modal-title').append(title);
	$('#modal-poster').empty();
	if (poster !== null || poster !== undefined) {
		$('#modal-poster').append(poster);
	}
	else {
		$$('#modal-poster').append("Anonymous");
	}
	$('p','#story-modal').append(content);
}
