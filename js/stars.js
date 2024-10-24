const canvas = document.getElementById('canvas');
  
const starback = new Starback(canvas, {
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  type: 'dot',
  starColor: "#fff",
  quantity: 100,
  direction: 225,
  backgroundColor: ["#9d519e", "#a15eab", "#a46ab7", "#a877c3", "#ab83ce", "#a581ca", "#9f7ec7", "#997cc3", "#886bb0", "#785b9e", "#684b8c", "#583b7a"],
  randomOpacity: true,
});