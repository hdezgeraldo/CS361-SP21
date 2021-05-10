var Player = function () {};

$(document).ready(function () {
    Player.prototype.initialize = function (squares) {
        this.squares = squares;
        this.playerIndex = 202;
        this.alive = true;
    };

    Player.prototype.getPlayerIndex = function () {
        return this.playerIndex;
    };
});
