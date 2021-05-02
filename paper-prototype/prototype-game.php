<?php include '../header.php'; ?>

<main class="prototype d-flex-centering" style="background-image:url('/assets/img/bg.jpg');">

    <section class="intro-screen">

        <div class="container d-flex-centering">

            <div class="row d-flex flex-column align-items-center">

                <h3 class="text-white pb-5">Welcome to</h3>

                <h1 class="text-center">
                    <i class="d-block pb-4 fas fa-alien-monster"></i>
                    Alien
                    </br>
                    Invaders
                </h1>

                <h3 class="text-white text-center pt-5 pb-5">A Space Invaders inspired game that faces you off with aliens from three different alien invasion movies</h3>

                <!-- Button trigger modal -->
                <button type="button" class="start-button" data-toggle="modal" data-target="#instructionalModal">
                    <h3>Start Game</h3>
                </button>

                <!-- Modal -->
                <div class="modal instruct-modal fade" id="instructionalModal" tabindex="-1" role="dialog" aria-labelledby="instructionalModalTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content shadow-lg">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">How to Play</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Begin</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </section>

</main>

<?php include '../footer.php'; ?>