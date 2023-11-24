<?php

function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
}
add_action('init','add_cors_http_header');

function custom_scripts() {

    // wp_enqueue_script( 'reel', get_stylesheet_directory_uri() . '/js/jquery.reel.js', array('jquery'), '1.0.0', true );
    global $post;
    $page_slug = $post->post_name;

    if ($page_slug == 'build-kippah') {
        //wp_enqueue_script( 'color-picker', get_stylesheet_directory_uri().'/js/iris.js', array('jquery','jquery-ui-widget','jquery-ui-slider','jquery-ui-draggable'),'',true );
        wp_enqueue_script( 'select2', get_stylesheet_directory_uri() . '/js/select2.min.js', array('jquery'), '1.0.0', true );
        wp_enqueue_style( 'select2-style', get_stylesheet_directory_uri() . '/css/select2.min.css' );
        wp_enqueue_script( 'keyboardInput', get_stylesheet_directory_uri() . '/js/keyboardInput.js', array('jquery'), '1.0.0', true );
        wp_enqueue_style( 'keyboardInput-style', get_stylesheet_directory_uri() . '/css/keyboard.css' );
        wp_enqueue_style( 'loaders', get_stylesheet_directory_uri() . '/css/loaders.css' );

        wp_register_script( 'threejs', get_stylesheet_directory_uri() . '/js/three.min.js', array('jquery'), '1.0.0', true );
        wp_register_script( 'OrbitControls', get_stylesheet_directory_uri() . '/js/OrbitControls.js', array('threejs'), '1.0.0', true );
        wp_register_script( 'BendModifier', get_stylesheet_directory_uri() . '/js/BendModifier.js', array('threejs'), '1.0.0', true );

        wp_register_script( 'GLTFLoader', get_stylesheet_directory_uri() . '/js/GLTFLoader.js', array('threejs'), '1.0.0', true );
        wp_register_script( 'kippah_builder', get_stylesheet_directory_uri() . '/js/kippah_builder.js', array('threejs','OrbitControls'), '1.0.0', true );

        wp_enqueue_script( 'jquery.filer', get_stylesheet_directory_uri() . '/js/jquery.filer.js', array('jquery'), '1.0.0', true );
        wp_enqueue_script('threejs');
        wp_enqueue_script('OrbitControls');
        wp_enqueue_script('BendModifier');
        wp_enqueue_script('GLTFLoader');

        wp_localize_script('kippah_builder', 'theme', array( 'url' => get_stylesheet_directory_uri() ));
        wp_enqueue_script('kippah_builder');
        wp_enqueue_style( 'jquery.filer-style', get_stylesheet_directory_uri() . '/css/jquery.filer.css' );

        wp_enqueue_script( 'jquery-ui-tooltip');
        wp_enqueue_style( 'dashicons' );


    }else{
          wp_enqueue_style( 'woocommerce', get_stylesheet_directory_uri() . '/assets/stylesheet/plugins/woocommerce.css' );
          wp_enqueue_script( 'rellax', get_stylesheet_directory_uri() . '/js/rellax.min.js', array('jquery'), '1.0.0', true );
          wp_enqueue_script( 'general', get_stylesheet_directory_uri() . '/js/general.js', array('jquery'), '1.0.0', true );
          wp_enqueue_script( 'nicescroll', get_stylesheet_directory_uri() . '/js/jquery.nicescroll.js', array('jquery'), '1.0.0', true );
   }

    wp_enqueue_script( 'jquery-confirm', get_stylesheet_directory_uri() . '/js/jquery-confirm.min.js', array('jquery'), '1.0.0', true );
    wp_enqueue_style( 'jquery-confirm', get_stylesheet_directory_uri() . '/css/jquery-confirm.min.css' );

     if ( is_404()) {
        wp_enqueue_script( 'redirect', get_stylesheet_directory_uri() . '/js/redirect.js', array('jquery'), '1.0.0', true );
     }

     wp_enqueue_style( 'mobilecart', get_stylesheet_directory_uri() . '/css/mobile.cart.css' );
     wp_dequeue_script('wc-cart-fragments');

}
add_action( 'wp_enqueue_scripts', 'custom_scripts' );
add_filter( 'woocommerce_output_related_products_args', 'bbloomer_change_number_related_products', 9999 );

