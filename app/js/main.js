$(function () {

  // Закрыть по esc
  $("body").keyup((e) => {
    if (e.keyCode === 27) {
      $('.mobile-menu').removeClass('mobile-menu--active');
      $('.overlay').removeClass('overlay--active');
      $('.burger__line').removeClass('burger__line--active');
    }
  });

  // Бургер при скролле
  var header = $('.burger'),
    scrollPrev = 0;

  $(window).scroll(function () {
    var scrolled = $(window).scrollTop();

    if (scrolled > 50) {
      $('.burger').addClass('burger--scroll');
    } else {
      $('.burger').removeClass('burger--scroll');
    }
    scrollPrev = scrolled;
  });

  //  Закрыть мобильное меню по клику на якоря
  $('.mobile-menu__link').on('click', function () {
    $('.mobile-menu').removeClass('mobile-menu--active');
    $('.overlay').removeClass('overlay--active');
    $('.burger__line').removeClass('burger__line--active');
  });

  // Скрол для якорей
  $('.header-menu__link, .mobile-menu__link, .hero__btn').on('click', function () {
    let href = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(href).offset().top
    }, {
      duration: 400,
      easing: "linear"
    });
    return false;
  });

  // Липкое меню
  var header = $('.header'),
    scrollPrev = 0;

  $(window).scroll(function () {
    var scrolled = $(window).scrollTop();

    if (scrolled > 50) {
      $('.header').addClass('header--scroll');
    } else {
      $('.header').removeClass('header--scroll');
    }
    scrollPrev = scrolled;
  });

  // Тач для меню
  var menuTouch = $('.mobile-menu');

  $(".mobile-menu").swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == 'right') {
        // $('.mobile-menu').addClass('mobile-menu--active');
        // $('.overlay').addClass('overlay--active');
        // $('#header').addClass('header--active');
        // $('.burger__line').addClass('burger__line--active');
      } else if (direction == 'left') {
        $('.mobile-menu').removeClass('mobile-menu--active');
        $('.overlay').removeClass('overlay--active');
        $('.burger__line').removeClass('burger__line--active');
      }
    }
  });

  // Слайдер
  const myCarousel = new Carousel(document.querySelector("#myCarousel"), {
    Dots: true,
    slidesPerPage: 1,
  });

  // Анимация при скролле
  new WOW().init();
});