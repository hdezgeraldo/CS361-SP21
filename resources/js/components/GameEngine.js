var GameEngine = function () {};

$(document).ready(function () {
    /*----------------------------------------------------------------
     * Initialize/Construction method - Initializes state of the game
     *
     * @param grid: A handle to the HTML grid element in which we render
     *
     * @return GameEngine: Returns itself
     *---------------------------------------------------------------*/
    GameEngine.prototype.initialize = function (grid) {
        // Game Status Flags
        this.gameOver = false;
        this.aliensDefeated = false;
        this.grid = grid;
        this.gridWidth = 15;
        this.currentLevel = 0;
        this.score = 0;
        this.aliensRemoved = [];
        this.currentScreen = "start";
        this.screens = $("main.prototype").children();

        // Create Grid
        for (let i = 0; i < 225; i++) {
            this.grid.append("<div class='square'></div>");
        }

        // Create array from generated grid to track all items on grid
        this.squares = Array.from($(".grid .square"));

        // Create Aliens
        this.aliens = new Alien();
        this.aliens.initialize();
        this.aliens.resetAliens();
        this.drawInvaders();

        // Create Player
        this.player = new Player();
        this.player.initialize();
        this.addPlayer();
    };

    /*----------------------------------------------------------------
     * Update function: This function is the main loop of the game.
     *
     *---------------------------------------------------------------*/
    GameEngine.prototype.update = function () {
        if (this.player.alive && this.currentLevel < 3) {
            // Anytime key is pressed during gameplay
            $(document).keydown((e) => {
                this.movePlayer(e);
            });

            this.startInvaders();

            // Switch levels
            $(".intermission-button").click(() => {
                // Check current level and start AJAX call
                this.switchLevels(this.currentLevel);

                // Hide Game Screen
                this.screens.eq(1).toggleClass("active");

                // Show Intermission Screen
                this.screens.eq(2).fadeIn(750).toggleClass("active");
            });

            // Start Next Round
            $(".next-lvl-button").click(() => {
                // Reset Game
                this.resetGame();

                // Show Game Screen
                this.screens.eq(1).toggleClass("active");
                this.startInvaders();

                // Hide Intermission Screen
                this.screens.eq(2).toggleClass("active");
                this.screens.eq(2).css("display", "none");
            });

            // Shoot Laser
            $(document).keydown((e) => {
                this.shootLaser(e);
            });
        }
    };

    GameEngine.prototype.drawInvaders = function () {
        // this.squares = squares;
        this.aliens.invadersCoord;

        for (let i = 0; i < this.aliens.invadersCoord.length; i++) {
            if (!this.aliensRemoved.includes(i)) {
                this.squares[this.aliens.invadersCoord[i]].classList.add(
                    "invader"
                );
                this.squares[this.aliens.invadersCoord[i]].innerHTML =
                    "<i class='fas fa-alien-monster'></i>";
            }
        }
    };

    GameEngine.prototype.addPlayer = function () {
        let playerIndex = this.player.playerIndex;

        this.squares[playerIndex].classList.add("player");
        this.squares[playerIndex].innerHTML =
            "<i class='fas fa-starfighter'></i>";
    };

    GameEngine.prototype.movePlayer = function (e) {
        // remove player before moving
        this.squares[this.player.playerIndex].classList.remove("player");

        // interpret movement based on key selection using <- and -> keys
        switch (e.key) {
            case "ArrowLeft":
                if (this.player.playerIndex % this.gridWidth !== 0)
                    this.player.playerIndex -= 1;
                break;

            case "ArrowRight":
                if (
                    this.player.playerIndex % this.gridWidth <
                    this.gridWidth - 1
                )
                    this.player.playerIndex += 1;
                break;
        }

        // update player position on grid
        this.squares[this.player.playerIndex].classList.add("player");
        this.squares[this.player.playerIndex].innerHTML =
            "<i class='fas fa-starfighter'></i>";
    };

    GameEngine.prototype.removeInvaders = function () {
        for (let i = 0; i < this.aliens.invadersCoord.length; i++) {
            this.squares[this.aliens.invadersCoord[i]].classList.remove(
                "invader"
            );
        }
    };

    GameEngine.prototype.startInvaders = function () {
        // Move aliens
        this.aliens.invadersID = setInterval(() => {
            this.moveInvaders();

            // If aliens destroy player
            if (!this.getPlayerLife()) {
                // Hide Game Screen
                this.screens.eq(1).toggleClass("active");

                // Show Game Over Screen
                this.screens.eq(3).toggleClass("active");
            }

            if (this.aliensDefeated) {
                $(".intermission-button").css("display", "inline-block");
            }
        }, 500);
    };

    GameEngine.prototype.moveInvaders = function () {
        const leftEdge = this.aliens.invadersCoord[0] % this.gridWidth === 0;
        const rightEdge =
            this.aliens.invadersCoord[this.aliens.invadersCoord.length - 1] %
                this.gridWidth ===
            this.gridWidth - 1;

        this.removeInvaders();

        if (rightEdge && this.aliens.goingRight) {
            for (let i = 0; i < this.aliens.invadersCoord.length; i++) {
                this.aliens.invadersCoord[i] += this.gridWidth + 1;
                this.aliens.direction = -1;
                this.aliens.goingRight = false;
            }
        }

        if (leftEdge && !this.aliens.goingRight) {
            for (let i = 0; i < this.aliens.invadersCoord.length; i++) {
                this.aliens.invadersCoord[i] += this.gridWidth - 1;
                this.aliens.direction = 1;
                this.aliens.goingRight = true;
            }
        }

        for (let i = 0; i < this.aliens.invadersCoord.length; i++) {
            this.aliens.invadersCoord[i] += this.aliens.direction;
        }

        this.drawInvaders();

        // You lose the game
        if (
            this.squares[this.player.playerIndex].classList.contains(
                "invader",
                "player"
            )
        ) {
            this.player.alive = false;
            clearInterval(this.aliens.invadersID);
        }

        // If aliens reach end of grid
        // ** NEED TO DEBUG THIS **
        for (let i = 0; i < this.aliens.invadersCoord.length; i++) {
            if (this.aliens.invadersCoord[i] > this.squares.length) {
                this.player.alive = false;
                clearInterval(this.aliens.invadersID);
            }
        }

        // If you eliminate all aliens
        if (this.aliensRemoved.length === this.aliens.invadersCoord.length) {
            this.aliensDefeated = true;
            this.currentLevel++;
            clearInterval(this.aliens.invadersID);
        }
    };

    GameEngine.prototype.shootLaser = function (e) {
        let laserID;
        let currentLaserIndex = this.player.playerIndex;
        const resultDisplay = $(".results");

        const moveLaser = () => {
            this.squares[currentLaserIndex].classList.remove("laser");
            currentLaserIndex -= this.gridWidth;

            if (currentLaserIndex >= 0) {
                this.squares[currentLaserIndex].classList.add("laser");
                this.squares[currentLaserIndex].innerHTML =
                    "<i class='fas fa-grip-lines-vertical'></i>";

                if (
                    this.squares[currentLaserIndex].classList.contains(
                        "invader"
                    )
                ) {
                    this.score++;
                    resultDisplay.text(this.score);
                    this.squares[currentLaserIndex].classList.remove("laser");
                    this.squares[currentLaserIndex].classList.remove("invader");

                    this.squares[currentLaserIndex].classList.add("boom");
                    this.squares[currentLaserIndex].innerHTML =
                        "<i class='fad fa-badge'></i>";

                    setTimeout(
                        () =>
                            this.squares[currentLaserIndex].classList.remove(
                                "boom"
                            ),
                        100
                    );
                    clearInterval(laserID);
                    const alienRemoval =
                        this.aliens.invadersCoord.indexOf(currentLaserIndex);
                    this.aliensRemoved.push(alienRemoval);
                }
            } else {
                clearInterval(laserID);
            }
        };

        switch (e.keyCode) {
            case 32:
                laserID = setInterval(() => {
                    moveLaser();
                }, 100);
        }
    };

    GameEngine.prototype.run = function () {
        if (!this.gameOver) {
            this.update();
        }
    };

    /*----------------------------------------------------------------
     * Switch method to control how game makes changes to a given level
     * using AJAX to three different Wiki Scrapper API services.
     *
     * @param level: current level of the game
     *---------------------------------------------------------------*/
    GameEngine.prototype.switchLevels = function (level) {
        // do stuff
        switch (level) {
            // Level (1): War of the Worlds
            case 1:
                // wiki image scrapper service
                $.ajax({
                    type: "GET",
                    url: "https://mypyimagescrapper.ue.r.appspot.com/image-scrapper",
                    data: {
                        url: "https://en.wikipedia.org/wiki/War_of_the_Worlds_(2005_film)"
                    },
                    dataType: "json",
                    success: function (data) {
                        // grab image value
                        var imageURL = Object.values(data);

                        // populate data inside element
                        $(".ajax-image").attr("src", imageURL[0]);

                        // Update title
                        $(".ajax-title").text("War of the Worlds");

                        // Update level
                        $(".ajax-lvl-number").text(level);

                        // Update Lists (will wait for teammate)
                        $(".starring-list").html(
                            "<li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li>"
                        );
                    }
                });

                // wiki text scrapper service
                $.ajax({
                    type: "GET",
                    url: "https://cs361-text-scraper-chenall.wl.r.appspot.com/data/",
                    data: {
                        url: "https://en.wikipedia.org/wiki/War_of_the_Worlds_(2005_film)"
                    },
                    dataType: "json",
                    crossDomain: true,
                    success: function (data) {
                        var serverResponse = data;
                        var introText = "";

                        for (const prop1 in serverResponse) {
                            var arrResponse = serverResponse[prop1];

                            for (const prop2 in arrResponse[0]) {
                                if (prop2 == "content") {
                                    introText = arrResponse[0][prop2];
                                }
                            }
                        }

                        // grab image value
                        $(".ajax-intro").text(introText);
                    }
                });

                // wiki list scrapper service
                $.ajax({
                    type: "POST",
                    url: "https://list-scraper.ue.r.appspot.com/?url=https://en.wikipedia.org/wiki/War_of_the_Worlds_(2005_film)",
                    data: {
                        url: "https://en.wikipedia.org/wiki/War_of_the_Worlds_(2005_film)"
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                    }
                });

                break;

            // Level (2): Independence Day
            case 2:
                // wiki image scrapper service
                $.ajax({
                    type: "GET",
                    url: "https://mypyimagescrapper.ue.r.appspot.com/image-scrapper",
                    data: {
                        url: "https://en.wikipedia.org/wiki/Independence_Day_(1996_film)"
                    },
                    dataType: "json",
                    success: function (data) {
                        // grab image value
                        var imageURL = Object.values(data);

                        // populate data inside element
                        $(".ajax-image").attr("src", imageURL[0]);

                        // Update title
                        $(".ajax-title").text("Independence Day");

                        // Update level
                        $(".ajax-lvl-number").text(level);

                        // Update Lists (will wait for teammate)
                        $(".starring-list").html(
                            "<li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li>"
                        );
                    }
                });

                // wiki text scrapper service
                $.ajax({
                    type: "POST",
                    url: "https://cs361-text-scraper-chenall.wl.r.appspot.com/data/",
                    data: {
                        url: "https://en.wikipedia.org/wiki/Independence_Day_(1996_film)"
                    },
                    dataType: "json",
                    crossDomain: true,
                    success: function (data) {
                        var serverResponse = data;
                        var introText = "";

                        for (const prop1 in serverResponse) {
                            var arrResponse = serverResponse[prop1];

                            for (const prop2 in arrResponse[0]) {
                                if (prop2 == "content") {
                                    introText = arrResponse[0][prop2];
                                }
                            }
                        }

                        // grab image value
                        $(".ajax-intro").text(introText);
                    }
                });
                break;

            // Level (3): Live, Die, Repeat
            case 3:
                // wiki image scrapper service
                $.ajax({
                    type: "GET",
                    url: "https://mypyimagescrapper.ue.r.appspot.com/image-scrapper",
                    data: {
                        url: "https://en.wikipedia.org/wiki/Edge_of_Tomorrow"
                    },
                    dataType: "json",
                    success: function (data) {
                        // grab image value
                        var imageURL = Object.values(data);

                        // populate data inside element
                        $(".ajax-image").attr("src", imageURL[0]);

                        // Update title
                        $(".ajax-title").text("Live, Die, Repeat");

                        // Update level
                        $(".ajax-lvl-number").text(level);

                        // Update Lists (will wait for teammate)
                        $(".starring-list").html(
                            "<li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li><li class='list-unstyled'><i class='fas fa-film'></i>Tom Cruise</li>"
                        );
                    }
                });

                // wiki text scrapper service
                $.ajax({
                    type: "POST",
                    url: "https://cs361-text-scraper-chenall.wl.r.appspot.com/data/",
                    data: {
                        url: "https://en.wikipedia.org/wiki/Edge_of_Tomorrow"
                    },
                    dataType: "json",
                    crossDomain: true,
                    success: function (data) {
                        var serverResponse = data;
                        var introText = "";

                        for (const prop1 in serverResponse) {
                            var arrResponse = serverResponse[prop1];

                            for (const prop2 in arrResponse[0]) {
                                if (prop2 == "content") {
                                    introText = arrResponse[0][prop2];
                                }
                            }
                        }

                        // grab image value
                        $(".ajax-intro").text(introText);
                    }
                });
                break;
        }
    };

    GameEngine.prototype.resetGame = function () {
        // reset game variables
        this.gameOver = false;
        this.aliensDefeated = false;
        this.aliensRemoved = [];
        this.currentScreen = "start";

        // hide button
        $(".intermission-button").css("display", "none");

        // reset score
        this.score = 0;
        $(".results").text(0);

        // Remove all invaders and aliens from the grid
        for (let i = 0; i < 225; i++) {
            this.squares[i].classList.remove("invader");
            this.squares[i].classList.remove("player");
        }

        this.aliens.resetAliens();
        this.drawInvaders();

        this.player.initialize();
        this.addPlayer();
    };

    GameEngine.prototype.startGame = function () {
        this.run();
    };

    GameEngine.prototype.getPlayerLife = function () {
        return this.player.alive;
    };
});
