var drawBox = function() {

	var url = "/getstories";
	var stories = [];
	$.get(url, function (data, status) {
		if (status === 'success') {
			var arr = data.stories;
			current_stories = data.stories.slice(0);
			$('.wrap').empty();
			for (var i = 1; i <= arr.length; i++) {
				if (arr[i] != undefined) {
					var id = arr[i]._id.toString();
					var title = arr[i].title;
					var order = i;
					var html = generateBoxHTML(id, title, order);
					$('.wrap').append(html);
				}				
			}
			initOverlay();
		}
	})
}

var generateBoxHTML = function(id, title, order) {
	var img = '/img/img';
	var trigger = 'trigger-overlay';
	
	img += order + '.png';
	trigger += order;

	var result = '<div  class="box" >'+
      	'<div id="' + trigger+ '"" class="boxInner">'+
        '<img id="' + id + '" src="'+img+'" />'+
        '<div class="titleBox">'+title+'</div>'+
      	'</div></div>';

    return result;
}

var updateStoryModal = function(id) {

	var url = '/getbyid?id=' + id;
	$.get(url, function (data,status){
		if (status === 'success') {
			var title = data.title;
			var poster = data.poster;
			var content = data.content;
			$('#modal-title').empty();
			$('#modal-title').append(title);
			$('#modal-poster').empty();
			if (poster != null && poster !== undefined) {
				$('#modal-poster').append(poster);
			}
			else {
				$$('#modal-poster').append("Anonymous");
			}
			$('#modal-content').empty();
			$('#modal-content').append(content);
		}
	})	
}
