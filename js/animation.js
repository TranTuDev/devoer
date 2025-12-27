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




