((d, w) => {
  const faders = d.querySelectorAll(".fade-in");
  const sliders = d.querySelectorAll(".slide-in");

  const ticker = d.getElementById("ticker");

  const mapRange = (value, start1, stop1, start2, stop2) => {
    value = (value - start1) / (stop1 - start1);
    return start2 + value * (stop2 - start2);
  };

  w.addEventListener("scroll", () => {
    let y = w.pageYOffset;
    ticker.style.opacity = mapRange(y, 30, 300, 1, 0);
  });

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -150px 0px",
  };

  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  sliders.forEach((slider) => {
    appearOnScroll.observe(slider);
  });
})(document, window);
