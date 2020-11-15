((d, w) => {
  const faders = d.querySelectorAll(".fade-in");
  const sliders = d.querySelectorAll(".slide-in");
  const navBar = d.querySelector(".nav-bar");

  const ticker = d.getElementById("hero");

  const mapRange = (value, start1, stop1, start2, stop2) => {
    value = (value - start1) / (stop1 - start1);
    return start2 + value * (stop2 - start2);
  };

  w.addEventListener("scroll", () => {
    let y = w.pageYOffset;
    ticker.style.opacity = mapRange(y, 30, 300, 1, 0);
  });

  var prevScrollpos = window.pageYOffset;
  window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      navBar.classList.remove("remove");
    } else {
      navBar.classList.add("remove");
    }
    prevScrollpos = currentScrollPos;
  };

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

  const contact = d.getElementById("title_contact");
  contact.addEventListener("click", () => {
    d.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });
  const skills = d.getElementById("title_skills");
  skills.addEventListener("click", () => {
    d.getElementById("skills").scrollIntoView({ behavior: "smooth" });
  });
  const work = d.getElementById("title_work");
  work.addEventListener("click", () => {
    d.getElementById("work").scrollIntoView({ behavior: "smooth" });
  });
})(document, window);
