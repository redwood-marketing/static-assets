<?php
get_header();
?>
	<div class="py-100">
     <div class="wrapper" id="blog-listing-page">
        <h2>
        <?php
            if (is_category()) {
                echo "Category: "; single_cat_title();
            } else if(is_tag()) {
                echo "Tag: "; single_tag_title();
            } else if(is_author()) {
                the_post();
                echo "Author: "; the_author();
                rewind_posts();
            } else if(is_day()) {
                echo "Day: " . get_the_date();
            } else if(is_month()) {
                echo "Month: " . get_the_date('F Y');
            } else if(is_year()) {
                echo "Year: " . get_the_date('Y');
            } else {
                echo "Archives";
            }
        ?>
        </h2>
        <div class="post-list flex flex-wrap pt-50">
		<?php
		if (have_posts()) {
			while(have_posts()) {
			the_post();
			?>
			<div class="post-item">
                <?php the_post_thumbnail( 'post-thumbnail', ['class' => 'post-thumbnail'] ); ?>
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
?>