function bbloomer_change_number_related_products( $args ) {
 $args['posts_per_page'] = 5; // # of related products
 $args['columns'] = 5; // # of columns per row
 return $args;
}

add_filter('extravariation-category-title','toggle_switch');
function toggle_switch($catname){

    if( $catname=="personalized-text"){
      echo "<label class='switch-wrap'><span class='yes_on'>Yes</span><span class='yes_off active'>No</span><input type='checkbox' value='$catname' class='toggle-switch'/></label>";
      }
      if($catname=="embroidered-logo"){
      echo "<label class='switch-wrap embroidered' id='embroidered'><span class='yes_on' value='0.50'>Yes</span><span class='yes_off active'>No</span><input type='checkbox'  id='0.50' data-id='0.50' value='$catname' class='toggle-switch3'/></label>";
      }
if($catname=="emboss"){
     echo "<label class='switch-wrap1'><span class='yes_on'>Yes</span><span class='yes_off active'>No</span><input type='checkbox' value='$catname' class='toggle-switch1'/></label>";
      }



}



add_action( 'after_setup_theme', 'jupiter_child_setup' );

function jupiter_child_setup() {
    //add_theme_support( 'wc-product-gallery-zoom' );
    add_theme_support( 'wc-product-gallery-lightbox' );
    add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'wp_enqueue_scripts', 'frontend_scripts_include_lightbox' );


function frontend_scripts_include_lightbox() {
  global $woocommerce;
  $suffix      = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
  $lightbox_en = get_option( 'woocommerce_enable_lightbox' ) == 'yes' ? true : false;

  if ( $lightbox_en ) {
    wp_enqueue_script( 'prettyPhoto', $woocommerce->plugin_url() . '/assets/js/prettyPhoto/jquery.prettyPhoto' . $suffix . '.js', array( 'jquery' ), $woocommerce->version, true );
    wp_enqueue_script( 'prettyPhoto-init', $woocommerce->plugin_url() . '/assets/js/prettyPhoto/jquery.prettyPhoto.init' . $suffix . '.js', array( 'jquery' ), $woocommerce->version, true );
    wp_enqueue_style( 'woocommerce_prettyPhoto_css', $woocommerce->plugin_url() . '/assets/css/prettyPhoto.css' );
  }
}
function remove_image_zoom_support() {
    remove_theme_support( 'wc-product-gallery-zoom' );
}
//add_action( 'wp', 'remove_image_zoom_support', 100 );

add_filter( 'wp_get_attachment_image_attributes', 'remove_image_text');
function remove_image_text( $attr ) {
    unset($attr['title']);
    return $attr;
}

add_action( 'woocommerce_variation_options_dimensions', 'kippah_add_threedmodel_to_variations', 10, 3 );

function kippah_add_threedmodel_to_variations( $loop, $variation_data, $variation ) {
global $wpdb;

woocommerce_wp_text_input( array(
    'id' => 'threedmodel' . $loop,
    'class' => 'short',
    'label' => __( '3D Model', 'woocommerce' ),
    'value' => get_post_meta( $variation->ID, 'threedmodel', true ),
    'wrapper_class' => 'form-row form-row-full',
    )
);

woocommerce_wp_text_input( array(
    'id' => 'minimum_qty' . $loop,
    'class' => 'short wc_input_decimal input-text minimum-qty',
    'label' => __( 'Minimum Qty', 'woocommerce' ),
    'value' => get_post_meta( $variation->ID, 'minimum_qty', true ),
    'wrapper_class' => 'form-row form-row-full',
    )
 );
woocommerce_wp_text_input( array(
    'id' => 'logo_price' . $loop,
    'class' => 'short wc_input_decimal input-text logo-price',
    'label' => __( 'Logo Addon Price($)', 'woocommerce' ),
    'value' => get_post_meta( $variation->ID, 'logo_price', true ),
    'wrapper_class' => 'form-row form-row-full',
    )
);

$extravariation_fields = $wpdb->get_results( "SELECT * FROM {$wpdb->prefix}extravariationdb", OBJECT );
$cat = "";
echo "<label>Available Parts</label><p class'form-row form-row-full options'>";
$extravariation_values = get_post_meta( $variation->ID, 'active_extravariation',true );
foreach($extravariation_fields as $evf){
    $checked = "";
    if($cat != $evf->cat){
        if(in_array($evf->cat,$extravariation_values)){
            $checked = "checked='checked'";
        }
     $cat = $evf->cat;
     $hidden = "";
     if($cat=='Panel Layout'){
        $hidden = 'hidden';
        $checked = "checked='checked'";
     }
     echo "<label style='margin-right:12px;' class='$hidden evp-label'><input type='checkbox' name='active_extravariation".$loop."[]' value='$evf->cat' $checked/> $cat</label> ";

    }
}
echo "</p>";

echo "<label>Panel Layout</label><p class'form-row form-row-full options'>";

$active_panels = get_post_meta($variation->ID,'active_panel',true);
$panels = array('Single Color','Alternating Colors','3-n-1');
foreach($panels as $panel){
$panel_id = strtolower(str_replace(" ","-",$panel));
$checked = "";
    if(in_array($panel_id,$active_panels)){
        $checked = "checked='checked'";
    }
echo "<label style='margin-right:12px;' class='evp-label'><input type='checkbox' name='active_panel".$loop."[]' value='$panel_id' $checked/> $panel</label> ";

}
 echo "</p>";
}

