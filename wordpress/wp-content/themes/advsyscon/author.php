<?php
get_header();
?>
	<div class="py-100">
     <div class="wrapper" id="blog-listing-page">
        <div align="center">
            <?php echo get_avatar( get_the_author_meta( 'ID' ), 80 ); ?>
            <h2 class="py-20">
            <?php the_author(); ?>
            </h2>
            <p><?php echo get_the_author_meta('description'); ?></p>
        </div>
        <div class="pt-70 pb-25" align="center"><h2>RECENT POSTS</h2></div>
        <div class="post-list flex flex-wrap pt-50">
    <?php
    $author_id = get_the_author_ID();
    $args = array(
    'author' => $author_id,
    'tax_query' => array(
        array(
            'taxonomy' => 'post_format',
            'operator' => 'NOT EXISTS',
        )
    )
    );
    $query = new WP_Query($args);
    if ($query->have_posts()) {
        while($query->have_posts()) {
        $query->the_post();
        ?>
        <div class="post-item">
            <div class="post-thumbnail" style="background-image: url(<?php the_post_thumbnail_url(); ?>);"></div>
            <div class="post-content py-25">
                <div class="pb-20">
                    <?php $categories = get_the_category();
                    if ( ! empty( $categories ) ) {
                        echo '<a class="post-category" href="' . esc_url( get_category_link( $categories[0]->term_id ) ) . '">' . esc_html( $categories[0]->name ) . '</a>';
                    } ?>
                </div>
                <h4 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
            </div>
        </div>
        <?php
    }
} else {
    ?>
    <p class="no-posts">Sorry no posts found!</p>
    <?php
}
    ?>
    </div>
		<div class="pagination fs-16 pt-50">
			<?php
				$pagination = get_the_posts_pagination( array(
					'mid_size' => 2,
					'prev_text' => __( '< PREV', 'textdomain' ),
					'next_text' => __( 'NEXT >', 'textdomain' ),
					'screen_reader_text' => __( 'A' )
				) );
				$pagination = str_replace('<h2 class="screen-reader-text">A</h2>', '', $pagination);
				echo $pagination;
				#the_posts_pagination( array( 'mid_size' => 2 ) );
			?>
		</div>
    </div>   
    </div>

<?php
wp_reset_query();
get_footer();