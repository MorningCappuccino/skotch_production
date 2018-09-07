
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
    }
}

$(document).ready(function() {
    App.init();
});
