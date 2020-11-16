gsap.registerPlugin(ScrollTrigger);

let tween = gsap.to(".canvas", {
  opacity: 1,
  duration: 1.5,
});

tween.play();
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-wrapper",
    start: "top top",
    end: "top -1500px",
    scrub: 1,
  },
});

tl.to(".canvas", {
  rotateZ: "0deg",
  duration: 1,
})
  .to(
    ".piece",
    {
      rotateZ: "-27deg",
      x: "122px",
      y: "-3px",
      startAt: {
        rotateZ: "192deg",
        x: "101vw",
        y: "-10vh",
        opacity: 1,
      },
      top: 0,
      left: 0,
      duration: 1,
    },
    "-=1"
  )
  .to(".canvas", {
    rotateZ: "90deg",
    duration: 2,
  });

//
