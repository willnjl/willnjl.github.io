((d, w) => {
  const mapRange = (value, start1, stop1, start2, stop2) => {
    value = (value - start1) / (stop1 - start1);
    return start2 + value * (stop2 - start2);
  };
  const heroLinks = d.getElementById("hero_links");
  const skillSlider = d.getElementById("skills");
  const contact = d.getElementById("contact");
  const projectSlider = d.getElementById("projects");
  w.addEventListener("scroll", () => {
    let y = w.pageYOffset;
    console.log(y);

    //links
    heroLinks.style.opacity = mapRange(y, 30, 300, 1, 0);

    //first slider
    if (y < 600) {
      skillSlider.style.opacity = mapRange(y, 240, 600, 0, 1);
    } else {
      skillSlider.style.opacity = mapRange(y, 1250, 1300, 1, 0);
    }

    //contact
    if (y < 1500) {
      contact.style.opacity = mapRange(y, 1000, 1300, 0, 1);
    } else {
      contact.style.opacity = mapRange(y, 1950, 2000, 1, 0);
    }

    //second slider
    if (y < 2000) {
      projectSlider.style.opacity = mapRange(y, 1850, 2050, 0, 1);
    } else {
      projectSlider.style.opacity = mapRange(y, 2500, 2550, 1, 0);
    }
  });
})(document, window);
