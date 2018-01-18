
/*
 * jQuery Raptorize Plugin
 * @acrogenesis
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {
	var raptorUrls = [
        '/images/bayadaturns40.png',
        '/images/40years-mark.png'
    ];

    var raptorCounter = 0;

  //Stupid Browser Checking which should be in jQuery
  jQuery.browser = {};
  jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
  jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());

  $.fn.raptorize = function(options) {
  	var randomImageUrl = raptorUrls[Math.floor(Math.random() * raptorUrls.length)];
    //Yo' defaults
    var defaults = {
      enterOn: 'konami-code', //timer, konami-code, click
      delayTime: 5000 //time before raptor attacks on timer mode
    };

    //Extend those options
    var options = $.extend(defaults, options);
    return this.each(function () {
        var _this = $(this);
        var audioSupported = false;

        if ($.browser.mozilla || $.browser.webkit) {
            audioSupported = true;
        }

        $(".elRaptor").remove();
        //Raptor Vars
        var raptorImageMarkup = '<img class="elRaptor" style="display: none;" src="' + randomImageUrl + '"  />';
        var locked = false;

        //Append Raptor and Style
        var raptor = $(raptorImageMarkup);
        $('body').append(raptor);
        raptor.css({
            "position":"fixed",
            "bottom": "-300px",
            "right" : "0",
            "display" : "none"
        });


        // Animating Code



        if(options.enterOn == 'timer') {
            setTimeout(init, options.delayTime);
        } else if(options.enterOn == 'click') {
            _this.bind('click', function(e) {
                e.preventDefault();
                if(!locked) {
                    init();
                }
            })
        } else if(options.enterOn == 'konami-code'){
            var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
            $(window).bind("keydown.raptorz", function(e){
            kkeys.push( e.keyCode );
            if ( kkeys.toString().indexOf( konami ) >= 0 ) {
                init();
                function init() {
            var image = new Image();
                image.onload = function () { initAfterImageLoad() };
                image.src = randomImageUrl;

          var raptor = $('.elRaptor').css({"display" : "block"});
       }
           function initAfterImageLoad() {
                locked = true;
            // Movement Hilarity
            raptor.animate({
                "bottom" : "0px"
            }, function() {
                $(this).animate({
                    "bottom" : "0px"
                }, 100, function() {
                    var offset = (($(this).position().left)+500);
                    $(this).delay(300).animate({
                        "right" : offset
                    }, 2200, function() {
                    	raptor.remove();
                        locked = false;
                    })
                });
            });
        }
            }
            });
        }
    });//each call
  }//orbit plugin call
})(jQuery);;
$("body").raptorize();
$(window).scrollTop(9999999);