 $(function () {

   // Кнопка открыть мобильное меню
   $('.burger').on('click', function () {
     $('.mobile-menu').toggleClass('mobile-menu--active');
     $('.overlay').toggleClass('overlay--active');
     $('#header').toggleClass('header--active');
     $('.burger__line').toggleClass('burger__line--active');
   });

   // Кнопка закрыть мобильное меню
   $('.burger--close').on('click', function () {
     $('.mobile-menu').removeClass('mobile-menu--active');
     $('.overlay').removeClass('overlay--active');
     $('.burger__line').removeClass('burger__line--active');
   });
 });