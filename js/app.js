// Enemies our player must avoid
var Enemy = function(xPos, yPos) {
    var speed = Math.floor(Math.random() * 500 + 100);
    this.x = xPos;
    this.y = yPos;
    this.delta = speed;
    this.w = [xPos - 50, xPos + 50];
    this.h = [yPos + 100, yPos - 100];
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, x, y) {
    this.x += this.delta * dt;
    if (this.x >= 505) {
        this.x = 0;
        this.delta = Math.floor(Math.random() * 500 + 100);
    }
    this.Dead();
};

//Function determines if player has collided with an Enemy object resulting in loss of game and reset of player
Enemy.prototype.Dead = function() {
        if (((player.x >= this.x - 50) && (player.x <= this.x + 50)) && ((player.y >= this.y - 40) && (player.y <= this.y + 40))) {
            ctx.clearRect(0, 0, 300, 300);
            console.log("collision ", player.x, player.y);
                //debugger;
            deadcount = deadcount + 1;
            ctx.font = "30px Arial";
            ctx.fillText("You Lose! - " + deadcount, 10, 50);
            console.log("Deaths ", deadcount);
            player.x = 202.5;
            player.y = 375;
        }
    };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(Xpos, Ypos) {
    this.x = Xpos;
    this.y = Ypos;
    this.delta = 80;
    this.w = [Xpos - 50, Xpos + 50];
    this.h = [Ypos + 100, Ypos - 100];
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x = this.x - this.delta;
    }
    if (keyPress == 'right') {
        this.x = this.x + this.delta;
    }
    if (keyPress == 'up') {
        this.y = this.y - this.delta;
    }
    if (keyPress == 'down') {
        this.y = this.y + this.delta;
    }
    this.checkBounds();
    this.update(this.x, this.y);
};

//Function to ensure player does not go out of bounds.  Also determines if game is won.
Player.prototype.checkBounds = function() {
    if (this.y >= 400) {
        this.y = 375;
    }
    if (this.y <= 0) {
        this.y = -25;   
        wincount = wincount + 1;
        console.log("Win ", wincount);
        ctx.clearRect(0, 0, 200, 200);
        ctx.font = "30px Arial";
        ctx.fillText("You Win! - " + wincount, 10, 50);
        //reset game
        this.x = 202.5;
        this.y = 375;
    }
    if (this.x >= 400) {
        this.x = 405;
    }
    if (this.x <= 0) {
        this.x = 1;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var speed = Math.floor(Math.random() * 400 + 300);
var allEnemies = [new Enemy(0, 140), new Enemy(0, 55)];
var player = new Player(202.5, 400);
var wincount = 0;
var deadcount = 0;
// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});