$(document).ready(function () {
  $('.infiniteslide_wrap').each(function () {
    const $wrap = $(this);
    const slide = $wrap.find('.infiniteslide')[0];
    const slideWidth = slide.scrollWidth / 2;
    const tl = gsap.to(slide, {
      x: -slideWidth,
      duration: 18,
      ease: "linear",
      repeat: -1
    });


    $wrap.hover(
      function () { tl.pause(); },
      function () { tl.resume(); }
    );
  });
});


$(document).ready(function () {
  const $items = $('[data-animate]');

  function checkAnimate() {
    const windowBottom = $(window).scrollTop() + $(window).height();

    $items.each(function () {
      const itemTop = $(this).offset().top + 100; // delay 100px cho đẹp

      if (windowBottom > itemTop) {
        $(this).addClass('animated');
      }
    });
  }

  $(window).on('scroll', checkAnimate);
  checkAnimate(); // chạy lần đầu khi mới vào trang
});



$(function () {
  const $goTop = $("#goTop");

  $(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const progress = (scrollTop / docHeight) * 360;

    if (scrollTop > 300) {
      $goTop.addClass("show");
    } else {
      $goTop.removeClass("show");
    }

    $goTop.find(".border-progress")
      .css("--progress-angle", progress + "deg");
  });

  $goTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });



  anime({
    targets: '.box',
    translateX: 250,
    duration: 1500,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
  });
});



const counters = document.querySelectorAll('[data-target]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;

    anime({
      targets: { value: 0 },
      value: Number(el.dataset.target),
      duration: 2000,
      easing: 'easeOutExpo',
      round: 1,
      update: anim => {
        el.innerHTML =
          anim.animations[0].currentValue + (el.dataset.suffix || '');
      }
    });

    observer.unobserve(el); // chạy 1 lần
  });
});

counters.forEach(el => observer.observe(el));






document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".page-transition");
  const logo = document.querySelector(".transition-logo");
  const links = document.querySelectorAll("a:not([href^='#'])");

  // Split text → span
  logo.innerHTML = logo.textContent.trim()
    .split("")
    .map(l => `<span>${l}</span>`)
    .join("");

  const letters = document.querySelectorAll(".transition-logo span");
  const panelLeft = document.querySelector(".panel-left");
  const panelRight = document.querySelector(".panel-right");

  // ===== ANIMATION DUY NHẤT - Chữ bay lên → Rèm mở =====
  function playTransition(callback) {
    overlay.style.display = "flex";

    anime.timeline({ easing: "easeInOutExpo" })
      // 1. Chữ bay lên
      .add({
        targets: letters,
        translateY: [60, 0],
        opacity: [0, 1],
        filter: ["blur(8px)", "blur(0px)"],
        delay: anime.stagger(80),
        duration: 800
      })

      // 2. Chữ biến mất
      .add({
        targets: letters,
        opacity: [1, 0],
        duration: 400,
        delay: 200
      })

      // 3. Rèm mở ra
      .add({
        targets: panelLeft,
        translateX: ["0%", "-100%"],
        duration: 900
      })
      .add({
        targets: panelRight,
        translateX: ["0%", "100%"],
        duration: 900
      }, "-=900")

      // 4. Complete
      .add({
        complete: () => {
          overlay.style.display = "none";

          // Reset chữ về trạng thái ban đầu cho lần sau
          anime.set(letters, {
            translateY: 60,
            opacity: 0,
            filter: "blur(8px)"
          });

          // Reset panel về vị trí ban đầu
          anime.set([panelLeft, panelRight], {
            translateX: "0%"
          });

          // Callback nếu có (để chuyển trang)
          if (callback) callback();
        }
      });
  }


  playTransition();

 
});



