$(document).ready(function() {
  var draggable = $('.draggable');
  var resizable = $('.resizeable');
  var element = $('.element');

  element.each( setRandomSize );
  element.each( setRandomPosition );
  
  resizable.resizable({
    containment: "#background",
    aspectRatio: true,
    handles: "n, w, s, e, nw, ne, sw, se"
  });

  draggable.draggable({
    cursor: "move",
    containment: "#background",
    stack: ".element",
  });

  if(window.innerHeight > window.innerWidth) {
    
  }

  function setRandomSize() {
    //Get image size
    var img = $(this).find('img');
    imgHeight = img.outerHeight();
    imgWidth = img.outerWidth();
    
    if(window.innerHeight > window.innerWidth) {
      // Generate random width % [35, 50]
      var randomWidth = randomIntFromInterval(35, 50);
      
      $(this).css({
        width: randomWidth + '%'
      });
    }
    
    else {
      // Change Height to [100, 200] randomly
      var randomHeight = randomIntFromInterval(100, 200);
      
      // Calc proportional width
      var proportionalWidth = (imgWidth * randomHeight) / imgHeight;

      $(this).css({
        height: randomHeight + 'px',
        width: proportionalWidth + 'px'
      });
    }
  }

  function setRandomPosition() {
    // Generate random top position % [0, 75]
    var randomTop = randomIntFromInterval(0, 75);

    // Generate random left position % [0, 85]
    var randomLeft = randomIntFromInterval(0, 85);

    $(this).css({
      top: randomTop + '%',
      left: randomLeft + '%'
    })
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
});