$(".nav_link.tc-75.w--current").find(".nav_link-dot").addClass("is-active");

window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words",
    tagName: "span",
  });

  // Page Load
  function pageLoad() {
    let tl = gsap.timeline();
    tl.to(".page_main", {
      opacity: 1,
      ease: "power4.out",
      duration: 0.2,
      delay: 0.2,
    });
  }
  pageLoad();

  // Fade in elements
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      },
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onEnter: () => timeline.play(),
    });
  }

  $("[animation='fade-in']").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this), {
      opacity: 0,
      delay: 0.2,
    });
    createScrollTrigger($(this), tl);
  });

  $("[animation='fade-in-up']").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this), {
      opacity: 0,
      y: "10%",
      delay: 0.2,
    });
    createScrollTrigger($(this), tl);
  });

  $("[animation='fade-in-up-large']").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this), {
      opacity: 0,
      y: "25%",
      duration: 1,
      delay: 0.4,
    });
    createScrollTrigger($(this), tl);
  });

  $("[animation='fade-in-stagger']").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find("[fade-in-item]"), {
      opacity: 0,
      delay: 0.2,
      stagger: { each: 0.1 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[animation='word-stagger']").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".word"), {
      opacity: 0,
      y: "10%",
      stagger: { each: 0.05 },
    });
    createScrollTrigger($(this), tl);
  });

  $("[animation='scale-in']").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this), {
      opacity: 0,
      scale: 1.1,
      delay: 0.2,
    });
    createScrollTrigger($(this), tl);
  });

  $("[work-scale-in]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".ab1"), { opacity: 0, scale: 1.1 });
    tl.from($(this).find(".work-text_wrap"), { opacity: 0 }, 0.2);
    tl.from($(this).find(".tag-wrap"), { opacity: 0 }, 0.4);
    createScrollTrigger($(this), tl);
  });

  $("[process-grow]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".process_grid-item"), {
      opacity: 0,
      width: 0,
      stagger: { amount: 1 },
      delay: 0.2,
      ease: Power2.easeOut,
    });
    createScrollTrigger($(this), tl);
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});

// Sticky Circle Grow
$(".sticky_video-trigger").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(".sticky_video-element");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
  });
  tl.fromTo(
    targetElement,
    {
      opacity: 0,
      duration: 1,
    },
    {
      opacity: 1,
      duration: 1,
    }
  );
});

// Full scale
let mm = gsap.matchMedia();
mm.add("(min-width: 800px)", () => {
  $("[animation='scale-up']").each(function (index) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top 70%",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .from($(this).find(".work_page-hero_img"), {
        scale: 0.9,
        borderRadius: "4em",
        ease: "none",
      });
  });
});
mm.add("(max-width: 799px)", () => {
  $("[animation='scale-up']").each(function (index) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top 70%",
          end: "bottom bottom",
          scrub: true,
        },
      })
      .from($(this).find(".work_page-hero_img"), {
        scale: 0.85,
        borderRadius: "1.5em",
        ease: "none",
      });
  });
});

// Count up
$(".counterup").each(function (index) {
  // assign ID
  let thisId = "countup" + index;
  $(this).attr("id", thisId);
  // create variables
  let startNumber = +$(this).text();
  let endNumber = +$(this).attr("final-number");
  let decimals = 0;
  let duration = $(this).attr("count-duration");
  // animate number
  let myCounter = new CountUp(
    thisId,
    startNumber,
    endNumber,
    decimals,
    duration
  );
  ScrollTrigger.create({
    trigger: $(this),
    start: "top 80%",
    end: "bottom top",
    delay: 0.5,
    onEnter: () => {
      myCounter.start();
    },
  });
});