// -----------------------------------------
// 2. Save custom field on product variation save

add_action( 'woocommerce_save_product_variation', 'kippah_save_threedmodel_variations', 10, 2 );

function kippah_save_threedmodel_variations( $variation_id, $i ) {
    global $wpdb;
    $threedmodel = $_POST['threedmodel'.$i];
    $min_qty = $_POST['minimum_qty'.$i];
    $logo_price = $_POST['logo_price'.$i];
    $active_panel = $_POST['active_panel'.$i];


     /*echo '<pre>',print_r($post),'</pre>';
    exit();*/
    //$panel_alternate = $_POST['panel_alternate'.$i];
    //$panel_3n1 = $_POST['panel_3n1'.$i];
    $active_extravariation = $_POST['active_extravariation'.$i];
    // $new_price = $base_price + $custom_price;
    if ( isset( $threedmodel ) ) update_post_meta( $variation_id, 'threedmodel', esc_attr( $threedmodel ) );
    if ( isset( $min_qty ) ) update_post_meta( $variation_id, 'minimum_qty', esc_attr( $min_qty ) );
    if ( isset( $logo_price ) ) update_post_meta( $variation_id, 'logo_price', esc_attr( $logo_price ) );
    if ( isset( $active_extravariation ) ) update_post_meta( $variation_id, 'active_extravariation', $active_extravariation);
    if ( isset( $active_panel) ) update_post_meta( $variation_id, 'active_panel', $active_panel);


}


// -----------------------------------------
// 3. Store custom field value into variation data

add_filter( 'woocommerce_available_variation', 'kippah_add_threedmodel_variation_data' );

function kippah_add_threedmodel_variation_data( $variations ) {
    $variations['threedmodel'] = get_post_meta( $variations[ 'variation_id' ], 'threedmodel', true );
    $variations['minimum_qty'] = get_post_meta( $variations[ 'variation_id' ], 'minimum_qty', true );
    $variations['logo_price'] = get_post_meta( $variations[ 'variation_id' ], 'logo_price', true );
    $variations['active_extravariation'] = get_post_meta( $variations[ 'variation_id' ], 'active_extravariation',true);

  return $variations;
}

add_action('woocommerce_cart_calculate_fees', function() {
	if (is_admin() && !defined('DOING_AJAX')) {
		return;
	}

	$products_in_cart = WC()->cart->get_cart_contents();

    $product_ids_in_cart = array_column(array_values($products_in_cart), 'evp_data');

	//$product_ids_in_cart = array_column(array_values($products_in_cart), 'product_id');
    $amount = 0;
    foreach($products_in_cart as $product){

        if(isset($product['evp_data'])){
            $evp_data = $product['evp_data'];
            if (strpos($evp_data,'Design')) {
        		$amount +=150;
        	}
        } 
    }
    if($amount>0){
        WC()->cart->add_fee(__('Design For Me', 'jupiter'), $amount);
    }


});

