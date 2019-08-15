(function ($) {
	"use strict";
	var nav = $('nav');
	var navHeight = nav.outerHeight();

	$('.navbar-toggler').on('click', function () {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
	})

	// Preloader
	$(window).on('load', function () {
		if ($('#preloader').length) {
			$('#preloader').delay(100).fadeOut('slow', function () {
				$(this).remove();
			});
		}
	});

	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
		return false;
	});

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
		var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

	$(document).ready(function () {
		var me = {};

		var you = {};
		var $chatbox = $('.chatbox'),
			$chatboxTitle = $('.chatbox__title'),
			$chatboxTitleClose = $('.chatbox__title__close'),
			$chatboxCredentials = $('.chatbox__credentials');
		$chatboxTitle.on('click', function () {
			$chatbox.toggleClass('chatbox--tray');
		});
		$chatboxTitleClose.on('click', function (e) {
			e.stopPropagation();
			$chatbox.addClass('chatbox--closed');
		});
		$chatbox.on('transitionend', function () {
			if ($chatbox.hasClass('chatbox--closed')) $chatbox.remove();
		});
		$chatboxCredentials.on('submit', function (e) {
			e.preventDefault();
			$chatbox.removeClass('chatbox--empty');
		});

		function formatAMPM(date) {
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var ampm = hours >= 12 ? 'PM' : 'AM';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0'+minutes : minutes;
			var strTime = hours + ':' + minutes + ' ' + ampm;
			return strTime;
		}   

		function insertChat(who, text, time = 0) {
			var control = "";
			var date = formatAMPM(new Date());

			if (who == "me") {

				control = '<div class="chatbox__body__message chatbox__body__message--left">' +
					'<img<ion-icon name="person"></ion-icon>'+
					'<p>' + text + '</p><br/>' +
					'<small>' + date + '</small>' +
					'</div>' 
			} else {
				control = `<div class="chatbox__body__message chatbox__body__message--left">
					<img src="./img/chatbox.png" alt="Picture"><br/>
					<p>${text}</p>
					<small>${date}</small>
				</div>
				`
			}
			setTimeout(
				function () {
					$(".chatbox__body").append(control);

				}, time);

		}

		function resetChat() {
			$("ul").empty();
		}

		$(".chatbox__message").on("keyup", function (e) {
			if (e.which == 13) {
				var text = $(this).val();
				if (text !== "") {
					insertChat("me", text);
					$(this).val('');
				}
			}
		});

		insertChat("you", "Bienvenido, que que podemos ayudarte?", 2); 
	});

})(jQuery);
