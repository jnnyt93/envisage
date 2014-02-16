function initOverlay() {
  // http://stackoverflow.com/a/2450976
    var overlay = document.querySelector( 'div.overlay' ),
    paths = [].slice.call( overlay.querySelectorAll( 'svg > path' ) ),
    pathsTotal = paths.length;

  function shuffle(array) {
    var currentIndex = array.length
    , temporaryValue
    , randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  $('.boxInner').each(function(index, box) {
    $(this).click(function() { 
      toggleOverlay(box) 
    });
  })
  



  function toggleOverlay(box) {
    updateStoryModal($(box).find('img').attr('id'));
    var cnt = 0;

    shuffle( paths );

    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.add( overlay, 'close' );
      
      paths.forEach( function( p, i ) {
        setTimeout( function() {
          ++cnt;
          p.style.display = 'none';
          if( cnt === pathsTotal ) {
            classie.remove( overlay, 'close' );
          }
        }, i * 30 );
      });
    }
    else if( !classie.has( overlay, 'close' ) ) {
      classie.add( overlay, 'open' );
      paths.forEach( function( p, i ) {
        setTimeout( function() {
          p.style.display = 'block';
        }, i * 30 );
      });
    }
  }

  
  $('button.overlay-close').click( function() {
    toggleOverlay() 
  });
}