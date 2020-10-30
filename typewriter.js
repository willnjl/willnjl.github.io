((d, w) => {
  var app = document.getElementById("ticker");

  var typewriter = new Typewriter(app, {
    // loop: true,
    autoStart: true,
    // cursor: ".",
  });

  typewriter
    .typeString("Technology, ")
    .pauseFor(600)
    .typeString("Performance, ")
    .pauseFor(640)
    .typeString("Environment.")
    .start();
})(document, window);
