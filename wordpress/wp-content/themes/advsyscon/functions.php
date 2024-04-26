<?php  

add_filter( 'xmlrpc_enabled', '__return_false' );

add_action('wp_enqueue_scripts', function () {

    /**
     * Styles
     */

    wp_register_style(
        "fonts", 
        "https://use.typekit.net/ydj8avx.css", 
        [], false
    );

    wp_register_style(
        "style", 
        get_stylesheet_uri(), 
        [], false
    );
    
    wp_register_style(
        "overrides", 
        "https://static.marketing.redwood.com/activebatch/dist/pages/nav.min.css", 
        ["style"], false
    );

    wp_register_style(
        "fontawesome", 
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css", 
        [], false
    );

    wp_enqueue_style( "fonts" );
    wp_enqueue_style( "style" );
    wp_enqueue_style( "overrides" );
    wp_enqueue_style( "fontawesome" );

    /**
     * Scripts
     */

    wp_register_script( 
        'main', 
        get_template_directory_uri() . '/js/index.min.js', 
        ['jquery'], false, true
    );

    wp_register_script( 
        'nav', 
        'https://static.marketing.redwood.com/activebatch/dist/pages/js/nav.min.js', 
        [], false, true
    );

    wp_register_script( 
        'hubspot', 
        '//js.hs-scripts.com/74047.js', 
        [], false, true
    );

    wp_enqueue_script( 'main' );
    wp_enqueue_script( 'nav' );
    wp_enqueue_script( 'hubspot' );

});

add_action('wp_head', 'gtm');

function gtm() {
    echo "
        <!-- Mutiny -->
        <script>
        (function(){var a=window.mutiny=window.mutiny||{};if(!window.mutiny.client){a.client={_queue:{}};var b=['identify','trackConversion'];var c=[].concat(b,['defaultOptOut','optOut','optIn']);var d=function factory(c){return function(){for(var d=arguments.length,e=new Array(d),f=0;f<d;f++){e[f]=arguments[f]}a.client._queue[c]=a.client._queue[c]||[];if(b.includes(c)){return new Promise(function(b,d){a.client._queue[c].push({args:e,resolve:b,reject:d});setTimeout(d,500)})}else{a.client._queue[c].push({args:e})}}};c.forEach(function(b){a.client[b]=d(b)})}})();
        </script>
        <script data-cfasync='false' src='https://client-registry.mutinycdn.com/personalize/client/b2df6a6f82b198ad.js'></script>
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-4F4Q');</script>
        <!-- End Google Tag Manager -->
    ";
}


/**
 * Theme Support & Misc
 */

add_action( 'after_setup_theme', 'theme_support_and_misc' );

function theme_support_and_misc () {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'post-formats', array( 'aside', 'gallery', 'link', 'status', 'image' ) );
    add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
    remove_filter( 'get_the_content','wpautop' );
    remove_filter( 'the_excerpt','wpautop' );
}

/**
 * Add Reusable Blocks To Menu
 */

add_action( 'admin_menu', 'add_reusable_blocks_to_wp_sidebar' );

function add_reusable_blocks_to_wp_sidebar() {
    add_menu_page( 
        'Reusable Blocks', 
        'Reusable Blocks', 
        'edit_posts', 
        'edit.php?post_type=wp_block', 
        '', 
        'dashicons-schedule', 
        22 
    );
}

/**
 * Register Nav Menus
 */

add_action( 'after_setup_theme', 'register_theme_menus', 0 );

function register_theme_menus () {
    register_nav_menus(array(
        'primary' => __('Main Menu'),
        'footer'  => __('Footer Menu')
    ));
}

/**
 * Custom Excerpt Length
 */

add_filter( 'excerpt_length', function ( $length ) {
    return 20;
}, 999 );


/**
 * Modify Archive Query
 * TODO: Review if this can be deleted
 */

add_action('pre_get_posts', 'archive_paginations');

function archive_paginations ( $query ) {

    if ( !is_admin() && $query->is_archive() && $query->is_main_query() ) {

        global $wp_query;
        $cat = $wp_query->get_queried_object();
            $query->set( 'posts_per_page', '24' );
            $query->set( 'cat', $cat->slug );
    
    }

    return $query;

};


/**
 * Custom Options Page
 */

if ( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page(array(
		'page_title' 	=> 'Theme General Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
	
}


/**
 * Reading Time
 */

if ( !function_exists('reading_time') ):
function reading_time() {

    $content     = get_post_field( 'post_content', $post->ID );
    $word_count  = str_word_count( strip_tags( $content ) );
    $readingtime = ceil($word_count / 200);

    if ($readingtime == 1) {
        $timer = " MIN READ";
    } else {
        $timer = " MIN READ";
    }

    $totalreadingtime = $readingtime . $timer;

    return $totalreadingtime;

}
endif;