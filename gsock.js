gsap.registerPlugin(ScrollTrigger);

let tween = gsap.to(".links__container", {
  scrollTrigger: {
    trigger: ".page-wrapper",
    start: "top -1200",
  },
  opacity: 1,
  duration: 1,
  delay: 2,
});
tween.pause();
if (window.pageYOffset < 1200) {
  tween.play();
}

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-wrapper",
    start: "top top",
    end: "top -1500px",
    // once: true,
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
