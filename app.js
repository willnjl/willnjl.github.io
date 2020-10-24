((d, w) => {
  const mapRange = (value, start1, stop1, start2, stop2) => {
    value = (value - start1) / (stop1 - start1);
    return start2 + value * (stop2 - start2);
  };
  const ticker = d.getElementById("ticker");
  const skillTitle = d.getElementById("title_skills");
  const skillSlider = d.getElementById("skills");
  const contact = d.getElementById("contact");
  const contactTitle = d.getElementById("title_contact");
  const projectSlider = d.getElementById("projects");

  w.addEventListener("scroll", () => {
    let y = w.pageYOffset;

    console.log(y);
    //links
    ticker.style.opacity = mapRange(y, 30, 300, 1, 0);

    contactTitle.style.opacity = mapRange(y, 240, 1200, 1, 0);

    //first slider
    if (y < 600) {
      contact.style.opacity = mapRange(y, 240, 600, 0, 1);
    } else {
      contact.style.opacity = mapRange(y, 1250, 1300, 1, 0);
    }

    //contact
    skillTitle.style.opacity = mapRange(y, 1000, 1800, 1, 0);
    skillSlider.style.opacity = mapRange(y, 1000, 1500, 0, 1);
    if (y > 2000) {
      skillSlider.style.opacity = mapRange(y, 2100, 2200, 1, 0);
    }
  });

  contactTitle.addEventListener("click", () => {
    contact.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
  skillTitle.addEventListener("click", () => {
    skillSlider.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
})(document, window);
