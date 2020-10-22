$("#slider").owlCarousel({
  margin: 20,
  nav: true,
  navText: [
    '<i class="fa fa-angle-left" aria-hidden="true"><</i>',
    '<i class="fa fa-angle-right" aria-hidden="true">></i>',
  ],
  loop: true,
  center: true,
  responsive: {
    0: {
      stagePadding: 30,
      items: 1,
    },
    400: {
      stagePadding: 45,
      items: 1,
    },
    450: {
      stagePadding: 55,
      items: 1,
    },
    500: {
      stagePadding: 27,
      items: 2,
      center: false,
    },
    600: {
      center: false,
      items: 2,
      stagePadding: 40,
    },
    700: {
      center: false,
      items: 3,
      stagePadding: 30,
    },
    1000: {
      center: false,
      items: 4,
      stagePadding: 30,
    },
  },
});

$("#slider2").owlCarousel({
  margin: 20,
  loop: true,
  center: true,
  responsive: {
    0: {
      stagePadding: 30,
      items: 1,
    },
    400: {
      stagePadding: 45,
      items: 1,
    },
    450: {
      stagePadding: 55,
      items: 1,
    },
    500: {
      stagePadding: 27,
      items: 2,
      center: false,
    },
    600: {
      center: false,
      items: 2,
      stagePadding: 40,
    },
    700: {
      center: false,
      items: 3,
      stagePadding: 30,
    },
    1000: {
      center: false,
      items: 4,
      stagePadding: 30,
    },
  },
});
