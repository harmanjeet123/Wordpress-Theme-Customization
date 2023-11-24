
jQuery( document ).ready(function($) {
    
var winScrollTop = 0;

$.fn.is_on_screen = function() {
  var win = $(window);
  var viewport = {
    top: win.scrollTop(),
    left: win.scrollLeft()
  };
  //viewport.right = viewport.left + win.width();
  viewport.bottom = viewport.top + win.height();

  var bounds = this.offset();
  //bounds.right = bounds.left + this.outerWidth();
  bounds.bottom = bounds.top + this.outerHeight();

  return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

function parallax() {
  var scrolled = $(window).scrollTop();
  $('.blue-bg-raw').each(function() {

    if ($(this).is_on_screen()) {
      var firstTop = $(this).offset().top;
      var $span = $(this).find('.blue-full-bg');
      var moveTop = (firstTop - winScrollTop) * 0.2 //speed;
      $span.css("transform", "translateY(" + moveTop + "px)");
    }

  });
}

$(window).scroll(function(e) {
  winScrollTop = $(this).scrollTop();
  parallax();
});

$('.prod-img-wrap label').on('mouseover',function(){
    $(this).animate({opacity:1});
});


$(document).on('click','.custom_qty>input.minus',function(){ 
    var qty = $(this).parent().find('.customQty');
    var c = parseInt(qty.val());
    c--;
    
    var cart_qty = $(this).closest('td').find('.quantity_input');
    var total_cart_qty = parseInt(cart_qty.val()) ;
    total_cart_qty--;
    
    
    var min_qty = parseInt(cart_qty.attr('min'));
    if(min_qty > total_cart_qty){
        qty.val(c + 1);
        cart_qty.val(total_cart_qty + 1);
        $.alert({
            content:'Lower than the minimum quantity!',
            title: 'Error',
            boxWidth: '300px',
            useBootstrap: false
        });
        return false;
    }
    qty.val(c);
    cart_qty.val(total_cart_qty).trigger('change');
})

$(document).on('click','.custom_qty>input.plus',function(){ 
    var qty = $(this).parent().find('.customQty');
    var c = parseInt(qty.val()) ;
    c++;
    qty.val(c);
    
    var cart_qty = $(this).closest('td').find('.quantity_input');
    var total_cart_qty = parseInt(cart_qty.val());
    cart_qty.val(total_cart_qty + 1).trigger('change');
});

$( document ).on( 'updated_cart_totals', function(e) {
    e.preventDefault();
    
     location.reload();
     return false;
});


});

jQuery( "#page-section-89" ).parent().css( "background-color", "#3d4045",);
jQuery( "#page-section-84" ).parent().css( "background-color", "#b7dde8",);

if(jQuery('.rellax').length >0 ){
    var rellax = new Rellax(".rellax");
}



(function($){
  $('<a id="column-link1" href="/product/kippah-it-on-2pack/">').insertBefore('.product-col1');
  $('.product-col1').prependTo( $('#column-link1') );
	$('<a id="column-link2" href="/product/cool-keeper/">').insertBefore('.product-col2');
  $('.product-col2').prependTo( $('#column-link2') );
	$('<a id="column-link3" href="/product/cool-fringes-tzitzit/">').insertBefore('.product-col3');
  $('.product-col3').prependTo( $('#column-link3') );
	$('<a id="column-link4" href="/product/tote-bags/">').insertBefore('.product-col4');
  $('.product-col4').prependTo( $('#column-link4') )
	$('<a id="column-link5" href="/product/elite-socks/">').insertBefore('.product-col5');
  $('.product-col5').prependTo( $('#column-link5') );
	$('<a id="column-link6" href="/product/scarves/">').insertBefore('.product-col6');
  $('.product-col6').prependTo( $('#column-link6') );
	$('<a id="column-link7" href="/product/snow-hats/">').insertBefore('.product-col7');
  $('.product-col7').prependTo( $('#column-link7') );
	$('<a id="column-link8" href="/product/sling-bags/">').insertBefore('.product-col8');
  $('.product-col8').prependTo( $('#column-link8') );
	$('<a id="column-link9" href="/product/challah-covers/">').insertBefore('.product-col9');
  $('.product-col9').prependTo( $('#column-link9') );
	$('<a id="column-link10" href="/product/pouches/">').insertBefore('.product-col10');
  $('.product-col10').prependTo( $('#column-link10') );
	$('<a id="column-link11" href="/gallery/">').insertBefore('.product-col11');
  $('.product-col11').prependTo( $('#column-link11') );
})(jQuery);

jQuery( window ).on("load", function() {  
  
  
if (window.matchMedia('(max-width: 767px)').matches) {
var array1 = [
            {
              "section" : "Stepone", 
               "speed" : "12"
            },{
              "section" : "Steptwo", 
               "speed" : "12"
            },{
              "section" : "Stepthree", 
               "speed" : "12"
            },{
              "section" : "Customizemobile", 
               "speed" : "11"
            },{
              "section" : "Promotemobile", 
               "speed" : "11"
            },{
              "section" : "Showcasemobile", 
               "speed" : "11"
            }
  ];
}
  
});

jQuery(document).ready(function () {
	jQuery('a.popup-window, .n2-ss-button-container a').click(function() {
		//alert('sdsds')
	$('a.n2-style-decb52509e1efefb3cafa4c698e6a72a-heading.n2-ow').addClass('popup-window')

	// Getting the variable's value from a link 
	var loginBox = jQuery(this).attr('href');

	//Fade in the Popup and add close button
	jQuery('#mk-header-1').css("z-index", "-1");
	jQuery(loginBox).fadeIn();
	jQuery('#pop-up').css({
		"display": "block",
		"position": "absolute"
	});
	//Set the center alignment padding + border
	var popMargTop = (jQuery(loginBox).height() + 24) / 2;
	var popMargLeft = (jQuery(loginBox).width() + 24) / 2;

	jQuery(loginBox).css({
		'margin-top': -popMargTop,
		'margin-left': -popMargLeft
	});

	// Add the mask to body
	jQuery('#pop-up').before('<div id="mask"></div>');
	jQuery('#mask').fadeIn(300);

	// return false;
	// });

	// When clicking on the button close or the mask layer the popup closed
	jQuery('a.close, #mask').click(function () {
		jQuery('#mk-header-1').css("z-index", "301");
		jQuery('#pop-up').css("display", "none");
		jQuery('#mask , .order-popup').fadeOut(300, function () {
			jQuery('#mask').remove();
		});
		return false; 
	});
 });
}) 
