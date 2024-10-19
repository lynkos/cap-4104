$(document).ready(function() {
    var draggable = $('.draggable');
    var resizable = $('.resizeable');
    var element = $('.element');
  
    element.each( setRandomSize );
    element.each( setRandomPosition );
    
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
    if(window.innerHeight > window.innerWidth){
      
    }
  
    function setRandomSize(){
      //Get IMG size
      var img = $(this).find('img');
      imgHeight = img.outerHeight();
      imgWidth = img.outerWidth();
      
      if(window.innerHeight > window.innerWidth){
        //Generate random Width % [10, 60]
        var randomWidth = randomIntFromInterval(10, 60);
        $(this).css({
          width: randomWidth + '%'
        });
      } else {
        //Change Height to [100, 330] randomly
        var randomHeight = randomIntFromInterval(100, 330);
        //Calc proportional width
        var proportionalWidth = (imgWidth * randomHeight) / imgHeight; 
        $(this).css({
          height: randomHeight + 'px',
          width: proportionalWidth + 'px'
        });
      }
      
    }
  
    function setRandomPosition(){
      //Generate random Top % [0, 75]
      var randomTop = randomIntFromInterval(0, 75);
      //Generate randon Left % [0, 85]
      var randomLeft = randomIntFromInterval(0, 75);
      $(this).css({
        top: randomTop + '%',
        left: randomLeft + '%'
      })
    }
  
    function randomIntFromInterval(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
    }
  
  });