// Custom cursor
$("body").on("mousedown", function () {
  $(".cursor_dot").addClass("cursor-smaller");
});
$("body").on("mouseup", function () {
  $(".cursor_dot").removeClass("cursor-smaller");
});
$(".process_grid-item").on("mouseenter", function () {
  $(".cursor_dot").addClass("display-cursor");
  let myColor = $(this).attr("data-color");
  let myText = $(this).attr("data-text");
  $(".cursor_dot").css("background-color", myColor);
  $(".cursor_text").text(myText);
});
$(".process_grid-item").on("mouseleave", function () {
  $(".cursor_dot").removeClass("display-cursor");
  $(".cursor_dot").css("background-color", "rgba(9, 9, 11, 0.5)");
});
$(".work-link").on("mouseenter", function () {
  $(".cursor_dot").addClass("display-cursor");
  let myText = $(this).attr("data-text");
  $(".cursor_text").text(myText);
});
$(".work-link").on("mouseleave", function () {
  $(".cursor_dot").removeClass("display-cursor");
});
$(".section-gallery, .slides-wrapper, .splide").on("mouseenter", function () {
  $(".cursor_dot").addClass("display-cursor");
  let myText = $(this).attr("data-text");
  $(".cursor_text").text(myText);
});
$(".section-gallery, .slides-wrapper, .splide").on("mouseleave", function () {
  $(".cursor_dot").removeClass("display-cursor");
});

// Swiper
function swiperCareer() {
  document.addEventListener("DOMContentLoaded", function () {
    var splide = new Splide(".swiper-career", {
      type: "loop",
      drag: "free",
      gap: "1em",
      arrows: false,
      pagination: false,
      perPage: 4,
      autoScroll: {
        pauseOnHover: true,
        speed: 1,
      },
      breakpoints: {
        1800: {
          // Laptop
          perPage: 3,
          gap: "1em",
        },
        991: {
          // Tablet
          perPage: 2,
          gap: "0.5em",
        },
        767: {
          // Mobile Landscape
          perPage: 1,
          gap: "0.5em",
          autoScroll: {
            speed: 1,
          },
        },
        479: {
          // Mobile Portrait
          perPage: 1,
          gap: "0.5em",
          autoScroll: {
            speed: 1,
          },
        },
      },
    });
    splide.mount(window.splide.Extensions);
  });
}
swiperCareer();

function swiperTeam() {
  document.addEventListener("DOMContentLoaded", function () {
    var splide = new Splide(".swiper-team", {
      type: "loop",
      drag: "free",
      gap: "1em",
      arrows: false,
      pagination: false,
      perPage: 4,
      autoScroll: {
        pauseOnHover: true,
        speed: 1,
      },
      breakpoints: {
        991: {
          // Tablet
          perPage: 3,
          gap: "0.5em",
        },
        767: {
          // Mobile Landscape
          perPage: 1,
          gap: "0.5em",
          autoScroll: {
            speed: 1,
          },
        },
        479: {
          // Mobile Portrait
          perPage: 1,
          gap: "0.5em",
          autoScroll: {
            speed: 1,
          },
        },
      },
    });
    splide.mount(window.splide.Extensions);
  });
}
swiperTeam();

function swiperWork() {
  document.addEventListener("DOMContentLoaded", function () {
    var splide = new Splide(".swiper-work", {
      type: "loop",
      drag: "free",
      gap: "1em",
      arrows: false,
      pagination: false,
      perPage: 3,
      autoScroll: {
        pauseOnHover: true,
        speed: 1,
      },
      breakpoints: {
        991: {
          // Tablet
          perPage: 2,
          gap: "0.5em",
        },
        767: {
          // Mobile Landscape
          perPage: 1,
          gap: "0.5em",
          autoScroll: {
            speed: 1,
          },
        },
        479: {
          // Mobile Portrait
          perPage: 1,
          gap: "0.5em",
          autoScroll: {
            speed: 1,
          },
        },
      },
    });
    splide.mount(window.splide.Extensions);
  });
}
swiperWork();

// LENIS SMOOTH SCROLL
let lenis;
if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
$("[data-lenis-start]").on("click", function () {
  lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
  lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

// Page transition
function pageTransition() {
  let tl = gsap.timeline({ paused: true });
  tl.to(".page_main, .page_footer, .nav_link-dot", {
    opacity: 0,
    duration: 0.2,
    ease: "power4.out",
  });
  tl.to(".nav_link", {
    opacity: 0.75,
    duration: 0.2,
    ease: "power4.out",
  });
  $("[page-transition]").on("click", function () {
    $(this).toggleClass("clicked");
    if ($(this).hasClass("clicked")) {
      tl.restart();
    } else {
      tl.reverse();
    }
  });
}
pageTransition();
$(document).ready(function () {
  $("[page-transition]").click(function () {
    var href = $(this).attr("href");
    setTimeout(function () {
      window.location = href;
    }, 200);
    return false;
  });
});

// On Back Button Tap
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};
