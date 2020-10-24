((d, w) => {
  var app = document.getElementById("ticker");

  var typewriter = new Typewriter(app, {
    // loop: true,
    autoStart: true,
    // cursor: ".",
  });

  typewriter
    .typeString("Technology, \n")
    .pauseFor(1005)
    .typeString("Performance, \n")
    .pauseFor(1500)
    .typeString("Environment \n")
    .start();
})(document, window);
