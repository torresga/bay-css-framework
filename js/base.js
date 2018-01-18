// Custom select;
(function($) {
    $.fn.selectBox = function(){

        var selectbox = this,
            re = new RegExp(/^\d{2,5}/),
            dropSpeed = (arguments[0] && re.test(arguments[0].dropSpeed)) ? arguments[0].dropSpeed : 200;

        var methods = {

            replaceLayout : function(obj){
                var options = obj.children('option'), values = '', currentValue = obj.val();
                options.each(function(){
                    values += '<li>'+$(this)[0].text+'</li>';
                });

                var layout =
                    '<div class="selectbox">'+
                        '<div class="selectbox-current">'+obj.children("option").eq(0).val()+'</div>'+
                        '<ul class="selectbox-values" style="display:none">'+values+'</ul>'+
                    '</div>';
                obj.attr("selectedIndex", 0);
                obj.before(layout);
                $('.selectbox-values li').each(function(){
                    ($(this).text() == currentValue) && $(this).addClass('active');
                });

                return true;
            },
            hideSelect : function(obj){
                obj.hide();
                return true;
            },
            toggleValues : function(obj){
                if($('.selectbox-values').css('display') == 'none' && ($(obj).hasClass('selectbox') || $(obj).hasClass('selectbox-current'))){
                    $('.selectbox-values').slideDown(dropSpeed);
                    //Get the position of active item;
                    var targetPositon = Math.round($('.selectbox-values li.active').position().top);
                    $('.selectbox-values').animate({
                        scrollTop : targetPositon
                    })
                } else{
                    $('.selectbox-values').slideUp(dropSpeed)
                }
                return true;
            },
            changeState : function(obj, cur){
                var value = cur.text();
                obj.val(cur.val());
                obj.attr("selectedIndex", cur.parent().children("li").index(cur));
                $('.selectbox-current').text(value);
                cur.addClass('active').siblings('li').removeClass('active');
                return true;
            }
        };
        $(document).ready(function(){
            methods.replaceLayout(selectbox);
            methods.hideSelect(selectbox);
        });
        $('body').live('click', function(event){
            methods.toggleValues(event.target)
        });
        $('.selectbox-values li').live('click', function(){
            methods.changeState(selectbox, $(this));
        });
    }
})(jQuery);
