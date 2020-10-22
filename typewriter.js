var app = document.getElementById("hero_links");

var typewriter = new Typewriter(app, {
  // loop: true,
  autoStart: true,
  // cursor: ".",
});

typewriter
  .typeString("Technology, \n")
  .pauseFor(2500)
  // .deleteAll()
  .typeString("Performance, \n")
  .pauseFor(2500)
  // .deleteAll()
  .typeString("Environment \n")
  .start();
