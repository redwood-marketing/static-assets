<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset') ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <?php get_template_part("navigation"); ?>
    <?php if (!is_page()): ?>
    <div id="main-page-content">
    <?php else: ?>
    <div>
    <?php endif ?>