add_action('wp_ajax_getcolor1','getkippahcolor1');
add_action('wp_ajax_nopriv_getcolor1','getkippahcolor1');
function getkippahcolor1($color=""){

    if(isset($_POST['color']) || $color!=""){
     $material = $_POST['color'] ? $_POST['color']: $color;
     $images = get_stylesheet_directory().'/materials/'.$material.'/';
     $list = "";
     $cnt = 1;
     foreach(glob($images.'*') as $filename){
        $title = substr(basename($filename) ,0,-4);
        $list .= '<li><a href="#'.basename($filename).'" data-material="'.$material.'" data-skin="'.basename($filename).'"><img class="material" src="'.$filename.'"/>'.$title.'</a></li>';
        $img = get_stylesheet_directory_uri().'/materials/'.$material.'/'.basename($filename);
        ?>
        <div class="extra-variation-catunderbox colorbox"><label id="label_<?php echo $cnt;?>" class="extra-variation-radio">
        <input class="option-input radio" type="radio" data-imgsrc="<?php echo $img;?>" name="Color 1extra" id="" value="<?php echo $title;?>" data-value="<?php echo $title;?>" data-id="0" data-cat="Color 1" data-divid="<?php echo $cnt;?>" data-name="<?php echo $title;?>">
        <sellectarea class="sellectarea-with-thumbnail"></sellectarea> <img src="<?php echo $img;?>"><br><name><?php echo $title;?></name><span class="description"></span></label><br></div>
        <?php
        $cnt++;
     }
  }
}

add_action('wp_ajax_getcolor2','getkippahcolor2');
add_action('wp_ajax_nopriv_getcolor2','getkippahcolor2');
function getkippahcolor2($color=""){

    if(isset($_POST['color']) || $color!=""){
     $material = $_POST['color'] ? $_POST['color']: $color;
     $images = get_stylesheet_directory().'/materials/'.$material.'/';
     $list = "";
     $cnt = 1;
     foreach(glob($images.'*') as $filename){
        $title = substr(basename($filename) ,0,-4);
        $list .= '<li><a href="#'.basename($filename).'" data-material="'.$material.'" data-skin="'.basename($filename).'"><img class="material" src="'.$filename.'"/>'.$title.'</a></li>';
        $img = get_stylesheet_directory_uri().'/materials/'.$material.'/'.basename($filename);
        ?>
        <div class="extra-variation-catunderbox colorbox"><label id="label_<?php echo $cnt;?>" class="extra-variation-radio">
        <input class="option-input radio" type="radio" data-imgsrc="<?php echo $img;?>" name="Color 2extra" id="" value="<?php echo $title;?>" data-value="<?php echo $title;?>" data-id="0" data-cat="Color 2" data-divid="<?php echo $cnt;?>" data-name="<?php echo $title;?>">
        <sellectarea class="sellectarea-with-thumbnail"></sellectarea> <img src="<?php echo $img;?>"><br><name><?php echo $title;?></name><span class="description"></span></label><br></div>
        <?php
        $cnt++;
     }
  }
}

