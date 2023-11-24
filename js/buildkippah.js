
jQuery( document ).ready(function($) {


$("input[name='attribute_kippah-material']").click(function(){ 
   var value = $(this).val();
   var price = $(this).data('price');
   var min_qty = $(this).data('min_qty');
   //$('#order-summary').find('.material').html('<strong>Material: </strong> '+value);
   //$('#order-summary').find('.price').html('<strong>Price:</strong> '+price.toFixed(2)+ '/each');
  // $('#order-summary').find('.minimum-order').html('<strong>Minimum Order:</strong> '+min_qty);
  // $('#order-summary').find('.processing-time').html('<strong>Processing Time:</strong> 45 days');
  // $('.next-btn').show('slow');
  // $('.next-btn>a').click();
  // $('input[name=quantity]').attr('min',min_qty);
   var vid = $(this).data('vid');
   calculate_kippah_price();
   location.href = '?v='+vid;
   return false;
});

if($('.panel-crumb').hasClass('active')){
    $('#panel-layout').show();
    renderKippah();
}

$( document ).tooltip({
  items: ".prod-desc",
  position: {
    my: "center bottom-20",
    at: "center top",
    using: function( position, feedback ) {
      $( this ).css( position );
      $( "<div>" )
        .addClass( "arrow" )
        .addClass( feedback.vertical )
        .addClass( feedback.horizontal )
        .appendTo( this );
    }
  }
});

var selected_panel;
$('form').trigger("reset");

$(document).on('change','#evp_extra_variation input[type=radio]',function(){ 
   calculate_kippah_price();
});

$('.switch-wrap').next('.extra-variation-catundertab').hide();
// alert("test1");

$('.toggle-switch').click(function(){
    var $this = $(this);
    $this.toggle(function(){
        var on = $this.is(':checked');
        var yes_on = $this.parent().find('.yes_on'); 
        var yes_off = $this.parent().find('.yes_off');
        var catid = $this.attr('value');
        yes_on.removeClass('active');
        yes_off.removeClass('active');
        if(on){


            yes_on.addClass('active');
            
            $('#'+catid).find('.extra-variation-catundertab').fadeIn('slow');
            // alert("test2");
        }else{
            yes_off.addClass('active');
            $('#'+catid).find('.extra-variation-catundertab').fadeOut('slow');
            // alert("test3");
            $this.closest('div').find("input[type=text],input[type=radio], textarea, select").val("");
            $('#sample-text').text("");
            $('.'+catid).text('');
        }
    });
});

function calculate_kippah_price()
{
    var price = $("input[name='attribute_kippah-material']:checked").data('price');
    $("#evp_extra_variation input[type=radio]").each(function(i,e){
        if($(this).is(':checked')){
            var dataid = $(this).data('id');
            price = (parseFloat(price) + parseFloat(dataid)).toFixed(2);
            
        }
        
    });
    
    $('#order-summary').find('.price').html('<strong>Price:</strong> '+price+ '/each');
}

$('.next-btn>a').on('click',function(e){
    e.preventDefault();
    var cur_step = $(this).data('step');
    var min_qty = $("input[name='attribute_kippah-material']:checked").data('min_qty');
    switch (cur_step){
    case 1: 
            $('.variation-wrapper').fadeOut('slow',function(){
                $('.custom-kippah-steps').removeClass('mk--col--12-12');
                $('#panel-layout').fadeIn('slow');
                $('.kippah-image-model').fadeIn('slow');
            });
            
            $('.panel-crumb').addClass('active');
            $(this).data('step',2);
    break;
    case 2: 
            selected_panel= $('#panel-layout input[type=radio]:checked'); 
            if(selected_panel.length < 1){
                return false;
            }
            
            $('#panel-layout').hide('slow');
            $('#color-1').show('slow');
            var color1 = $('#color-1 input[type=radio]:checked').length;
            var color2 = $('#color-2 input[type=radio]:checked').length;
            if(color1 >0 && selected_panel.val()!='Single Color') {
                $('#color-2').show('slow');
                if(color2<1){
                    $(this).addClass('inactive');
                }
            }
            if(color1<1){
                $(this).addClass('inactive');
            }
            
            $('.color-crumb').addClass('active');
            $(this).data('step',3);
            
    break;
    case 3:  
            var color1 = $('#color-1 input[type=radio]:checked').length; 
            var color2 = $('#color-2 input[type=radio]:checked').length;
            if(selected_panel.val()!='Single Color' && (color1 < 1 || color2 < 1)) {
                return false;
            }
            if(selected_panel.val()=='Single Color' && color1 < 1 ){ 
                return false;
            }
    
            $('#color-1').hide();
            $('#color-2').hide();
            $('#trim-color').show('slow');
            var trim_color = $('#trim-color input[type=radio]:checked').length; 
            if(trim_color<1){
                $(this).addClass('inactive');
            }
            $('.trimcolor-crumb').addClass('active');
            $(this).data('step',4);
    
    break;
    case 4:
            
            $('#trim-color').hide();
            $('#size').show('slow');
            var size = $('#size input[type=number]').length; 
            if(size<1){
                $(this).addClass('inactive');
            }
            $('.size-crumb').addClass('active');
            $(this).data('step',5);
    break;
    case 5:
            var sizes = $('#size').find('input[type=number]');
            var total_qty = 0;
            $.each(sizes,function(){
               total_qty += $(this).val();
            })
            if(total_qty < min_qty){
               $.alert({title:'',content:'Min. quantity is'+ min_qty});
                return false;
            }
            $('#size').hide();
            $('#personalized-text').show('slow');
            $('#embroidered-logo').show('slow');
            $('.personalize-crumb').addClass('active');
            $(this).data('step',6);
    break;
    case 6:
            $('input[name=quantity]').val(min_qty);
            var formdata = $('.variations_form');
            formdata.submit();
            //$('.single_add_to_cart_button').trigger('click');
    break;
    }
    
   
});

$('.color-crumb>a').on('click',function(e){
    e.preventDefault();
    var active_panel = $('.panel-crumb').hasClass('active');
    if(active_panel){
        $('.personalize-crumb').removeClass('active');
        $('.trimcolor-crumb').removeClass('active');
        $('.size-crumb').removeClass('active');
        $('#size').hide('slow');
        $('#trim-color').hide('slow');
        $('#personalized-text').hide('slow');
        $('#embroidered-logo').hide('slow');
           
        $('.next-btn>a').data('step',2);     
        $('.next-btn>a').trigger('click');
        
    }
})

$('.trimcolor-crumb>a').on('click',function(e){
    e.preventDefault();
    var active_panel = $('.color-crumb').hasClass('active');
    if(active_panel){
        $('.personalize-crumb').removeClass('active');
        $('.size-crumb').removeClass('active');
        $('#size').hide();
        $('#trim-color').hide();
        $('#personalized-text').hide();
        $('#embroidered-logo').hide();
        $('.next-btn>a').data('step',3);  
        $('.next-btn>a').trigger('click');
        
    }
})

$('.size-crumb>a').on('click',function(e){
    e.preventDefault();
    var active_panel = $('.trimcolor-crumb').hasClass('active');
    if(active_panel){
        $('.personalize-crumb').removeClass('active');
        $('#personalized-text').hide('slow');
        $('#embroidered-logo').hide('slow');
        $('#size').show('slow');
        $('.next-btn>a').data('step',4);  
        $('.next-btn>a').trigger('click');
        
    }
})

$('.panel-crumb>a').on('click',function(e){
    e.preventDefault();
    var selected_material = $("input[name='attribute_kippah-material']").is(':checked');
    if(selected_material){
        $('.personalize-crumb').removeClass('active');
        $('.trimcolor-crumb').removeClass('active');
        $('.size-crumb').removeClass('active');
        $('.color-crumb').removeClass('active');
        $('#personalized-text').hide('slow');
        $('#embroidered-logo').hide('slow');
        $('#color-1').hide('slow');
        $('#color-2').hide('slow');
        $('#trim-color').hide('slow');
        $('#size').hide('slow');
        $('.next-btn>a').data('step',1);
        $('.next-btn>a').trigger('click');
        
    }
})

$('.material-crumb>a').on('click',function(e){
    e.preventDefault();
    $('.panel-crumb').removeClass('active');
    $('.personalize-crumb').removeClass('active');
    $('.trimcolor-crumb').removeClass('active');
    $('.size-crumb').removeClass('active');
    $('.color-crumb').removeClass('active');
    $('#personalized-text').hide('slow');
    $('#embroidered-logo').hide('slow');
    $('#color-1').hide('slow');
    $('#color-2').hide('slow');
    $('#size').hide('slow');
    $('#trim-color').hide('slow');
    
    $('#panel-layout').hide('slow');
    $('.variation-wrapper').fadeIn('slow');
    $('.kippah-image-model').fadeOut('slow');
    $('.custom-kippah-steps').addClass('mk--col--12-12');
    
    $('.next-btn>a').data('step',1);
    
})

$('.personalize-crumb>a').on('click',function(e){
    e.preventDefault();
    var active_panel = $('.size-crumb').hasClass('active');
    if(active_panel){      
        $('#size').hide();
        
        $('.next-btn>a').trigger('click');
        $('.next-btn a').removeClass('inactive');
    }
})

$('.typeface').on('select2:select', function (e) {
	// alert();
    var data = e.params.data;
    var elem_class = $(data.element).data('class');
    $("#sample-text span").attr('class',elem_class);
    $('.text-content').removeClass('keyboardInput');
    $('.keyboardInputInitiator').remove();
    if(elem_class == $(data.element).data('class')){
        $('.text-content').addClass('keyboardInput');
        buildKeyboardInputs();
    }
});



function formatState(data){
    
    var elem_class = $(data.element).data('class'); 
    var html = "<div class='"+elem_class+"'>"+data.text+"</div>";
    data.text = html;
    return data.text;
}
$('.extra-variation-buyerinputselect').select2({
    templateResult: formatState,
    escapeMarkup:function(data){
        
        return data;
    },
    minimumResultsForSearch: -1
});


$('#personalized-text').find('.text-color').on('select2:select',function(e){
    var data = e.params.data;
    var color = $(data.element).data('class');
    $("#sample-text").attr('class',color);
});





});