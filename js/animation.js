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