add_action('wp_ajax_getcolor_trim','getcolor_trim');
add_action('wp_ajax_nopriv_getcolor_trim','getcolor_trim');
function getcolor_trim($color=""){

    if(isset($_POST['color']) || $color!=""){
     $material = $_POST['color'] ? $_POST['color']: $color;
     $images = get_stylesheet_directory().'/materials/'.$material.'/';
     $list = "";
     $cnt = 1;
     foreach(glob($images.'*') as $filename){
        $title = substr(basename($filename) ,0,-4);
        $list .= '<li><a href="#'.basename($filename).'" data-material="'.$material.'" data-skin="'.basename($filename).'"><img class="material" src="'.$filename.'"/>'.$title.'</a></li>';
        $img = get_stylesheet_directory_uri().'/materials/'.$material.'/'.basename($filename);
        if( $material =='suede'){
        ?>
        <div class="extra-variation-catunderbox colorbox">
        <label id="label_trim_<?php echo $cnt;?>" class="extra-variation-radio">
        <input class="option-input radio" type="radio" name="Trim Colorextra" id="0.20" value="<?php echo $title;?>" data-value="<?php echo $title;?>" data-id="0.20" data-cat="Trim Color" data-divid="<?php echo $cnt;?>" data-name="<?php echo $title;?>">
        <sellectarea class="sellectarea-with-thumbnail"></sellectarea> <img src="<?php echo $img;?>"><br><name><?php echo $title;?></name><span class="description"></span><price>+$0.20</price></label><br></div>



      <?php } 



      else{ ?>
<div class="extra-variation-catunderbox colorbox">
        <label id="label_trim_<?php echo $cnt;?>" class="extra-variation-radio">
        <input class="option-input radio" type="radio" name="Trim Colorextra" id="0.25" value="<?php echo $title;?>" data-value="<?php echo $title;?>" data-id="0.25" data-cat="Trim Color" data-divid="<?php echo $cnt;?>" data-name="<?php echo $title;?>">
        <sellectarea class="sellectarea-with-thumbnail"></sellectarea> <img src="<?php echo $img;?>"><br><name><?php echo $title;?></name><span class="description"></span><price>+$0.25</price></label><br></div>
     <?php } ?>
        <?php
        $cnt++;

     }

     //new code
       if( $material =='suede'){
      $images = get_stylesheet_directory().'/emboss_trim/';
     $list = "";
     $cnt = 1;
     foreach(glob($images.'*') as $filename){
        $title = substr(basename($filename) ,0,-4);
       $titlename= str_replace(' ', '/', $title);

        $list .= '<li><a href="#'.basename($filename).'" data-material="'.$material.'" data-skin="'.basename($filename).'"><img class="material" src="'.$filename.'"/>'.$title.'</a></li>';
        $img = get_stylesheet_directory_uri().'/emboss_trim/'.basename($filename);
        ?>
        <div class="extra-variation-catunderbox trimbox">
        <label id="label_suedetrim_<?php echo $cnt;?>" class="extra-variation-radio">
        <input class="option-input radio" type="radio" name="Suede Trimextra" id="0.20" value="<?php echo $title;?>" data-value="<?php echo $title;?>" data-id="0.20" data-cat="Suede Trim" data-divid="<?php echo $cnt;?>" data-name="<?php echo $title;?>">
        <sellectarea class="sellectarea-with-thumbnail"></sellectarea> <img src="<?php echo $img;?>"><br><name><?php echo substr($titlename,10);?></name><span class="description"></span><price>+$0.20</price></label><br></div>
        <?php
        $cnt++;
     }
} 
  }
}

/*function getembosstrim_material(){

     $images = get_stylesheet_directory().'/emboss_trim/';
     $list = "";
     $cnt = 1;
     foreach(glob($images.'*') as $filename){
        $title = substr(basename($filename) ,0,-4);
       $titlename= str_replace(' ', '/', $title);

        $list .= '<li><a href="#'.basename($filename).'" data-material="'.$material.'" data-skin="'.basename($filename).'"><img class="material" src="'.$filename.'"/>'.$title.'</a></li>';
        $img = get_stylesheet_directory_uri().'/emboss_trim/'.basename($filename);
        ?>
        <div class="extra-variation-catunderbox trimbox">
        <label id="label_suedetrim_<?php echo $cnt;?>" class="extra-variation-radio">
        <input class="option-input radio" type="radio" name="Suede Trimextra" id="0.20" value="<?php echo $title;?>" data-value="<?php echo $title;?>" data-id="0.20" data-cat="Suede Trim" data-divid="<?php echo $cnt;?>" data-name="<?php echo $title;?>">
        <sellectarea class="sellectarea-with-thumbnail"></sellectarea> <img src="<?php echo $img;?>"><br><name><?php echo substr($titlename,10);?></name><span class="description"></span><price>+$0.20</price></label><br></div>
        <?php
        $cnt++;
     }
}
*/
function get_embroideredlogo(){

     $images = get_stylesheet_directory().'/embroidery/';
     $list = "";
     $cnt = 1;
     $html = "<ul>";
     foreach(glob($images.'*') as $filename){
        $title = substr(basename($filename) ,0,-4);
        $list .= '<li><a href="#'.basename($filename).'" data-material="'.$material.'" data-skin="'.basename($filename).'"><img class="material" src="'.$filename.'"/>'.$title.'</a></li>';
        $img = get_stylesheet_directory_uri().'/embroidery/'.basename($filename);
        $normalMap = get_stylesheet_directory_uri().'/embroidery/embroidery_map/'.$title.'/NormalMap.png';
        $displacementMap = get_stylesheet_directory_uri().'/embroidery/embroidery_map/'.$title.'/DisplacementMap.png';
        $html .= '<li><a class="sample-logo" href="#" data-logo="'.$img.'" data-normalmap="'.$normalMap.'" data-displacementmap="'.$displacementMap.'"><img src="'.$img.'"></a></li>';

        $cnt++;
     }
    $html .= "</ul>";
    return $html;
}

