let tl = gsap.timeline();
const colour = "white";

tl.to(".links__container", {
  opacity: 1,
  top: "50%",
  delay: 0,
  duration: 1,
});

tl.to(
  ".link",
  {
    opacity: 1,
    duration: 0.6,
    stagger: 0.3,
  },
  "-=0.2"
);

tl.to(
  ".link",
  {
    color: colour,
    duration: 0.3,
    stagger: 0.3,
  },
  "-=0.5"
);

// tl.start();
