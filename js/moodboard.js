$(document).ready(function() {
  var draggable = $(".draggable");
  var resizable = $(".resizeable");
  var element = $(".element");

  element.each(setRandomSize);
  element.each(setRandomPosition);
  
  resizable.resizable({
    containment: "#background",
    aspectRatio: true,
    handles: "n, w, s, e"
  });

  draggable.draggable({
    cursor: "move",
    containment: "#background",
    stack: ".element",
  });

  function setRandomSize() {
    // Get image size
    var img = $(this).find("img");
    imgHeight = img.outerHeight();
    imgWidth = img.outerWidth();
    
    if(window.innerHeight > window.innerWidth) {
      // Generate random width % [35, 50]
      var randomWidth = randomIntFromInterval(35, 50);
      
      $(this).css({
        width: randomWidth + "%"
      });
    }
    
    else {
      // Change Height to [200, 300] randomly
      var randomHeight = randomIntFromInterval(200, 300);
      
      // Calc proportional width
      var proportionalWidth = (imgWidth * randomHeight) / imgHeight;

      $(this).css({
        height: randomHeight + "px",
        width: proportionalWidth + "px"
      });
    }
  }

  function setRandomPosition() {
    // Generate random top position % [0, 85]
    //var randomTop = randomIntFromInterval(0, 85);

    // Generate random left position % [0, 85]
    var randomLeft = randomIntFromInterval(0, 85);

    //var moodboardHeight = $(".mood-board").height();
    var paletteHeight = $("#palette").height();

    // Height per section
    //var sectionHeight = (moodboardHeight - paletteHeight) / 2;

    // Top: [0, sectionHeight] or Bottom: [0, sectionHeight]
    var randomTop = randomIntFromInterval(0, paletteHeight);

    if (Math.random() >= 0.5) {
      $(this).css({
        top: randomTop + "px", // "%",
        left: randomLeft + "%"
      })
    }
    
    else {
      $(this).css({
        bottom: randomTop + "px", // "%",
        left: randomLeft + "%"
      })
    }
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
});