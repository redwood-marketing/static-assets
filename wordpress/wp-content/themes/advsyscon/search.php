<?php
/*
Template Name: Search Template
*/
get_header();
?>
<div class="person-info-container">
        <div class="banner-image py-100 color-light">
        	<div class="wrapper">
                <h2>Search IT Automation Without Boundaries</h2>
            </div>
        </div>
    <div class="wrapper">
    	<div id="search-listing-page">
			<div class="search search-category" style="padding-top: 40px;">
				<form action="<?php echo get_home_url(); ?>" method="get">
					<span><i class="fas fa-search"></i></span>
	            	<input type="text" name="s" id="search" value="<?php the_search_query(); ?>" placeholder="I’m looking for …">
				</form>
			</div>
	    	<h2 class="text-center pt-50">Search Results</h2>
	        <p class="pt-10 result-for">
	        <?php
	            if(is_search()) {
	                echo "<span class='color-lightgrey'>Results for: </span><span class='result-text'>" . get_search_query() . "</span>";
	            } else {
	                echo "Archives";
	            }
	        ?>
	        </p>
	        <div class="flex py-50">
	                <div class="search-listing">
	                    <?php
	                    if (have_posts()) {
	                        while (have_posts()) {
	                            the_post();
	                            ?>
	                            <?php $title = get_the_title(); $keys= explode(" ",$s); $title = preg_replace('/('.implode('|', $keys) .')/iu', '<strong class="search-excerpt">\0</strong>', $title); ?>
	                            <?php $excerpt = get_the_excerpt(); $keys1= explode(" ",$s); $excerpt = preg_replace('/('.implode('|', $keys1) .')/iu', '<strong class="search-excerpt">\0</strong>', $excerpt); ?>
	                            <div class="single-search pb-50">
	                                <p class="fs-28 h-font search-post-name post-name"><a href="<?php the_permalink(); ?>" class="color-darkblue"><?php echo $title; ?></a></p>
	                                <div class="post-excerpt search-excerpt fs-16"><span><?php echo $excerpt; ?></span></div>
	                            </div>
	                            <?php
	                        }          
	                    } else {
	                    	?>
	                    	<div>
	                        	<h4>No results found!</h4>
	                        </div>
	                        <?php
	                    }
	                    ?>
	                </div>
	        </div>
	    </div>
    </div>

<?php
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
<?php
get_footer();