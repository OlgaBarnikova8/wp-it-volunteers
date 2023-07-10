<?php
/**
 * Enqueue scripts and styles.
 */
add_action( 'wp_enqueue_scripts', 'wp_it_volunteers_scripts' );

function wp_it_volunteers_scripts() {
  wp_enqueue_style( 'main', get_stylesheet_uri() );
  wp_enqueue_style( 'wp-it-volunteers-style', get_template_directory_uri() . '/app/css/style.min.css', array('main') );
  wp_enqueue_script( 'wp-it-volunteers-navigation', get_template_directory_uri() . '/app/js/main.min.js', array(), false, true );

}
