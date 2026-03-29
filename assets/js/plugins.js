 /* ==============
 ========= js documentation ==========================
 
 * Template Name: Tradexy 
 * Version: 1.0
 * Author: pixelaxis
 * Author URI: https://themeforest.net/user/pixelaxis
 * Description: Forex & Stock Broker Trading Signals, Review, Tutorial Website Template

    ==================================================

     01. wow init
     -------------------------------------------------
     02. niceSelect
     -------------------------------------------------
     03. magnificPopup
     -------------------------------------------------
     04. odometer counter
     -------------------------------------------------
     05. form validate
     -------------------------------------------------
     06. feature slider
     -------------------------------------------------
     07. testimonials slider
     -------------------------------------------------
     08. testimonials-secondary slider
     -------------------------------------------------
     09. sponsor slider
     -------------------------------------------------

    ==================================================
============== */

(function ($) {
    "use strict";

    jQuery(document).ready(function () {

        // wow init
        new WOW({
            offset: 200
          }).init();
          
        //   niceSelect
        $('select').niceSelect();

        // magnific-popup
        $('.popup-video').magnificPopup({
            type: 'iframe'
        });

        // odometer counter
        $(".odometer").each(function () {
            $(this).isInViewport(function (status) {
                if (status === "entered") {
                    for (
                        var i = 0;
                        i < document.querySelectorAll(".odometer").length;
                        i++
                    ) {
                        var el = document.querySelectorAll(".odometer")[i];
                        el.innerHTML = el.getAttribute("data-odometer-final");
                    }
                }
            });
        });

        // form validate
        $("#frmContactus").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                message: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
                subject: {
                    required: true
                },
            },
            messages: {
                name: {
                    minlength: "Name should be at least 2 characters"
                },
                message: {
                    number: "Offer should be at least 5 characters"
                }
            }
        });

        // feature slider
        $(".hero-version5-wrapper")
            .not(".slick-initialized")
            .slick({
                infinite: true,
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 1000,
                arrows: false,
                fade: true,
                dots: true,
            });

        // feature slider
        $(".feature_slider")
            .not(".slick-initialized")
            .slick({
                infinite: true,
                // autoplay: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                speed: 1500,
                arrows: false,
                dots: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                        },
                    }
                ],
            });

        // feature slider
        $(".aitable-sponsor-wrap")
            .not(".slick-initialized")
            .slick({
                infinite: true,
                autoplay: true,
                slidesToShow: 6,
                slidesToScroll: 1,
                speed: 1500,
                autoplaySpeed: 2000,
                arrows: false,
                dots: false,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 6,
                        },
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 5,
                        },
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                        },
                    }
                ],
            });

        // Hero Loan4
        $(".hero-homelon-slider")
        .not(".slick-initialized")
        .slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            speed: 1500,
            arrows: true,
            dots: false,
            prevArrow: $(".prev-testimonials2"),
            nextArrow: $(".next-testimonials2"),
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 0,
                    settings: {
                        slidesToShow: 2,
                    },
                }
            ],
        });

        // Hero Loan5
        $(".hero-homelon-slider2")
        .not(".slick-initialized")
        .slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            speed: 1500,
            arrows: true,
            dots: false,
            prevArrow: $(".prev-testimonials2"),
            nextArrow: $(".next-testimonials2"),
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 0,
                    settings: {
                        slidesToShow: 2,
                    },
                }
            ],
        });

        // testimonials-slider
        $(".testimonials-slider")
            .not(".slick-initialized")
            .slick({
                infinite: true,
                autoplay: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                speed: 1500,
                arrows: true,
                dots: false,
                prevArrow: $(".prev-testimonials1"),
                nextArrow: $(".next-testimonials1"),
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                        },
                    }
                ],
            });

        // testimonials-slider2
        $(".testimonials-slider2")
            .not(".slick-initialized")
            .slick({
                infinite: true,
                centerMode: true,
                autoplay: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                speed: 1500,
                arrows: true,
                dots: false,
                prevArrow: $(".prev-testimonials1"),
                nextArrow: $(".next-testimonials1"),
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 700,
                        settings: {
                            slidesToShow: 1,
                        },
                    }
                ],
            });

        // testimonials-slider3
        $(".testimonials-slider3")
            .not(".slick-initialized")
            .slick({
                infinite: true,
                autoplay: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                speed: 1500,
                arrows: true,
                dots: false,
                prevArrow: $(".prev-testimonials1"),
                nextArrow: $(".next-testimonials1"),
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                        },
                    },
                    {
                        breakpoint: 700,
                        settings: {
                            slidesToShow: 1,
                        },
                    }
                ],
            });

        // index-2
        // testimonials-secondary slider
        $(".testimonials-secondary_slider")
        .not(".slick-initialized")
        .slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 1500,
            arrows: true,
            dots: false,
            prevArrow: $(".prev-testimonials"),
            nextArrow: $(".next-testimonials"),
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    },
                }
            ],
        });

        // testimonials-secondary slider
        $(".testimonials-secondary_slider3")
        .not(".slick-initialized")
        .slick({
            infinite: true,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1500,
            arrows: true,
            dots: true,
            prevArrow: $(".prev-testimonials"),
            nextArrow: $(".next-testimonials"),
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    },
                }
            ],
        });

        // sponsor-slider
        $('#sponsor__company').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 5000,
            pauseOnHover: false,
            cssEase: 'linear',
            arrows: false,
            variableWidth:true,
        });

    });
})(jQuery);
