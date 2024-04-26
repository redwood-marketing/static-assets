<?php
/*
Template Name: Blog Template
*/
get_header();

$paged = get_query_var( 'page' );

$args = array(
	'post_type' => 'post',
	'paged' => $paged,
	'tax_query' => array(
        array(
            'taxonomy' => 'post_format',
            'operator' => 'NOT EXISTS',
        )
    )
);

$tags = array(
	'post_type' => 'post',
	'tag' => 'popular',
	'posts_per_page' => 3
);

$latest = array(
	'post_type' => 'post',
	'posts_per_page' => 1,
	'tax_query' => array(
        array(
            'taxonomy' => 'post_format',
            'operator' => 'NOT EXISTS',
        ),
    ),
);

$links = array(
	'post_type' => 'post',
	'posts_per_page' => 1,
	'tax_query' => array(
        array(
            'taxonomy' => 'post_format',
            'field'    => 'slug',
            'terms'    => array( 'post-format-link' )
        ),
    ),
);

$popular = array(
	'post_type' => 'post',
	'posts_per_page' => 3,
	'tax_query' => array(
        array(
            'taxonomy' => 'post_format',
            'operator' => 'NOT EXISTS',
        ),
    ),
);

$query = new WP_Query($args);

$queryTags = new WP_Query($tags);

$queryLatest = new WP_Query($latest);

$queryLinks = new WP_Query($links);

if ($query -> have_posts()) {
	if ($queryLatest->have_posts()) {
		$queryLatest -> the_post();
	?>
	<div class="first-post">
        
		<div class="large-thumbnail">
            <span class="latest-tag">LATEST</span>
            <?php the_post_thumbnail( 'medium_large', ['class' => 'large-thumbnail-img'] ); ?>
        </div>
		<div class="first-post-content">
			<div class="pb-20">
				<?php $categories = get_the_category();
				if ( ! empty( $categories ) ) {
				    echo '<a class="post-category" href="' . esc_url( get_category_link( $categories[0]->term_id ) ) . '">' . esc_html( $categories[0]->name ) . '</a>';
				} ?>
			</div>
			<h3 class="post-title pb-15"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
			<p class="color-grey">by <span class="author-name link"><?php echo get_the_author_posts_link(); ?></span> on <?php echo get_the_date(); ?></p>
			<a href="<?php the_permalink(); ?>" class="read-more button button-primary">Read More</a>
		</div>
	</div>
	<?php
	}
	wp_reset_postdata();
	?>
	<div class="wrapper">
	<div class="search-category py-50">
		<div class="flex jsb">
			<div class="search w-30">
				<form action="<?php echo get_home_url(); ?>" method="get">
					<span><i class="fas fa-search"></i></span>
	            	<input type="text" name="s" id="search" value="<?php the_search_query(); ?>" placeholder="I’m looking for …">
				</form>
			</div>
			<div class="categories w-30">
				<div>
					<span class="cat-toggle">CATEGORIES <i class="fa fa-caret-down"></i></span>
					<ul class="cat-list">
						<?php
						wp_list_categories(array(
					        'title_li' => '',
					        'hide_empty' => 0,
					        'exclude' => '1'
					    ));
					    ?>
					</ul>
				</div>
			</div>
			<div class="subscribe w-30">
	    	<div class="subscribe-to-blog">
				<a href="#" class="get-more js-popup-trigger">Subscribe To Our Newsletter</a>
	        </div>
			</div>
		</div>
	</div>


	<!-- Posts List -->
	<div class="post-list flex flex-wrap">
		<?php
		while($query -> have_posts()) {	
            $query -> the_post();
            if ($query->current_post >= 0 && $query->current_post < 6) {
            ?>
                <div class="post-item">
                    <a href="<?php the_permalink(); ?>" class="post-overlay"></a>
                    <?php the_post_thumbnail( 'medium', ['class' => 'post-thumbnail'] ); ?>
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
		}
		?>
	</div>

	<!-- Popular Posts and Links-->
	<div class="popular-link-posts py-50">
		<div class="popular-posts">
			<?php
			// Fetch Popular Posts
			if ($queryTags -> have_posts()) {
				while($queryTags -> have_posts()) {
					$queryTags -> the_post();
					?>
					<div class="flex ac">
                        <div class="popular-thumbnail">
                            <span class="popular-tag">POPULAR</span>
                            <?php the_post_thumbnail( 'medium', ['class' => 'popular-thumbnail-img post-thumbnail'] ); ?>
                        </div>
						<div class="popular-content">
							<div class="post-content">
								<div class="pb-20">
									<?php $categories = get_the_category();
									if ( ! empty( $categories ) ) {
									    echo '<a class="post-category" href="' . esc_url( get_category_link( $categories[0]->term_id ) ) . '">' . esc_html( $categories[0]->name ) . '</a>';
									} ?>
								</div>
								<h4 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
								<a href="<?php the_permalink(); ?>" class="read-more button button-primary">Read More</a>
							</div>
						</div>
					</div>
					<?php
				}
			}
			wp_reset_postdata();
			?>
		</div>

		<aside class="link-posts">
            <?php 
                $home_cta = get_field( "homepage_cta", "option" );
            ?>
			<div>
                <?php echo wp_get_attachment_image( $home_cta["img"], "medium", false, ["class" => "link-img"] ); ?>
				<h5 class="link-title"><?php echo $home_cta["title"]; ?></h5>
				<div class="link-content">
                    <a href="<?php echo $home_cta["link"]["url"]; ?>" class="button button-primary"><?php echo $home_cta["link"]["title"]; ?></a>
                </div>
			</div>
		</aside>
	</div>

	<!-- Posts List -->
	<div class="post-list flex flex-wrap">
	<?php
	while($query -> have_posts()) {
		$query -> the_post();
		if ($query->current_post > 6) {
		?>
		<div class="post-item">
			<a href="<?php the_permalink(); ?>" class="post-overlay"></a>
			<?php the_post_thumbnail( 'medium', ['class' => 'post-thumbnail'] ); ?>
			<div class="post-content py-25">
				<div class="pb-20">
					<?php 
                    
                    $categories = get_the_category();
					
                    if ( ! empty( $categories ) ) {
					    echo '<a class="post-category" href="' . esc_url( get_category_link( $categories[0]->term_id ) ) . '">' . esc_html( $categories[0]->name ) . '</a>';
					} 

                    ?>
				</div>
				<h4 class="post-title">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </h4>
			</div>
		</div>
		<?php
		}
	}
	?>
	</div>
	<?php
} else {
	echo "Sorry, no posts found!";
}

wp_reset_postdata();
?>
<!-- Pagination -->
<div class="pagination fs-16 pt-50 pb-100">
	<?php
$big = 999999999; // need an unlikely integer
 
echo paginate_links( array(
    'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
    'format' => '?page=%#%',
    'prev_text' => '< PREV',
    'next_text' => 'NEXT >',
    'current' => max( 1, get_query_var('page') ),
    'total' => $query->max_num_pages
) );
?>
</div>
</div>
<?php


get_footer();
?>