/* ==============
 ========= js documentation ==========================
 
 * Template Name: Tradexy 
 * Version: 1.0
 * Author: pixelaxis
 * Author URI: https://themeforest.net/user/pixelaxis
 * Description: Forex & Stock Broker Trading Signals, Review, Tutorial Website Template
 
 * ==================================================
    
     01. preloader
     -------------------------------------------------
     02. on scroll actions
     -------------------------------------------------
     03. scroll top
     -------------------------------------------------
     04. navbar active color
     -------------------------------------------------
     05. magnificPopup
     -------------------------------------------------
     06. data background
     -------------------------------------------------
     07. reply
     -------------------------------------------------
     07. nav-right__search
     -------------------------------------------------
     08. sidebar_btn
     -------------------------------------------------
     09. faq
     -------------------------------------------------
     10. browse-spaces-filter__tab
     -------------------------------------------------
     11. contact ajax
     -------------------------------------------------
     12. btn_theme
     -------------------------------------------------
     13. price-range
     -------------------------------------------------
     13. calculator_submit
     -------------------------------------------------
     14. copyright year
     -------------------------------------------------
     
    ==================================================
============== */


    jQuery(document).ready(function () {

        // pre_loader
        $(".preloader").delay(300).animate({
            "opacity": "0"
        }, 800, function () {
            $(".preloader").css("display", "none");
        });

        // on scroll actions
        var scroll_offset = 120;
        $(window).scroll(function () {
            var $this = $(window);
            if ($('.header-section').length) {
                if ($this.scrollTop() > scroll_offset) {
                    $('.header-section').addClass('header-active');
                } else {
                    $('.header-section').removeClass('header-active');
                }
            }
        });

        // scroll top
        $(window).scroll(function () {
            if ($(window).scrollTop() > 500) {
                $('.scrollToTop').addClass('topActive');
            }
            else {
                $('.scrollToTop').removeClass('topActive');
            }
        });

        // navbar active color
        $(document).on("click", ".navbar-nav .nav-item a", function(){
            $(".nav-item a").removeClass("active");
            $(this).addClass("active");
        });

        // magnificPopup
        $('.popup_img').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });

        // data background
        $("[data-background]").each(function () {
            $(this).css(
                "background-image",
                "url(" + $(this).attr("data-background") + ")"
            );
        });

        // reply
        $(".reply").on("click", function () {
            $(this).toggleClass("reply-active");
            $(this).parent().next(".reply__content").slideToggle();
        });

        //--View All Content
        $(".view-btn").on("click", function () {
            $(this).toggleClass("view-active");
            $(this).parents().next(".view-content-wrap").toggleClass("active").slideToggle();
        });        

        // nav-right__search
        $(".nav-right__search-icon").on("click", function (event) {
            event.stopPropagation(); 
            $(this).toggleClass("active");
            $(this).parent().next(".nav-right__search-inner").slideToggle();
        });
        $(document).on("click", function (event) {
            if (!$(event.target).closest(".nav-right__search-icon, .nav-right__search-inner").length) {
                $(".nav-right__search-inner").slideUp();
                $(".nav-right__search-icon").removeClass("active");
            }
        });

        // sidebar_btn
        $(".sidebar_btn").on("click", function () {
            $('.cus_scrollbar').toggleClass("show");
        });

        // faq
        $(".accordion-header").on("click", function () {
            $('.accordion-item').removeClass("accordion_bg");
            $(this).parent().closest('.accordion-item').toggleClass("accordion_bg");
        });

        // browse-spaces-filter__tab
        $('#browse-spaces-filter__tab li a').on("click", function () {
            var ourClass = $(this).attr('class');
            $('#browse-spaces-filter__tab li').removeClass('active');
            $(this).parent().addClass('active');

            if (ourClass == 'all') {
                $('#browse-spaces-filter__content').children('div.item').show();
            } else {
                $('#browse-spaces-filter__content').children('div:not(.' + ourClass + ')').hide();
                $('#browse-spaces-filter__content').children('div.' + ourClass).show();
            }
            return false;
        });

        // copyright year
        $("#copyYear").text(new Date().getFullYear());

    });

    // btn_theme
    $(function() {  
        $('.btn_theme')
          .on('mouseenter', function(e) {
                  var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                  $(this).find('span').css({top:relY, left:relX})
          })
          .on('mouseout', function(e) {
                  var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
              $(this).find('span').css({top:relY, left:relX})
          });
    });
   
    (function () {
        // Function to handle multiple sliders
        function RangeSlider(sliderOneId, sliderTwoId, minValId, maxValId, totalOutputId, sliderTrackSelector) {
            // Get DOM elements
            let sliderOne = document.getElementById(sliderOneId);
            let sliderTwo = document.getElementById(sliderTwoId);
            let displayValOne = document.getElementById(minValId);
            let displayValTwo = document.getElementById(maxValId);
            let totalOutput = document.getElementById(totalOutputId);
            let sliderTrack = document.querySelector(sliderTrackSelector);
            let minGap = 0;
            let sliderMaxValue = sliderOne.max;
    
            // Update first slider value
            function slideOne() {
                if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
                    sliderOne.value = parseInt(sliderTwo.value) - minGap;
                }
                displayValOne.textContent = sliderOne.value;
                updateTotal();  
                fillColor();  
            }
    
            // Update second slider value
            function slideTwo() {
                if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
                    sliderTwo.value = parseInt(sliderOne.value) + minGap;
                }
                displayValTwo.textContent = sliderTwo.value;
                updateTotal(); 
                fillColor();  
            }
    
            // Update the total price range and display it
            function updateTotal() {
                let total = sliderTwo.value - sliderOne.value;
                totalOutput.textContent = `Years: ${total}`;
            }
    
            // Update slider track background color
            function fillColor() {
                let percent1 = (sliderOne.value / sliderMaxValue) * 100;
                let percent2 = (sliderTwo.value / sliderMaxValue) * 100;
                sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #074C3E ${percent1}% , #074C3E ${percent2}%, #dadae5 ${percent2}%)`;
            }    
            sliderOne.addEventListener('input', slideOne);
            sliderTwo.addEventListener('input', slideTwo);
    
            slideOne();
            slideTwo();
        }
    
        // Initialize all sliders on the page
        window.addEventListener('DOMContentLoaded', function () {
            if (document.getElementById('range-slider-1') && document.getElementById('range-slider-2')) {
                new RangeSlider('range-slider-1', 'range-slider-2', 'min-value', 'max-value', 'range-output', '.slider-track');
            }
    
            if (document.getElementById('range-slider-3') && document.getElementById('range-slider-4')) {
                new RangeSlider('range-slider-3', 'range-slider-4', 'min-value-2', 'max-value-2', 'range-output-2', '.slider-track-2');
            }
        });
    
        // Calculator logic, checking if elements exist
        const amount = document.getElementById('amount'),
            interest = document.getElementById('interest'),
            year = document.getElementById('year'),
            monthly_cost = document.getElementById('monthly_cost'),
            calculate = document.getElementById('calc_submit'),
            total_value = document.getElementById('total_value');
    
        const amount2 = document.getElementById('amount2'),
            interest2 = document.getElementById('interest2'),
            year2 = document.getElementById('year2'),
            monthly_cost2 = document.getElementById('monthly_cost2'),
            calculate2 = document.getElementById('calc_submit2'),
            total_value2 = document.getElementById('total_value2');
    
        if (calculate) {
            calculate.addEventListener('click', function (e) {
                e.preventDefault();
                if (amount && interest && year) {
                    let total = (amount.value / 100 * interest.value) + parseInt(amount.value);
                    total_value.innerHTML = total.toFixed(2);
                    monthly_cost.innerHTML = (total / (year.value * 12)).toFixed(2);
                }
                if (amount2 && interest2 && year2) {
                    let total2 = (amount2.value / 100 * interest2.value) + parseInt(amount2.value);
                    total_value2.innerHTML = total2.toFixed(2);
                    monthly_cost2.innerHTML = (total2 / (year2.value * 12)).toFixed(2);
                }
            });
        }
    
        // Additional event listener for second calculator (if applicable)
        if (calculate2) {
            calculate2.addEventListener('click', function (e) {
                e.preventDefault();
                if (amount2 && interest2 && year2) {
                    let total2 = (amount2.value / 100 * interest2.value) + parseInt(amount2.value);
                    total_value2.innerHTML = total2.toFixed(2);
                    monthly_cost2.innerHTML = (total2 / (year2.value * 12)).toFixed(2);
                }
            });
        }
    })();
    
    // Ensure the script runs after DOM is loaded
    document.addEventListener("DOMContentLoaded", function () {
        const inputs = document.querySelectorAll('.passwordInput');
        inputs.forEach(input => {
            const eye = input.querySelector('.bi-eye'); // Corrected class name
            const eyeSlash = input.querySelector('.bi-eye-slash'); // Corrected class name
            const password = input.querySelector('input');
            if (eye && eyeSlash && password) {
                eyeSlash.addEventListener('click', () => {
                    password.type = 'text';
                    eye.style.display = 'inline-block';
                    eyeSlash.style.display = 'none';
                });
                eye.addEventListener('click', () => {
                    password.type = 'password';
                    eye.style.display = 'none';
                    eyeSlash.style.display = 'inline-block';
                });
            }
        });
    });
