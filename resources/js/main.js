// @codekit-prepend "components/Alien.js"
// @codekit-prepend "components/Player.js";
// @codekit-prepend "components/GameEngine.js";

$(document).ready(function () {
    // Initialize WOW
    new WOW().init();

    // Element Selector
    const grid = $(".grid");
    const screens = $("main.prototype").children();

    $(".start-game").click(() => {
        // Hide Start Screen
        screens.eq(0).toggleClass("active");
        $(".modal-backdrop").css("display", "none");

        // Show Game Play Screen
        screens.eq(1).toggleClass("active");

        // Initialize Game with Aliens and Shooter
        let alienEngine = new GameEngine();
        alienEngine.initialize(grid);

        // Start Game
        alienEngine.startGame();
    });

    // Switch Screens
    $(".next-button").click(() => {
        screens.eq(1).toggleClass("active");

        screens.eq(2).toggleClass("active");
    });

    // Return Home
    $(".home-button").click(() => {
        location.reload();
    });
});
