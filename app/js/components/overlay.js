$(function () {
  $('.overlay').on('click', function () {
    $('.mobile-menu').removeClass('mobile-menu--active');
    $('.overlay').removeClass('overlay--active');
    $('.burger__line').removeClass('burger__line--active');
  });
});