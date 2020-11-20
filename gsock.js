((d, w) => {
  gsap.registerPlugin(ScrollTrigger);

  let tween = gsap.to("#hero", {
    opacity: 1,
    duration: 3,
    delay: 0.5,
  });
  tween.pause();

  w.addEventListener("scroll", () => {
    if (w.pageYOffset < 1500) {
      tween.play();
    }
  });

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
        x: "95px",
        y: "25px",
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
      rotate: "90deg",
      duration: 1,
    })
    .to(".hero", {
      opacity: 0,
      duration: 1,
    });
})(document, window);

//
