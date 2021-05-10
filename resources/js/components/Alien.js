var Alien = function () {};

$(document).ready(function () {
    Alien.prototype.initialize = function () {
        this.direction = 1;
        this.goingRight = true;
        this.invadersID;
        this.invadersCoord = [];
    };

    Alien.prototype.resetAliens = function () {
        // Initialize Alien's position on grid
        for (let i = 0; i < 30; i++) {
            if (i > 9 && i < 20) {
                this.invadersCoord[i] = i + 5;
            } else if (i >= 20 && i < 30) {
                this.invadersCoord[i] = i + 10;
            } else {
                this.invadersCoord[i] = i;
            }
        }
    };
});
