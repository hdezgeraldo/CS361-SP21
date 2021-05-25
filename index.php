<?php include 'header.php' ?>

<?php header('Access-Control-Allow-Origin: http://alieninvaders.loc'); ?>

<main class="prototype d-flex-centering" style="background-image:url('assets/img/bg.jpg');">

    <?php include 'template-parts/page-start.php'; ?>

    <?php include 'template-parts/page-game-play.php'; ?>

    <?php include 'template-parts/page-intermission.php'; ?>

    <?php include 'template-parts/page-game-over.php' ?>

</main>

<?php include 'footer.php' ?>
