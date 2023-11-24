<?php
/**
* Template Name: Reel Page
**/
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo get_the_title() ?></title>
    <script src='/wp-content/themes/jupiter-child/js/jquery-1.9.1.min.js' type='text/javascript'></script>
    <script type="text/javascript" src="/wp-content/themes/jupiter-child/js/jquery.reel.js"></script> 
    <!-- <link href="/wp-content/themes/jupiter-child/images/style.css" rel="stylesheet" type="text/css" /> -->
    <?php wp_head(); ?>

    <style>
      #green_marker {
        width: 20px;
        height: 20px;
        margin-left: -20px; 
        background: green;
      }
      #image-reel, #image2-reel{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
      }
      .vc_col-md-6{
        width:50%;
        position: relative;
      }
      .vc_row{
        display: flex;
        height: 100%;
      }
    </style>  
</head>
<body>
<div class="vc_row">
<!--   <div class="vc_col-md-6">
<img src="/wp-content/themes/jupiter-child/images/kippahs.png" width="500" height="320"
      class="reel"
      id="image"
      data-images="/wp-content/themes/jupiter-child/images/kippahs/##.png"
      data-footage="10"
      data-cw="true"
      data-orbital="3"
      data-inversed="true"
      data-speed="0">
</div>
  <div class="vc_col-md-6">
<img src="/wp-content/themes/jupiter-child/images/m3603.png" width="500" height="320"
      class="reel"
      id="image2"
      data-images="/wp-content/themes/jupiter-child/images/m3603/##.png"
      data-footage="20"
      data-cw="true"
      data-orbital="3"
      data-rowlock:="true"
      data-inversed="true"
      data-speed="0">
</div> -->


       <img src="/wp-content/themes/jupiter-child/images/new.png" width="500" height="320"
      class="reel"
      id="image"
      data-images="/wp-content/themes/jupiter-child/images/new/###.png"
      data-frames="12"
      data-frame="1"
      data-rows="7"
      data-row="4"
      data-speed="0">

    <div class="reel-annotation"
      id="first_row"
      data-start="001"
      data-end="012"
      data-x="15,30,45,60,75,90,105,120,135,150,165,180"
      data-y="10"
      data-for="image">

    </div>
    <div class="reel-annotation"
      id="last_row"
      data-start="073"
      data-end="084"
      data-x="180,165,150,135,120,105,90,75,60,45,30,15"
      data-y="48"
      data-for="image">

    </div>

</div>


<?php wp_footer(); ?>
</body>
</html>