function getemboss_material(){

     $images = get_stylesheet_directory().'/emboss_pattern/';
     $list = "";
     $cnt = 1;
     foreach(glob($images.'*') as $filename){
        $title = substr(basename($filename) ,0,-4);
        $list .= '<li><a href="#'.basename($filename).'" data-material="'.$material.'" data-skin="'.basename($filename).'"><img class="material" src="'.$filename.'"/>'.$title.'</a></li>';
        $img = get_stylesheet_directory_uri().'/emboss_pattern/'.basename($filename);
        ?>
        <div class="extra-variation-catunderbox colorbox">
        <label id="label_emboss_<?php echo $cnt;?>" class="extra-variation-radio">
        <input class="option-input radio" type="radio" name="Embossextra" id="0.30" value="<?php echo $title;?>" data-value="<?php echo $title;?>" data-id="0.30" data-cat="Emboss" data-divid="<?php echo $cnt;?>" data-name="<?php echo $title;?>">
        <sellectarea class="sellectarea-with-thumbnail"></sellectarea> <img src="<?php echo $img;?>"><br><name><?php echo $title;?></name><span class="description"></span><price>+$0.34</price></label><br></div>
        <?php
        $cnt++;
     }
}

add_action('wp_ajax_upload-kippah','uploader');
add_action('wp_ajax_nopriv_upload-kippah','uploader');
function uploader()
{
    //global $wpdb;
        require_once "Uploader.php";
        $uploader = new Uploader();
        $files = $_FILES['File'];
        $uploadDir   = wp_upload_dir();
        $upload_dir = trailingslashit( $uploadDir['basedir'] );
        $uploaddir = $upload_dir.'/kippah/';
            if ( !file_exists( $uploaddir ) ) {
            wp_mkdir_p( $uploaddir );
        }
        $data = $uploader->upload($files, array(
            'limit' => 1, //Maximum Limit of files. {null, Number}
            'maxSize' => 10, //Maximum Size of files {null, Number(in MB's)}
            'extensions' => array('png','jpg','jpeg'), //Whitelist for file extension. {null, Array(ex: array('jpg', 'png'))}
            'required' => false, //Minimum one file is required for upload {Boolean}
            'uploadDir' => $uploaddir, //Upload directory {String}
            'title' => array('auto',10), //New file name {null, String, Array} *please read documentation in README.md
            'removeFiles' => true, //Enable file exclusion {Boolean(extra for jQuery.filer), String($_POST field name containing json data with file names)}
            'replace' => false, //Replace the file if it already exists  {Boolean}
            'perms' => null, //Uploaded file permisions {null, Number}
            'onCheck' => null, //A callback function name to be called by checking a file for errors (must return an array) | ($file) | Callback
            'onError' => null, //A callback function name to be called if an error occured (must return an array) | ($errors, $file) | Callback
            'onSuccess' => null, //A callback function name to be called if all files were successfully uploaded | ($files, $metas) | Callback
            'onUpload' => null, //A callback function name to be called if all files were successfully uploaded (must return an array) | ($file) | Callback
            'onComplete' => null, //A callback function name to be called when upload is complete | ($file) | Callback
            'onRemove' => null //A callback function name to be called by removing files (must return an array) | ($removed_files) | Callback
        ));
        

        $info = array();
        if($data['isComplete']){
            $logos = $data['data']['metas'];
            $info = array();
            foreach($logos as $logo){

                $url = $logo['name'];
                $image = wp_get_image_editor( $uploaddir.$url );
                if ( !is_wp_error( $image ) ) {
                    $image->resize( 100, null, true );
                    $image->set_quality( 100 );
                    $image->save( $uploaddir."thumbs/".$url );
                }
            
                $info = array('logo'=>"/wp-content/uploads/kippah/thumbs/".$url,'title'=>$logo['name']);
                // echo '<pre>';
                // print_r($uploader);
                // echo '</pre>';
            }

        }
        if (!session_id()) {
            session_start();
            $_SESSION['image_path'] = $logo['name'];
        }
        // $wpdb->insert('wp_woocommerce_order_itemmeta', array(
        //         'File'=>$_POST['image_path']
        //     ));
        // echo '<pre>';
        // print_r($_POST);
        // echo '</pre>';

        //echo $_SESSION['image_path'];

        echo json_encode($info);
        //echo 'Hello '.$_SESSION['image_path'];
        wp_die();

}


