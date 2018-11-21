import $ from 'jquery';
import '../../node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min';
import Swiper from 'swiper';
import '../../node_modules/jquery-popup-overlay/jquery.popupoverlay';
import '../../node_modules/jquery-mask-plugin/dist/jquery.mask.min';
import '../../node_modules/jquery-validation/dist/jquery.validate.min';

//---- BEFORE -----
var num = Number($('.quality__block').length), i, str, elem;
for (i = 1; i <= num; i++) {
  str = i;
  if (str < 10) {
    elem = '0'+i;
  } else {
    elem = i;
  }
  document.styleSheets[0].addRule('.quality__block:nth-of-type('+i+')::before','content: "'+elem+'";');
}

//---- ADD SLIDER - SWIPER ----
var swiper = new Swiper('.gallery__wrapper .swiper-container', {
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    420: {
      slidesPerView: 1,
      spaceBetween: 10,
    }
  }
});
var swiper = new Swiper('.clothes__wrapper .swiper-container', {
  slidesPerView: 4,
  spaceBetween: 20,
  autoHeight: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 60,
      centeredSlides: false,
      loop: true
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true
    }
  }
});
var swiper = new Swiper('.technique__wrapper .swiper-container', {
  slidesPerView: 4,
  spaceBetween: 20,
  autoHeight: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 60,
      centeredSlides: false,
      loop: true
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true
    }
  }
});
//---- SCROOLL ----
$(window).scroll(function() {
  if($(this).scrollTop() > 650) {
    $('.nav').addClass('scroll');
  }
  else {
    $('.nav').removeClass('scroll');
  }
});

$(document).ready(function() {
  //---- POPUP ----
  $('.modal').popup({
    transition: 'all 0.3s',
    outline: true, // optional
    focusdelay: 400, // optional
    vertical: 'top', //optional
    // onclose: function() {
    //   $(this).find('label.error').remove();
    // }
  });
  //---- TABS ----
  $('.price__tabs_item').not(':first').hide();
  $('.price__tabs_tab').click(function() {
    $('.price__tabs_tab').removeClass('active').eq($(this).index()).addClass('active');
    $('.price__tabs_item').hide().eq($(this).index()).fadeIn();
  }).eq(0).addClass('active');
  //---- NAV HAMBURGER ----
  $('.nav__button').click(function() {
    $('.nav__adaptive').toggleClass('active');
    $('.nav__button').toggleClass('active');
    $('.nav').toggleClass('active');
  });
  $('.nav a').click(function() {
    $('.nav__adaptive').removeClass('active');
    $('.nav__button').removeClass('active');
    $('.nav').removeClass('active');
  });
  //---ANCHORN---
  $('.menu a').on('click', function(event) {
    var target = $(this.getAttribute('href'));

    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });
  //---ANCHORN---
  $('.choice__block').on('click', function(event) {
    var target = $(this.getAttribute('href'));

    if (target.length) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });
  // --- jQuery Mask + jquery VALIDATION ---
  $('input[type="tel"]').mask('+7 (000) 000-00-00');
  jQuery.validator.addMethod('phoneno', function(phone_number, element) {
    return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, 'Введите Ваш телефон');

  $('.form').each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        name: 'required',
        agree: 'required',
        tel: {
          required: true,
          phoneno: true
        }
      },
      messages: {
        name: 'Введите Ваше имя',
        tel: 'Введите Ваш телефон',
        agree: 'Нужно соглашение на обработку данных',
      },
      submitHandler: function(form) {
        var t = $('.form-' + index).serialize();
        console.log(t);
        ajaxSend('.form-' + index, t);
      }
    });
  });
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: 'POST',
      url: 'sendmail.php',
      data: data,
      success: function() {
        $('.modal').popup('hide');
        $('#thanks').popup('show');
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  };
});
