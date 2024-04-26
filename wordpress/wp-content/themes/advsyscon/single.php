<?php 
get_header();
?>
<main class="pt-50">
	<div class="wrapper">
		<?php
		while (have_posts()) {
			the_post();
			
			?>
			<div class="title-thumbnail">
				<div class="title-container">
					<div class="flex ac flow">
						<?php $categories = get_the_category();
						if ( ! empty( $categories ) ) {
						    echo '<a class="single-post-category" href="' . esc_url( get_category_link( $categories[0]->term_id ) ) . '">' . esc_html( $categories[0]->name ) . '</a>' . '<span class="time-read"> ('. reading_time() .')</span>';
						} ?>
					</div>
					<h1 class="single-title"><?php the_title(); ?></h1>
                    <?php if ( has_excerpt() ) : ?>
                        <p class="single-excerpt"><?php the_excerpt(); ?></p>
                    <?php endif ?>
					<div class="single-author">
						Written by <?php echo get_the_author_posts_link(); ?>. Last Updated:
                        <time datetime="<?= get_the_modified_date( "Y-m-d" ); ?>">
                            <?= get_the_modified_date( "F d, Y" ); ?>
                        </time>
					</div>
                    <div class="social-share">
                        <span class="share-icon"><i class="fa fa-share-alt"></i></span>
                        <span class="share-icon"><a target="_blank" href="https://www.twitter.com/intent/tweet?url=<?php echo urlencode( get_the_permalink() ); ?>&via=activebatch&text=<?php echo htmlentities( get_the_title() ) ?>"><i class="fab fa-twitter"></i></a></span>
                        <span class="share-icon"><a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo get_the_permalink(); ?>"><i class="fab fa-linkedin-in"></i></a></span>
                        <span class="share-icon"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo get_the_permalink(); ?>"><i class="fab fa-facebook-f"></i></a></span>
                    </div>
				</div>
                <?php the_post_thumbnail( 'post-thumbnail', ['class' => 'single-thumbnail'] ); ?>
			</div>
            <hr style="margin: 4rem 0">
			<div class="single-post-content pb-60">
				
				<div style="display: flex; flex-flow: row wrap; align-items: start; gap: 4rem; ">
                    <section class="single-content-wrapper">
                        <?php the_content(); ?>
                        <div class="author-container pb-50" style="margin-top:50px">
                            <div class="flex">
                                <div class="author-img"><?php echo get_avatar( get_the_author_meta( 'ID' ), 68 ); ?></div>
                                <div class="author-meta">
                                    <h3 class="author-name"><?php echo get_the_author_posts_link(); ?></h3>
                                    <div><?php echo nl2br(get_the_author_meta('description')); ?></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <aside style="position: sticky; top: 10rem; display: grid; gap: 2rem; align-content: start; flex: 1 1 20ch">
                        
                        <section class="related-categories">

                            <?php if ( have_rows("interlinking") ) : while ( have_rows("interlinking") ) : the_row(); 

                                $title    = get_sub_field("title");
                                $subtitle = get_sub_field("subtitle");

                                if ( have_rows("items") ) : ?>
                                    <h2 class="h5"><?= $title ?></h2>
                                    <p style="display: block; margin: 0; font-size: 0.8rem"><?= $subtitle ?></p>
                                    <div>
                                        <?php while ( have_rows("items") ) :  the_row(); 
                                            $link = (object)get_sub_field("link"); ?>

                                            <a href="<?= $link->url ?>" class="post-category">
                                                <?= $link->title ?>
                                            </a>

                                        <?php endwhile ?> 
                                    </div>

                                <?php else : ?>

                                    <h2 class="h5">Related Categories</h2>
                                    <p style="display: block; margin: 0; font-size: 0.8rem">Get More From Your Workload Automation Investment</p>
                                    <div>
                                        <?php foreach ( get_the_category() as $cat ) : ?>
                                            <a href="<?=  esc_url( get_category_link( $cat->term_id ) ) ?>" class="post-category">
                                                <?= esc_html( $cat->name ) ?>
                                            </a>
                                        <?php endforeach; ?>
                                    </div>

                                <?php endif; ?> 

                            <?php endwhile; endif; ?>

                        </section>

                        <section class="single-newsletter-subscription">
                            <h2 class="h5">Subscribe to our newsletter</h2>
                            <p style="font-size: 0.8rem">Get automation tips in your inbox every two weeks</p>
                            <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
                            <script async defer>
                                hbspt.forms.create({
                                    portalId: "74047",
                                    formId: "671a4650-3d3f-4358-83f5-c9deb5eee01f",
                                    onFormReady: function( $form ) {
                                        $form.find("[name='email']").attr("placeholder", "Get automation tips in your inbox every 2 weeks");
                                    }
                                });
                            </script>
                        </section>
                    </aside>
				</div>
                
			</div>
			<?php
			
		}
		?>
	</div>
	<!--section id="comment" class="py-100">
		<div class="wrapper">
			<div class="comment-section">
				<div class="comment-title"><h3>Let Us Know What You Thought about this Post.</h3></div>
				<?php // comments_template( '/short-comments.php' ); ?>
			</div>
		</div>
	</section-->
    <!-- Related Posts -->
    <?php 
    $related_posts = new WP_Query(array(
        'category__in' => get_the_category($post->ID)[0]->term_id,
        'post__not_in' => array($post->ID),
        'posts_per_page'=> 3,
        'caller_get_posts'=> 1
    ));
    
    if ( $related_posts->have_posts() ) : ?>
        <aside class="py-100"  style="background-color: #fafafa">
            <div class="wrapper">
                <h2 class="pb-30" style="text-align: center;">You May Also Like</h2>
                <div class="post-list flex flex-wrap">
                    <?php  while ( $related_posts->have_posts() ) : $related_posts->the_post(); ?>
                        <div class="post-item recent-item">
                            <a href="<?php the_permalink(); ?>" class="post-overlay"></a>
                            <?php the_post_thumbnail( 'medium', ['class' => 'post-thumbnail'] ); ?>
                            <div class="post-content py-25">
                                <h4 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                                <div class="pt-20 excerpt"><p><?php the_excerpt(); ?></p></div>
                            </div>
                        </div>
                    <?php endwhile; wp_reset_postdata(); ?>
                </div>
            </div>
        </aside>
    <?php endif ?>

    <!--/ Related Posts -->

    <!-- Popular Posts -->
	<aside class="py-100">
		<div class="wrapper">
			<h2 class="pb-30" style="text-align: center;">Popular Articles</h2>
			<?php 
			$tags = array(
                'post_type' => 'post',
                'tag' => 'popular',
                'posts_per_page' => 3
            );
            $popular_posts = new WP_Query( $tags );
            ?>
                <div class="post-list flex flex-wrap">
                    <?php if ( $popular_posts->have_posts() ) : while ( $popular_posts->have_posts() ) : $popular_posts->the_post(); ?>
                        <div class="post-item recent-item">
                            <a href="<?php the_permalink(); ?>" class="post-overlay"></a>
                            <?php the_post_thumbnail( 'medium', ['class' => 'post-thumbnail'] ); ?>
                            <div class="post-content py-25">
                                <h4 class="post-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                                <div class="pt-20 excerpt"><p><?php the_excerpt(); ?></p></div>
                            </div>
                        </div>
                    <?php endwhile; wp_reset_postdata(); else: ?>
                        <p>Sorry, no posts found!</p>
                    <?php endif; ?>
                </div>
		</div>
	</aside>
    <!--/ Popular Posts -->

</main>
<?php
get_footer();