/* COde By Ravi For Custom Checkout Order to place extra meta data for image upload*/


add_action('woocommerce_checkout_update_order_meta', 'custom_checkout_field_update_order_meta');

function custom_checkout_field_update_order_meta($order_id)
{
    session_start();
    if ($_SESSION['image_path'])
        update_post_meta($order_id, 'image_path_ravi', esc_attr(htmlspecialchars($_SESSION['image_path'])));
}




add_action('wp_ajax_delete-uploaded-img','delete_uploaded');
add_action('wp_ajax_nopriv_delete-uploaded-img','delete_uploaded');
function delete_uploaded(){

    $imgs = $_POST['img'];
    $uploadDir   = wp_upload_dir();
    $upload_dir = trailingslashit( $uploadDir['basedir'] );
    $uploaddir = $upload_dir.'/kippah/';
    $img = explode('/',$imgs);

    unlink($uploaddir.$imgs);
    unlink($uploaddir.$img[1]);

    echo 'success';
    exit();
}

if ( function_exists( 'add_image_size' ) ) {
    add_image_size( 'custom-thumb', 100, 100 ); // 100 wide and 100 high
}

add_action( 'login_form', 'verification_code_field' );

function verification_code_field() {

    //Get and set any values already sent
    $verification_code = ( isset( $_POST['verification_code'] ) ) ? $_POST['verification_code'] : '';
    ?>

    <div class="vcode-wrap">
        <label for="verification_code"><?php _e('Verification Code','jupiter') ?><br />
            <input type="text" name="verification_code" id="verification_code" class="input" value="<?php echo esc_attr(stripslashes($verification_code)); ?>" size="25" /></label>
    </div>


    <?php
}
add_action('login_footer','my_login_footer',20);
function my_login_footer(){
    if(!isset($_POST['login']) && !isset($_POST['pwd'])):
    ?>
    <script>
    jQuery(document).ready(function($){
        $('.vcode-wrap').hide();
    })
    </script>
    <?php
    else:

    endif;

}

function wp_authenticate_by_email( &$username ) {
    $user = get_user_by( 'email', $username );

    if ( $_POST['verification_code']==""){
        return;
    }

}


function myplugin_rewrite_rule() {
	add_rewrite_rule( '^shop/build-kippah/([^/]*)/?$','index.php?post_type=product&product=build-kippah&material=$matches[1]','top');
}
add_action('init', 'myplugin_rewrite_rule', 10, 0);

add_filter( 'query_vars', 'pmg_rewrite_add_var' );
function pmg_rewrite_add_var( $vars )
{
    $vars[] = 'material';
    return $vars;
}

add_action( 'woocommerce_after_order_itemmeta', 'display_admin_order_item_custom_button', 10, 3 );
function display_admin_order_item_custom_button( $item_id, $item, $product ){
    // Only "line" items and backend order pages
    if( ! ( is_admin() && $item->is_type('line_item') ) )
        return;

    $img_url = $item->get_meta('file'); // Get custom item meta data (array)
    //$em_url = $embord->get_image('jFiler-item-thumb-image');

    if( ! empty($img_url) ) {
        // Display a custom download button using custom meta for the link
        echo '<a href="' . reset($img_url) . '" class="button download" download>' . __("Download", "woocommerce") . '</a>';
        // echo '$em_url';
        //echo "<img src='". $row['url'] ."' data-big='". $row['jFiler-item-thumb-image img'] ."' class='media-image' />";
    
        // <script type="text/javascript">
        //     alert($('.sample-logo').attr("src"));
        // </script> 
    }
}
add_filter( 'default_checkout_billing_country', 'change_default_checkout_country' );

