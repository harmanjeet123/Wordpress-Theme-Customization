<li class="<?php echo $view_params['column_class']; ?> testimonial-item">
	<?php 
	echo mk_get_shortcode_view('mk_testimonials', 'components/author', true);
	echo mk_get_shortcode_view('mk_testimonials', 'components/company-name', true);
	?>
	<div class="mk-testimonial-content">
		<?php echo mk_get_shortcode_view('mk_testimonials', 'components/quote', true); ?>
	</div>
</li>