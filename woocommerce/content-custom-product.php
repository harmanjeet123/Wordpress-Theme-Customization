<?php
/**
* The template for displaying product content in the single-product.php template
*
* This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
*
* HOWEVER, on occasion WooCommerce will need to update template files and you
* (the theme developer) will need to copy the new files to your theme to
* maintain compatibility. We try to do this as little as possible, but it does
* happen. When this occurs the version of the template file will be bumped and
* the readme will list any important changes.
*
* @see     https://docs.woocommerce.com/document/template-structure/
* @package WooCommerce/Templates
* @version 3.6.0
*/

defined( 'ABSPATH' ) || exit;

global $product,$product_attributes;

/**
* Hook: woocommerce_before_single_product.
*
* @hooked wc_print_notices - 10
*/
do_action( 'woocommerce_before_single_product' );

if ( post_password_required() ) {
	echo get_the_password_form(); // WPCS: XSS ok.
	return;
}
$variation = [];
$variation_id ='';

?>
<!-- <style type="text/css">
.trim-color{
display: none;
}
.suede-trim{
display: none;
}
</style> -->
<article id="product-<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>

	<?php the_title( '<h1 class="product_title entry-title">', '</h1>' );?>

	<?php
	/**
	* Hook: woocommerce_single_product_summary.
	*
	* @hooked woocommerce_template_single_title - 5
	* @hooked woocommerce_template_single_rating - 10
	* @hooked woocommerce_template_single_price - 10
	* @hooked woocommerce_template_single_excerpt - 20
	* @hooked woocommerce_template_single_add_to_cart - 30
	* @hooked woocommerce_template_single_meta - 40
	* @hooked woocommerce_template_single_sharing - 50
	* @hooked WC_Structured_Data::generate_product_data() - 60
	*/


	$selected_material = get_query_var( 'material' );
	$selected_material = str_replace(' ','',strtolower(trim($selected_material)));
	$selected_material = sanitize_text_field($selected_material);
	$variations = $product->get_available_variations();

	foreach ( $variations as $v ) {

		$mtrl = $v['attributes']['attribute_kippah-material'];
		$mtrl = str_replace(' ','',strtolower(trim($mtrl)));
		$mtrl = sanitize_text_field($mtrl);
		if($selected_material == $mtrl){
			$variation = $v;
			$variation_id = $v['variation_id'];
			set_query_var('variation_id', $variation_id);
		}
	}

	//$variation = new WC_Product_Variation($variation_id);
	//$variation = $product->get_available_variation($variation_id);

	$material = $variation['attributes']['attribute_kippah-material'];
	$price = $variation['price_html'];
	$min_qty = $variation['minimum_qty'];
	$processing = "45 Days(with rush option: 35 days)";
	$customoption = isset($variation['active_extravariation']) && in_array('Lining',$variation['active_extravariation'])?"lining":"lineing";
	//$customsize = isset($variation['active_extravariation']) && in_array('size',$variation['active_extravariation'])?"size":"sizeing";
	?>
	<script type="text/javascript">
	var customoption = '<?= $customoption; ?>';
	//var customsize = '<?= $customsize; ?>';

	</script>

	<ul class="steps">
		<li class="material-crumb active"><a href="/shop/build-kippah">Material</a></li>
		<li class="panel-crumb <?php echo $variation_id ? "active":"";?>"><a href="#panel-layout">Panel Layout</a></li>
		<li class="color-crumb"><a href="#color">Color</a></li>
		<li class="trimcolor-crumb"><a href="#trim-color">Trim</a></li>
		<li class="size-crumb"><a href="#size">Size</a></li>
		<!-- <?php if(isset($variation['active_extravariation']) && in_array('size',$variation['active_extravariation'])):?>
		<li class="size-crumb"><a href="#size">Size</a></li>
	<?php endif;?>
	<?php if(isset($variation['active_extravariation']) && in_array('sizeing',$variation['active_extravariation'])):?>
	<li class="size-crumb"><a href="#sizeing">Sizeing</a></li>
