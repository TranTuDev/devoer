// ===== INFINITE SLIDE =====
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

// ===== DATA ANIMATE =====
$(document).ready(function () {
  const $items = $('[data-animate]');

  function checkAnimate() {
    const windowBottom = $(window).scrollTop() + $(window).height();

    $items.each(function () {
      const itemTop = $(this).offset().top + 100;

      if (windowBottom > itemTop) {
        $(this).addClass('animated');
      }
    });
  }

  $(window).on('scroll', checkAnimate);
  checkAnimate();
});

// ===== GO TOP BUTTON =====
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

// ===== COUNTER ANIMATION=====
$(document).ready(function () {
  const $counters = $('[data-target]');

  function checkCounter() {
    const windowBottom = $(window).scrollTop() + $(window).height();

    $counters.each(function () {
      const $el = $(this);

      if ($el.data('animated')) return;

      const elementTop = $el.offset().top;

      if (windowBottom > elementTop + 100) {
        anime({
          targets: { value: 0 },
          value: Number($el.data('target')),
          duration: 2000,
          easing: 'easeOutExpo',
          round: 1,
          update: function (anim) {
            $el.html(
              anim.animations[0].currentValue + ($el.data('suffix') || '')
            );
          }
        });

        $el.data('animated', true);
      }
    });
  }

  $(window).on('scroll', checkCounter);
  checkCounter();
});

// ===== PAGE TRANSITION  =====
$(document).ready(function () {

  const $overlay = $(".page-transition");
  const $logo = $(".transition-logo");

  if ($logo.find("span").length === 0) {
    $logo.html(
      $logo.text().trim()
        .split("")
        .map(l => `<span>${l}</span>`)
        .join("")
    );
  }

  const letters = $(".transition-logo span").toArray();
  const panelLeft = $(".panel-left")[0];
  const panelRight = $(".panel-right")[0];

  function playTransition() {
    $overlay.css("display", "flex");

    anime.timeline({ easing: "easeInOutExpo" })
      .add({
        targets: letters,
        translateY: [60, 0],
        opacity: [0, 1],
        filter: ["blur(8px)", "blur(0px)"],
        delay: anime.stagger(80),
        duration: 800
      })
      .add({
        targets: letters,
        opacity: [1, 0],
        duration: 400,
        delay: 200
      })
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
      .add({
        complete: () => {
          $overlay.hide();

          anime.set(letters, {
            translateY: 60,
            opacity: 0,
            filter: "blur(8px)"
          });

          anime.set([panelLeft, panelRight], {
            translateX: "0%"
          });
        }
      });
  }

  playTransition();

});



// ===== SECTION TITLE ANIMATION =====
$(document).ready(function () {
  $('.section-title').each(function () {
    const $title = $(this);
    const text = $title.text().trim();

    if ($title.find('.word').length > 0) {
      return;
    }

    let newHTML = '';
    const words = text.split(/\s+/);

    words.forEach((word, wordIndex) => {
      if (!word) return;

      newHTML += '<span class="word">';

      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        newHTML += `<span class="char">${char}</span>`;
      }

      newHTML += '</span>';

      if (wordIndex < words.length - 1) {
        newHTML += ' ';
      }
    });

    $title.html(newHTML);

    const chars = $title.find('.char');

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
          targets: chars.toArray(),
          translateY: [
            { value: '-0.4em', duration: 400, easing: 'easeOutExpo' },
            { value: 0, duration: 600, easing: 'easeOutBounce' }
          ],
          opacity: [0, 1],
          delay: anime.stagger(30),
          easing: 'easeOutExpo'
        });

        animated = true;
        $(window).off('scroll', checkScroll);
      }
    }

    $(window).on('scroll', checkScroll);
    checkScroll();
  });
});