function change_default_checkout_country() {
return 'US'; // Put Country code here
}

// function ts_disable_all_but_cod( $available_payment_gateways ) {
//     //Check whether the available payment gateways have the Cash on delivery option and if the user is not logged in or has the role customer
//   $user = wp_get_current_user();
//   $allowed_roles = array('Administrator');
  
//     if (!array_intersect($allowed_roles, $user->roles )) {        
    
//     if (isset($available_payment_gateways['paypal'])) {
//          unset($available_payment_gateways['paypal']);
//       }        
//  }
  
//      return $available_payment_gateways;
// }
// add_filter('woocommerce_available_payment_gateways', 'ts_disable_all_but_cod', 90, 1);

function ts_disable_cod( $available_payment_gateways ) { 
//Check whether the available payment gateways have the Cash on delivery option and if the user is not logged in or has the role customer 
    $user = wp_get_current_user();
        $allowed_roles = array('customer');
    if ( isset($available_payment_gateways['cod']) && (array_intersect($allowed_roles, $user->roles ) || !is_user_logged_in()) ) { 
        //Remove the cash on delivery payment gateway 
        unset($available_payment_gateways['cod']); 
    } 
    return $available_payment_gateways; 
} 
add_filter('woocommerce_available_payment_gateways', 'ts_disable_cod', 90, 1);

// cart value
add_action('wp_ajax_getRushVlaue','getRushVlaue');
add_action('wp_ajax_nopriv_getRushVlaue','getRushVlaue');
function getRushVlaue(){
}

add_action( 'wp_ajax_nopriv_custome_add_to_cart', 'custome_add_to_cart' );
add_action( 'wp_ajax_custome_add_to_cart', 'custome_add_to_cart' );
function custome_add_to_cart()
{
  global $woocommerce;
  $embroideredValue = isset($_POST['embroideredValue'])?trim($_POST['embroideredValue']):"";
  
  $value = explode('$', $embroideredValue);
  if(floatval($value[1]) == floatval(150.00))
  {
   $productId = 659;
  }
  else if(floatval($value[1]) == floatval(0.50))
  {
    $productId = 660;
  }
  elseif (floatval($value[1]) == floatval(1)) {
    $productId = 661;
  }
  else
  {
    $productId = "";  
  }
  $found = false;
  $productDetails = wc_get_product($productId);
  if(!empty($productId))
  {
    WC()->cart->add_to_cart($productId);
    /*check product added in card or not */
    if ( sizeof( WC()->cart->get_cart() ) > 0 ) {
          foreach ( WC()->cart->get_cart() as $cart_item_key => $values ) {
              $_product = $values['data'];
              if ( $_product->id == $productId ){
                  $found = true;
              }
          }
    }
  }
  $text = ($found)?"product added":"product not added";
  echo json_encode($text);
  exit();
}
// Remove conditionally cart items based on a specific product (item)
add_action( 'woocommerce_before_calculate_totals', 'remove_cart_items_conditionally', 10, 1 );
function remove_cart_items_conditionally( $cart ) {
    
    $specific_product_id = 659;  

    if ( is_admin() && ! defined( 'DOING_AJAX' ) )
        return;
    $cart_items  = $cart->get_cart(); // Cart items array
    $items_count = count($cart_items); // Different cart items count
    if ( $items_count < 2 )
        return;
    $last_item    = end($cart_items); // Last cart item data array
    $is_last_item = false; // Initializing
     if ( in_array($specific_product_id, array( $last_item['product_id'], $last_item['variation_id'] ) ) ) {
        $is_last_item = true;
    }

    // Loop through cart items
    foreach ( $cart_items as $cart_item_key => $cart_item ) {
        if ( ! in_array($specific_product_id, array( $cart_item['product_id'], $cart_item['variation_id'] ) ) && $is_last_item ) {
            $cart->remove_cart_item( $cart_item_key );
        }
        elseif ( in_array($specific_product_id, array( $cart_item['product_id'], $cart_item['variation_id'] ) ) && ! $is_last_item ) {
            $cart->remove_cart_item( $cart_item_key );
            }
         }
       }