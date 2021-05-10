<section class="intro-screen active">

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
            <button type="button" class="start-button" data-toggle="modal" data-target="#instructionalModal">Start Game</button>

            <!-- Modal -->
            <div class="modal instruct-modal fade" id="instructionalModal" tabindex="-1" role="dialog" aria-labelledby="instructionalModalTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content shadow-lg">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">How to Play</h5>
                        <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <!-- Modal Body -->
                    <div class="modal-body pt-4">

                        <div class="container-fluid">

                            <div class="row">

                                <div class="col-md-6">
                                    <div class="game-instructions">
                                        <img src="/assets/img/arrow-keys.png" alt="">

                                        <h4 class="pt-3 text-center">Move with the <strong>left</strong> and <strong>right</strong> arrow keys</h4>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="game-instructions">
                                        <img src="/assets/img/spacebar-key.png" alt="">

                                        <h4 class="pt-3 text-center">Shoot your laser with the <strong>spacebar</strong> key</h4>
                                    </div>

                                </div>

                                <div class="col-12">
                                    <div class="game-instructions">
                                        <img src="/assets/img/destroy-alien.png" alt="">

                                        <h4 class="pt-3 text-center">Defeat all the aliens to move on to the next <strong>LEVEL</strong></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="start-game start-button">Begin</button>
                    </div>

                    </div>
                </div>
            </div>

        </div>

    </div>

</section>