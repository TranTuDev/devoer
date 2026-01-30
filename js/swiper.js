// Portfolio Swiper
if ($(".swiper-portfolio").length) {
  new Swiper(".swiper-portfolio", {
    slidesPerView: 5,
    spaceBetween: 10,
    speed: 1000,
    loop: false, // khuyên TẮT nếu dùng pagination
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".sw-pagination-portfolio",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 5 },
    },
  });
}

// autoplay: {
//   delay: 2500,
//   disableOnInteraction: false,
// },
// Testimonial Swiper
$(document).ready(function () {

  let swiperTestimonialLeft = null;
  let swiperTestimonialRight = null;

  // Slider trái (ảnh)
  if ($(".swiper-testimonial-left").length > 0) {
    swiperTestimonialLeft = new Swiper(".swiper-testimonial-left", {
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 800,
      loop: true,
      allowTouchMove: true,
      grabCursor: true,

      // ✔ Thêm breakpoints để căn giữa khi < 991px
      breakpoints: {
        0: {
          slidesPerView: 1,
          centeredSlides: true,   // slide nằm giữa
        },
        992: {
          slidesPerView: 1,       // hoặc 2, tuỳ desktop layout
          centeredSlides: false,
        }
      }
    });
  }


  // Slider phải (nội dung)
  if ($(".swiper-testimonial-right").length > 0) {
    swiperTestimonialRight = new Swiper(".swiper-testimonial-right", {
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 800,
      loop: true,
      autoHeight: true,

      pagination: {
        el: ".sw-pagination-testimonial",
        clickable: true,
      },
    });
  }

  // Sync 2 slider
  if (swiperTestimonialLeft && swiperTestimonialRight) {
    swiperTestimonialLeft.controller.control = swiperTestimonialRight;
    swiperTestimonialRight.controller.control = swiperTestimonialLeft;
  }

});





if ($(".slider-home-right").length > 0) {
  var swiperTestimonialLeft = new Swiper(".slider-home-right", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1500,
    loop: true,

    navigation: {
      nextEl: ".sw-btn-next",
      prevEl: ".sw-btn-prev",
    },

    pagination: {
      el: ".sw-pagination-testimonial",
      clickable: true,
    },
  });
}

if ($(".portfolio-slider").length > 0) {

  var swiperPortfolio = new Swiper(".portfolio-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 600,
    loop: false,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    breakpoints: {
      1400: { slidesPerView: 4 },
      1200: { slidesPerView: 4 },
      992: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      0: { slidesPerView: 1 }
    }
  });

}


const playButtons = document.querySelectorAll('.video-play-button');
const popup = document.getElementById('videoPopup');
const iframe = document.getElementById('videoFrame');
const closeBtn = document.getElementById('videoClose');

playButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const videoSrc = btn.getAttribute('data-video');
    iframe.src = videoSrc;  // Gán URL vào iframe
    popup.style.display = 'flex';
  });
});

// Close popup
closeBtn.addEventListener('click', () => {
  iframe.src = ''; // Dừng video khi đóng
  popup.style.display = 'none';
});

// Close khi click ra ngoài video
popup.addEventListener('click', e => {
  if (e.target === popup) {
    iframe.src = '';
    popup.style.display = 'none';
  }
});


const serviceSlider = new Swiper('.course-details-slider', {
  slidesPerView: 2,
  spaceBetween: 30,
  slidesPerGroup: 3,
  loop: false,
  navigation: {
    nextEl: '.sw-next',
    prevEl: '.sw-prev',
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1200: {
      slidesPerView: 2,
      slidesPerGroup: 3,
    }
  }
});