// ===== IMAGE PUZZLE ANIMATION =====
$(document).ready(function () {
  $('.animation-img').each(function () {
    const $img = $(this);
    let animated = false;

    const rows = 2;
    const cols = 2;

    const $parent = $img.parent();


    $parent.css({
      'position': 'relative',
      'overflow': 'hidden',
      'isolation': 'isolate'
    });


    const imgWidth = $img[0].naturalWidth || $img.width();
    const imgHeight = $img[0].naturalHeight || $img.height();

    if (imgWidth > 0 && imgHeight > 0) {
      $img.css('opacity', 0);
    } else {

      $img.on('load', function () {
        $img.css('opacity', 0);
      });
      return;
    }

    const pieces = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const $piece = $('<div></div>');

        $piece.css({
          'position': 'absolute',
          'width': imgWidth / cols + 'px',
          'height': imgHeight / rows + 'px',
          'left': (c * imgWidth / cols) + 'px',
          'top': (r * imgHeight / rows) + 'px',
          'background-image': `url(${$img.attr('src')})`,
          'background-size': `${imgWidth}px ${imgHeight}px`,
          'background-position': `-${c * imgWidth / cols}px -${r * imgHeight / rows}px`,
          'will-change': 'transform, opacity',
          'backface-visibility': 'hidden',
          'transform': 'translateZ(0)'
        });

        $parent.append($piece);
        pieces.push($piece[0]);
      }
    }

    function checkScroll() {
      if (animated) return;

      const elementTop = $img.offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > elementTop + 100) {

        anime.set(pieces, {
          translateY: () => anime.random(-150, 150),
          translateX: () => anime.random(-150, 150),
          opacity: 0
        });

        anime({
          targets: pieces,
          translateX: 0,
          translateY: 0,
          opacity: 1,
          delay: anime.stagger(25, { from: 'center' }),
          duration: 800,
          easing: 'easeOutCubic',
          complete: function () {
            $img.css('opacity', 1);

            anime({
              targets: pieces,
              opacity: 0,
              duration: 200,
              easing: 'easeOutQuad',
              complete: function () {
                $(pieces).remove();

                $img.css('will-change', 'auto');
              }
            });
          }
        });

        animated = true;

        $(window).off('scroll', checkScroll);
      }
    }

    $(window).on('scroll', checkScroll);
    checkScroll();
  });
});

// ===== SCROLL ANIMATIONS =====
$(document).ready(function () {
  const isMobile = $(window).width() <= 768;

  const moveDistance = isMobile ? 20 : 150;
  const zoomScale = isMobile ? 1.02 : 1.3;
  const blurAmount = isMobile ? 3 : 15;

  const animatedElements = [];

  function setupElement(el, type, direction = null) {
    const $el = $(el);

    $el.css({
      'position': 'relative',
      'opacity': 0,
      'will-change': 'transform, opacity',
      'backface-visibility': 'hidden'
    });

    if (isMobile) {
      $el.attr('data-mobile-simple', 'true');
    } else {
      if (type === 'slide') {
        if (direction === 'left') $el.css('transform', `translateX(-${moveDistance}px)`);
        if (direction === 'right') $el.css('transform', `translateX(${moveDistance}px)`);
        if (direction === 'top') $el.css('transform', `translateY(-${moveDistance}px)`);
        if (direction === 'bottom') $el.css('transform', `translateY(${moveDistance}px)`);
      }

      if (type === 'zoom') {
        $el.css({
          'transform': `scale(${zoomScale})`,
          'overflow': 'hidden'
        });
      }

      if (type === 'flip') {
        $el.css('transform', 'perspective(1000px) rotateY(90deg)');
      }

      if (type === 'blur') {
        $el.css({
          'transform': `translateY(40px)`,
          'filter': `blur(${blurAmount}px)`
        });
      }
    }

    animatedElements.push({
      el: el,
      type: type,
      direction: direction,
      animated: false
    });
  }

  $('.animation-left').each(function () {
    setupElement(this, 'slide', 'left');
  });

  $('.animation-right').each(function () {
    setupElement(this, 'slide', 'right');
  });

  $('.animation-top').each(function () {
    setupElement(this, 'slide', 'top');
  });

  $('.animation-bottom').each(function () {
    setupElement(this, 'slide', 'bottom');
  });

  $('.anim-zoom').each(function () {
    setupElement(this, 'zoom');
  });

  $('.anim-flip').each(function () {
    setupElement(this, 'flip');
  });

  $('.anim-blur').each(function () {
    setupElement(this, 'blur');
  });

  function checkScroll() {
    const windowBottom = $(window).scrollTop() + $(window).height();

    animatedElements.forEach(item => {
      if (item.animated) return;

      const elementTop = $(item.el).offset().top;

      if (windowBottom > elementTop + 80) {
        if (isMobile) {
          anime({
            targets: item.el,
            opacity: [0, 1],
            duration: 600,
            easing: 'easeOutQuad'
          });
          item.animated = true;
          return;
        }

        if (item.type === 'slide') {
          anime({
            targets: item.el,
            translateX: 0,
            translateY: 0,
            opacity: [0, 1],
            duration: 900,
            easing: 'easeOutExpo'
          });
        }

        if (item.type === 'zoom') {
          anime({
            targets: item.el,
            scale: [zoomScale, 1],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
          });
        }

        if (item.type === 'flip') {
          anime({
            targets: item.el,
            rotateY: [90, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
          });
        }

        if (item.type === 'blur') {
          anime({
            targets: item.el,
            translateY: 0,
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            update: function (anim) {
              const progress = anim.progress / 100;
              item.el.style.filter = `blur(${blurAmount - (blurAmount * progress)}px)`;
            }
          });
        }

        item.animated = true;
      }
    });
  }

  $(window).on('scroll', checkScroll);
  checkScroll();
});