<?php endif;?> -->
<!-- <?php print_r($variation['active_extravariation']); ?> -->
<?php if(isset($variation['active_extravariation']) && in_array('Lining',$variation['active_extravariation'])):?>
	<li class="lining-crumb"><a href="#inner-lining">Lining</a></li>
<?php endif;?>

<!-- <?php print_r($variation['active_extravariation']); ?> -->
<?php if(isset($variation['active_extravariation']) && in_array('Lineing',$variation['active_extravariation'])):?>
	<li class="Lineing-crumb"><a href="#inner-Lineing">lining</a></li>
<?php endif;?>

<li class="personalize-crumb"><a href="#personalize">Personalize</a></li>
<li class="rush"><a href="#rush">Processing</a></li>
</ul>

<?php  woocommerce_variable_add_to_cart();?>
<div class="kippah-image-model <?php echo $variation_id!='' ? $variation_id:'hidden';?>">

	<!--h3>Cool Kippah Preview</h3-->
	<h3>Summary</h3>
	<div id="main-div">
	<div id="order-summary">
		<h4>Selections:</h4>
		<ul>
			<li class="material"><?php echo $material?"<strong>Material: </strong> ".$material:""; ?></li>
			<li class="panel-layout"></li>
			<li class="color-1"></li>
			<li class="color-2"></li>
			<li class="emboss"><span class="logo-title1"></span>
				<ul>
					<li class="logo"></li>
				</ul>
			</li>
			<li class="pattern-color"></li>
			<li class="trim-color"></li>
			<li class="suede-trim"></li>
			<li class="top-trim"></li>

			<!-- <li class="trim-color"><span class="trim-color-title"></span>
			<ul><li class="top-trim"></li></ul>
		</li>
		<li class="suede-trim-color"><span class="suede-trim-color-title"></span>
		<ul><li class="suede-trim"></li></ul>
	</li> -->
	<!-- <li id="suede-data"></li> -->
	<li class="size"><span class="size-title">Size:</span>
		<ul>
			<li class="Small"></li>
			<li class="Standard"></li>
			<li class="Large"></li>
			<li class="X-Large"></li>
		</ul>
	</li>
	<!-- <li class="sizeing"><span class="size-title">Size:</span>
	<ul>
	<li class="Small"></li>
	<li class="Standard"></li>
	<li class="Large"></li>
	<li class="X-Large"></li>
</ul>
</li> -->
<li class="lining"></li>
<li class="lineing"></li>

<li class="embroidered-logo"><span class="logo-title"></span>
	<span class="logo-title2"></span>
            <ul>
                <li class="logo"></li>
            </ul>
        </li>

<li class="embroidered-logo1">
	<span class="logo-title2"></span>
</li>
<li class="personalized-text"></li>
<li class= "clip"></li>
<div class="clear"></div>



</ul>
</div>
<div class="footer_summary">
	<ul>
		<li class="price"><?php echo $price ? "<strong>Price:</strong> ".$price:"";?></li>
		<li class="rush-price"></li>
		<li class="minimum-order"><?php echo $min_qty ? "Minimum Order: $min_qty":"";?></li>
<?php
if($material == 'Suede'){ ?>
		<li class="processing-time-suede">Processing Time: 21 Days (with rush option: 10 days)</li>

<?php	} 
else{ ?>
	<li class="processing-time"><?php echo $processing ? "Processing Time: $processing":"";?></li>
<?php } ?>
	</ul>
</div>
<div class="next-btn centurygothic"><a href="#" class="" data-step="2">CONTINUE</a></div>
<div class="panel-selected"></div>
</div>
<figure class="woocommerce-product-gallery__wrapper">
	<?php
	$post_thumbnail_id = $product->get_image_id();
	$html  = '<div id="extra_main_image" class="woocommerce-product-gallery__image--placeholder">';
	$html .= '<div style="display:none;" id="bounce-loader" class="bounce"><div class="bounce2 bg-red"></div></div>';
	$html .= '<canvas id="myCanvas"></canvas></div>';

	echo $html;
	do_action( 'woocommerce_product_thumbnails' );
	?>
</figure>

</div>
</div>
</article>

<?php do_action( 'woocommerce_after_single_product' ); ?>
