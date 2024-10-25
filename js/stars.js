const canvas = document.getElementById('canvas');
  
const starback = new Starback(canvas, {
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  type: 'dot',
  starColor: "#fff",
  quantity: 100,
  direction: 225,
  backgroundColor: [ "#583b7a", "#643f81", "#714489", "#7e488f", "#8b4c96", "#93539e", "#9a5ba7", "#a262af", "#a56ebb", "#a97bc7", "#ac87d2", "#b093dd" ],
  randomOpacity: true,
});