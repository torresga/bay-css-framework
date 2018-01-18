//flexslider
$(window).load(function() {
  // The slider being synced must be initialized first
  $('#carousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 210,
    itemMargin: 5,
    asNavFor: '#slider'
  });

  $('#slider').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: "#carousel"
  });
});

//flexslider
 $(window).load(function() {
  $('.flexslider').flexslider({
    animation: "slide"
  });
});

   $(window).load(function () {
         $(document).ready(function(){
            collage();
            $('.Collage').collageCaption();
        });
    });

$(document).ready(function(){
  var last_care_search = '';
  //Global Search
  if ($("#g_search").length) {
      var search = getURLParameterByName('search');
      if (search != '') {
        putToTheSearchField(search.replace('"', ''));
      }
  }

//navigation
$(document).ready(function(){
var str=location.href.toLowerCase();
  $(".nav-wrap li a").each(function() {
    if (str.indexOf(this.href.toLowerCase()) > -1) {
  $("li.highlight").removeClass("highlight");
    $(this).parent().addClass("highlight");
  }
});
$("li.highlight").parents().each(function(){
  if ($(this).is("li")){
  $(this).addClass("highlight");
  }
  });
});

//fancybox
$(document).ready(function() {
  $(".various").fancybox({
    maxWidth  : 800,
    maxHeight : 800,
    fitToView : false,
    width   : '90%',
    height    : '80%',
    autoSize  : false,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect : 'none'
  });
});

//leanModal
$( function()
{
    var targets = $( '[rel~=tooltip]' ),
        target  = false,
        tooltip = false,
        title   = false;

    targets.bind( 'mouseenter', function()
    {
        target  = $( this );
        tip     = target.attr( 'title' );
        tooltip = $( '<div id="tooltip"></div>' );

        if( !tip || tip == '' )
            return false;

        target.removeAttr( 'title' );
        tooltip.css( 'opacity', 0 )
               .html( tip )
               .appendTo( 'body' );

        var init_tooltip = function()
        {
            if( $( window ).width() < tooltip.outerWidth() * 1.5 )
                tooltip.css( 'max-width', $( window ).width() / 2 );
            else
                tooltip.css( 'max-width', 340 );

            var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                pos_top  = target.offset().top - tooltip.outerHeight() - 20;

            if( pos_left < 0 )
            {
                pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                tooltip.addClass( 'left' );
            }
            else
                tooltip.removeClass( 'left' );

            if( pos_left + tooltip.outerWidth() > $( window ).width() )
            {
                pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                tooltip.addClass( 'right' );
            }
            else
                tooltip.removeClass( 'right' );

            if( pos_top < 0 )
            {
                var pos_top  = target.offset().top + target.outerHeight();
                tooltip.addClass( 'top' );
            }
            else
                tooltip.removeClass( 'top' );

            tooltip.css( { left: pos_left, top: pos_top } )
                   .animate( { top: '+=10', opacity: 1 }, 50 );
        };

        init_tooltip();
        $( window ).resize( init_tooltip );

        var remove_tooltip = function()
        {
            tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
            {
                $( this ).remove();
            });

            target.attr( 'title', tip );
        };

        target.bind( 'mouseleave', remove_tooltip );
        tooltip.bind( 'click', remove_tooltip );
    });
});
$(function() {
    $('a[rel*=leanModal]').leanModal({ top : 100, closeButton: ".modal_close" });
});

//accordion

$(document).ready(function() {
    var demo = $("#accordion").zozoAccordion({
        theme: "crystal",
        orientation: "vertical",
        sectionSpacing: 4,
        headerSize: 54,
        shadows: true,
        headerFontSize: 0.075,
        responsive:true,
        scrollable: true,
        bordered: true,
        rounded: true,
        animation: {
            duration:400,
            easing: "easeInOutCubic"
            }
    });

    var demo = $(".accordion2").zozoAccordion({
        theme: "crystal",
        orientation: "vertical",
        sectionSpacing: 4,
        headerSize: 54,
        shadows: true,
        headerFontSize: 0.075,
        responsive:true,
        scrollable: true,
        bordered: true,
        rounded: true,
        animation: {
            duration:400,
            easing: "easeInOutCubic"
            }
    });
});


