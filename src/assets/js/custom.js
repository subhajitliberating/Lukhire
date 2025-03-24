//Navbar-shrink Js
// jQuery(document).ready(function () {
//     jQuery(document).on("scroll", function () {
//         if (jQuery(document).scrollTop() > 50) {
//             jQuery(".navbar-default").addClass("navbar-shrink");
//         } else {
//             jQuery(".navbar-default").removeClass("navbar-shrink");
//         }
//     });
// });

//Categorie Slider Js
jQuery(document).ready(function () {
    jQuery('.categorie-slider').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        autoplay: true,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 4,
            }
        }
    })
});

//Count Js
// jQuery(document).ready(function () {
//     function visible(partial) {
//         var $t = partial,
//             $w = jQuery(window),
//             viewTop = $w.scrollTop(),
//             viewBottom = viewTop + $w.height(),
//             _top = $t.offset().top,
//             _bottom = _top + $t.height(),
//             compareTop = partial === true ? _bottom : _top,
//             compareBottom = partial === true ? _top : _bottom;
//         return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));
//     }
//     jQuery(window).scroll(function () {
//         if (visible(jQuery('.count'))) {
//             if (jQuery('.count').hasClass('counter-loaded')) return;
//             jQuery('.count').addClass('counter-loaded');
//             jQuery('.count').each(function () {
//                 var $this = jQuery(this);
//                 jQuery({
//                     Counter: 0
//                 }).animate({
//                     Counter: $this.text()
//                 }, {
//                     duration: 5000,
//                     easing: 'swing',
//                     step: function () {
//                         $this.text(Math.ceil(this.Counter));
//                     }
//                 });
//             });
//         }
//     });
// });

//Thumbnail Slider
jQuery(document).ready(function () {
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 3; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        slideSpeed: 2000,
        nav: false,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate: 200,
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: false,
            nav: true,
            items: 4,
            autoplay: true,
            smartSpeed: 200,
            slideSpeed: 500,
            margin: 8,
            slideBy: slidesPerPage,
            responsiveRefreshRate: 100
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function (e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
});

//Mobile Menu Js
jQuery(document).ready(function () {
    jQuery('.mob_open_menu').click(function () {
        jQuery('.navigation').toggleClass('open_menu');
    });
    jQuery('.mob_close_menu').click(function () {
        jQuery('.navigation').removeClass('open_menu');
    });
});

//Top_button Js
jQuery(document).ready(function () {
    var btn = jQuery('#top_button');
    jQuery(window).scroll(function () {
        if (jQuery(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });
    btn.on('click', function (e) {
        e.preventDefault();
        jQuery('html, body').animate({
            scrollTop: 0
        }, '300');
    });
});

//AOS Js

//Input textarea Animation
jQuery(document).ready(function () {
    jQuery('input,textarea').focus(function () {
        $(this).parents('.form-group').addClass('focused');
    });

    jQuery('input,textarea').blur(function () {
        var inputValue = $(this).val();
        if (inputValue == "") {
            $(this).removeClass('filled');
            $(this).parents('.form-group').removeClass('focused');
        } else {
            $(this).addClass('filled');
        }
    })
});

//Accordion Js
// jQuery(document).ready(function () {
//     jQuery(function () {
//         jQuery(".accordion-content:not(:first-of-type)").css("display", "none");
//         jQuery(".js-accordion-title:first-of-type").addClass("open");
//         jQuery(".js-accordion-title").click(function () {
//             jQuery(".open").not(this).removeClass("open").next().slideUp(300);
//             jQuery(this).toggleClass("open").next().slideToggle(300);
//         });
//     });
// });

//Number Js
jQuery(document).ready(function () {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
});
