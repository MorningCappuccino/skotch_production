;(function() {
    'use strict';

    var App = {
        init: function() {
            for (var prop in this) {
                if (prop != 'init') {
                    App[prop]();
                }
            }
        },

        initWorksCarousel: function() {
            var owl = $('.works-carousel');
            var settings = {
                items: 2,
                loop: true,
                margin: 20,
                stagePadding: 50
            }

            owl.owlCarousel(settings);
        },

        initPDCarousel: function() {
            var owl = $('.pd-carousel');
            var settings = {
                items: 1,
                loop: false,
                nav: true,
                navText: ['', '']
            }

            owl.owlCarousel(settings);
        },

        initMenuSmoothScroll: function() {
            $('.skotch-menu nav a').on('click', function(ev) {
                let link = $(ev.target).attr('href');
                var targetScrollTop = $(link).offset().top;
                $('html, body').animate({scrollTop: targetScrollTop}, 1000);
            });
        },

        initMobileMenu: function() {
            $('.skotch-menu .burger').on('click', function() {
                $('.mobile-menu').fadeIn();
            });

            // Close button
            $('.mobile-menu-close').on('click', function() {
                $('.mobile-menu').fadeOut();
            });

            $('.mobile-menu nav a').on('click', function(ev) {
                let link = $(ev.target).attr('href');
                var targetScrollTop = $(link).offset().top;
                $('html, body').animate({scrollTop: targetScrollTop}, 1000);

                $('.mobile-menu').fadeOut();
            });
        }
    }

    $(document).ready(function() {
        App.init();
    });
})();

