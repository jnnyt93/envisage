var drawBox = function() {
	var url = "/getstories";
	var stories = [];
	$.get(url, function (data, status) {
		if (status === 'success') {
			var arr = data.stories;
			$('.wrap').empty();
			for (var i = 0; i < arr.length; i++) {
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
	order += 1;
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
			var tag = data.tag;
			$('#modal-title').empty();
			$('#modal-title').append(title);
			$('#modal-poster').empty();
			if (poster != null || poster !== undefined) {
				$('#modal-poster').append(poster);
			}
			else {
				$('#modal-poster').append("Anonymous");
			}
			$('#modal-content').empty();
			$('#modal-content').append(content);
			$('#modal-tag').empty();
			$('#modal-tag').empty();
		}
	})	
}

var postStory = function(){
  var url = '/poststory';
  clearTimeout(timer); 	
	  $.post(url, $("#story-form").serialize(), function(data, status){
	    if (status === 'succcess') {
	      // Maybe do something here?
	      console.log("success");
	      $("#story-form").reset();
	      $('a.close-reveal-modal').trigger('click');
	      location.replace('/');
	    }
	  })
 
  
}

var getRelatedStories = function() {
	// location.reload();
	var tag = $('#modal-tag').text();
	var url = '/getrelated?tag=' + tag;
	$.get(url, function(data, status){
		console.log(data);
		if (data.stories[0] != null) {
			var arr = data.stories;
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
		else {
			alert('There no other stories of the same topic at the moment. You should contribute!');
		}
	})
}

var refresh = function() {
	drawBox();
	timer = setTimeout(refresh, 30000);
}


