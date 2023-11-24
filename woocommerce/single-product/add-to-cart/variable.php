<?php
/**
 * Variable product add to cart
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/add-to-cart/variable.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.5.5
 */

defined( 'ABSPATH' ) || exit;

global $product;

$attribute_keys  = array_keys( $attributes );
$variations_json = wp_json_encode( $available_variations ); 
$variations_attr = function_exists( 'wc_esc_json' ) ? wc_esc_json( $variations_json ) : _wp_specialchars( $variations_json, ENT_QUOTES, 'UTF-8', true );
$variation_id = get_query_var( 'variation_id' ); 
do_action( 'woocommerce_before_add_to_cart_form' ); ?>

<form class="variations_form cart" action="<?php echo esc_url( apply_filters( 'woocommerce_add_to_cart_form_action', $product->get_permalink() ) ); ?>" method="post" enctype='multipart/form-data' data-product_id="<?php echo absint( $product->get_id() ); ?>" data-product_variations="<?php // echo $variations_attr; // WPCS: XSS ok. ?>">
	<?php do_action( 'woocommerce_before_variations_form' ); ?>

	<?php if ( empty( $available_variations ) && false !== $available_variations ) : ?>
		<p class="stock out-of-stock"><?php echo esc_html( apply_filters( 'woocommerce_out_of_stock_message', __( 'This product is currently out of stock and unavailable.', 'woocommerce' ) ) ); ?></p>
	<?php else : ?>
       
        
		<div class="variation-wrapper <?php echo $variation_id ? 'hidden':''; ?>">
        
        <h5>Kippah Material</h5>
        <p> Select from a wide array of fabrics and colors. Add a custom embroidered logo on the outside of your kippah to create a kippah that is truly "one-of-a-kind"! You dream it, we'll make it happen!</p>
        <p>Click a material to select it, then click continue button to proceed. </p>
        <ul class="variations" cellspacing="0">
			
                <?php 
                
                foreach ( $available_variations as $k => $attr ) : 
                $checked = "";
                 if($variation_id == $attr['variation_id']){
                    $checked = 'checked="checked"';
                 }
                ?>
					<li class="value">
                          <?php 
                             $price = $attr['display_price'];
                             $img_url = $attr['image']['url'];
                             $name = $attr['attributes']['attribute_kippah-material'];
                             $desc = $attr['variation_description'];
                             $min_qty = $attr['minimum_qty'];
                             $model = $attr['threedmodel'];
							?>
						<div class="prod-img-wrap" style="background-image: url(<?php echo $img_url;?>);">
                         <label class="variation-radio">
                         <input type="radio" class="option-input radio color-multioption" <?php echo $checked;?> data-vid="<?php echo $attr['variation_id'];?>" data-min_qty="<?php echo $min_qty;?>" data-price="<?php echo $price;?>" name="attribute_kippah-material" value="<?php echo $name;?>" data-name="<?php echo strtolower($name);?>" data-image="<?php echo $img_url;?>">
                            <span class="prod-desc"><?php echo strip_tags($desc);?></span>
                          </label>  
                        </div>
                        <div class="variation-name">
                        <?php
                        if($name==Suede){
                        	?>
                        	<span class="var-name">Suede / Embossed Suede</span>
                        <?php 
                        } 
                        else{ ?>
                        	<span class="var-name"><?php echo $name;?></span>
                        <?php
                        }
                        ?>	
                        <span class="var-price">$<?php echo $price;?>/each</span>
                        </div>
							
						
					</li>
				<?php endforeach; ?>
			 
		</ul>
        
        </div>
        <div class="clear"></div>
		<div class="single_variation_wrap">
         <div class="custom-kippah-steps mk--col mk--col--8-12">
			<?php
				/**
				 * Hook: woocommerce_before_single_variation.
				 */
				do_action( 'woocommerce_before_single_variation' );

				/**
				 * Hook: woocommerce_single_variation. Used to output the cart button and placeholder for variation data.
				 *
				 * @since 2.4.0
				 * @hooked woocommerce_single_variation - 10 Empty div for variation data.
				 * @hooked woocommerce_single_variation_add_to_cart_button - 20 Qty and cart button.
				 */
				do_action( 'woocommerce_single_variation' );

				/**
				 * Hook: woocommerce_after_single_variation.
				 */
				do_action( 'woocommerce_after_single_variation' );
			?>
            
		
        </div>
        
	<?php endif; ?>

	<?php do_action( 'woocommerce_after_variations_form' ); ?>
    
</form>

<?php
do_action( 'woocommerce_after_add_to_cart_form' );