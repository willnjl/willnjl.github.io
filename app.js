((d, w) => {
  const faders = d.querySelectorAll(".fade-in");
  const sliders = d.querySelectorAll(".slide-in");

  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  sliders.forEach((slider) => {
    appearOnScroll.observe(slider);
  });
})(document, window);
