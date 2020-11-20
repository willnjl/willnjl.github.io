((d, w) => {
  const faders = d.querySelectorAll(".fade-in");
  const navBar = d.getElementById("navbar");
  const hero = d.getElementById("hero");

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

  const contact = d.getElementById("title_contact");
  contact.addEventListener("click", () => {
    d.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });

  const contactLink = d.getElementById("nav-contact");
  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    d.getElementById("page-contact").scrollIntoView({ behavior: "smooth" });
  });
  const skills = d.getElementById("title_skills");
  skills.addEventListener("click", () => {
    d.getElementById("skills").scrollIntoView({ behavior: "smooth" });
  });

  const work = d.getElementById("title_work");
  work.addEventListener("click", () => {
    d.getElementById("work").scrollIntoView({ behavior: "smooth" });
  });

  const aboutPage = d.getElementById("page-about");
  const socialPage = d.getElementById("page-social");
  const aboutBtn = d.getElementById("about-btn");
  let aboutState = false;

  aboutBtn.addEventListener("click", () => {
    aboutState = !aboutState;

    if (aboutState) {
      aboutPage.classList.remove("hide");
      socialPage.classList.add("hide");
      aboutBtn.innerHTML = "connect";
    } else {
      aboutBtn.innerHTML = "about";
      aboutPage.classList.add("hide");
      socialPage.classList.remove("hide");
    }
  });
})(document, window);
