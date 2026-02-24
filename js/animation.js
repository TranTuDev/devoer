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

$(document).ready(function () {
  $('.section-title').each(function () {
    const $title = $(this);

    // ✅ FIX: Lưu text gốc trước khi split
    const text = $title.text().trim();

    // ✅ FIX: Kiểm tra nếu đã được process rồi thì skip
    if ($title.find('.word').length > 0) {
      return;
    }

    let newHTML = '';
    const words = text.split(/\s+/); // ✅ Split by any whitespace

    words.forEach((word, wordIndex) => {
      // ✅ Bỏ qua word rỗng
      if (!word) return;

      // ✅ Wrap word
      newHTML += '<span class="word">';

      // ✅ Split thành char
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        newHTML += `<span class="char">${char}</span>`;
      }

      newHTML += '</span>';

      // ✅ CRITICAL: Thêm space NGOÀI .word bằng text node
      if (wordIndex < words.length - 1) {
        newHTML += ' '; // Space giữa các word
      }
    });

    $title.html(newHTML);

    const chars = $title.find('.char');

    // ✅ Set initial state
    chars.css({
      'transform': 'translateY(1.2em)',
      'opacity': '0',
      'display': 'inline-block'
    });

    let animated = false;

    function checkScroll() {
      if (animated) return;

      const elementTop = $title.offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > elementTop + 50) {
        anime({
          targets: chars.toArray(), // ✅ Use toArray() not get()
          translateY: [
            { value: '-0.4em', duration: 400, easing: 'easeOutExpo' },
            { value: 0, duration: 600, easing: 'easeOutBounce' }
          ],
          opacity: [0, 1],
          delay: anime.stagger(30),
          easing: 'easeOutExpo'
        });

        animated = true;

        // ✅ Unbind scroll sau khi animate xong
        $(window).off('scroll', checkScroll);
      }
    }

    $(window).on('scroll', checkScroll);
    checkScroll();
  });
});

$(document).ready(function () {

  $('.animation-img').each(function () {

    const img = this;
    let animated = false;

    const rows = 4;
    const cols = 6;

    const parent = img.parentElement;
    parent.style.position = 'relative';
    parent.style.overflow = 'hidden';

    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    img.style.opacity = 0;

    const pieces = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {

        const piece = document.createElement('div');

        piece.style.position = 'absolute';
        piece.style.width = imgWidth / cols + 'px';
        piece.style.height = imgHeight / rows + 'px';
        piece.style.left = (c * imgWidth / cols) + 'px';
        piece.style.top = (r * imgHeight / rows) + 'px';
        piece.style.backgroundImage = `url(${img.src})`;
        piece.style.backgroundSize = `${imgWidth}px ${imgHeight}px`;
        piece.style.backgroundPosition =
          `-${c * imgWidth / cols}px -${r * imgHeight / rows}px`;

        parent.appendChild(piece);
        pieces.push(piece);
      }
    }

    function checkScroll() {
      if (animated) return;

      const elementTop = $(img).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > elementTop + 100) {

        anime({
          targets: pieces,
          translateY: () => anime.random(-200, 200),
          translateX: () => anime.random(-200, 200),
          opacity: [0, 1],
          duration: 0
        });

        anime({
          targets: pieces,
          translateX: 0,
          translateY: 0,
          opacity: 1,
          delay: anime.stagger(40),
          duration: 1200,
          easing: 'easeOutExpo',
          complete: function () {
            img.style.opacity = 1;
            pieces.forEach(p => p.remove());
          }
        });

        animated = true;
      }
    }

    $(window).on('scroll', checkScroll);
    checkScroll();

  });

});

$(document).ready(function () {

  function animateOnScroll(selector, direction) {

    $(selector).each(function () {

      const el = this;
      let animated = false;

      // trạng thái ban đầu
      el.style.opacity = 0;

      if (direction === 'left') {
        el.style.transform = 'translateX(-150px)';
      }

      if (direction === 'right') {
        el.style.transform = 'translateX(150px)';
      }

      if (direction === 'top') {
        el.style.transform = 'translateY(-150px)';
      }

      if (direction === 'bottom') {
        el.style.transform = 'translateY(150px)';
      }

      function checkScroll() {
        if (animated) return;

        const elementTop = $(el).offset().top;
        const windowBottom = $(window).scrollTop() + $(window).height();

        if (windowBottom > elementTop + 100) {

          anime({
            targets: el,
            translateX: 0,
            translateY: 0,
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
          });

          animated = true;
        }
      }

      $(window).on('scroll', checkScroll);
      checkScroll();

    });
  }

  animateOnScroll('.animation-left', 'left');
  animateOnScroll('.animation-right', 'right');
  animateOnScroll('.animation-top', 'top');
  animateOnScroll('.animation-bottom', 'bottom');

});
$(document).ready(function () {

  $('.anim-zoom').each(function () {

    const el = this;
    let animated = false;

    // Trạng thái ban đầu
    el.style.opacity = 0;
    el.style.transform = 'scale(1.3)';
    el.style.filter = 'brightness(0.7)';

    function checkScroll() {
      if (animated) return;

      const elementTop = $(el).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > elementTop + 100) {

        anime({
          targets: el,
          scale: [1.3, 1],
          opacity: [0, 1],
          duration: 1400,
          easing: 'easeOutExpo',
          update: function (anim) {
            const progress = anim.progress / 100;
            el.style.filter = `brightness(${0.7 + (0.3 * progress)})`;
          }
        });

        animated = true;
      }
    }

    $(window).on('scroll', checkScroll);
    checkScroll();

  });

});
$(document).ready(function () {

  $('.anim-flip').each(function () {

    const el = this;
    let animated = false;

    // Setup 3D context
    el.style.opacity = 0;
    el.style.transform = 'perspective(1000px) rotateY(90deg)';
    el.style.transformOrigin = 'center';

    function checkScroll() {
      if (animated) return;

      const elementTop = $(el).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > elementTop + 100) {

        anime({
          targets: el,
          rotateY: [90, 0],
          opacity: [0, 1],
          duration: 1200,
          easing: 'easeOutExpo'
        });

        animated = true;
      }
    }

    $(window).on('scroll', checkScroll);
    checkScroll();

  });

});
$(document).ready(function () {

  $('.anim-blur').each(function () {

    const el = this;
    let animated = false;

    // Trạng thái ban đầu
    el.style.opacity = 0;
    el.style.filter = 'blur(15px)';
    el.style.transform = 'translateY(40px)';

    function checkScroll() {
      if (animated) return;

      const elementTop = $(el).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > elementTop + 100) {

        anime({
          targets: el,
          opacity: [0, 1],
          translateY: [40, 0],
          duration: 1200,
          easing: 'easeOutExpo',
          update: function (anim) {
            const progress = anim.progress / 100;
            el.style.filter = `blur(${15 - (15 * progress)}px)`;
          }
        });

        animated = true;
      }
    }

    $(window).on('scroll', checkScroll);
    checkScroll();

  });

});
