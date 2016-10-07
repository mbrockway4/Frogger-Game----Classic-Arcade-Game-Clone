// Enemies our player must avoid
var Enemy = function(xPos, yPos) {
    var speed = Math.floor(Math.random() * 500 + 100);
    this.x = xPos
    this.y = yPos
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
    Dead(this);
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
        player.x = player.x - player.delta;
    }
    if (keyPress == 'right') {
        player.x = player.x + this.delta;
    }
    if (keyPress == 'up') {
        player.y = player.y - this.delta;
    }
    if (keyPress == 'down') {
        player.y = player.y + this.delta;
    }
    checkBounds()
    player.update(player.x, player.y)
}

//Function to ensure player does not go out of bounds.  Also determines if game is won.
var checkBounds = function() {
    if (player.y >= 400) {
        player.y = 375;
    }
    if (player.y <= 0) {
        player.y = -25;
        console.log("Win ", wincount)
        wincount = wincount + 1;
        ctx.clearRect(0, 0, 200, 200);
        ctx.font = "30px Arial";
        ctx.fillText("You Win! - " + wincount, 10, 50);
        player = new Player(202.5, 375)
    }
    if (player.x >= 400) {
        player.x = 405;
    }
    if (player.x <= 0) {
        player.x = 1;
    }
}

//Function determines if player has collided with an Enemy object resulting in loss of game and reset of player
var Dead = function(enemy) {
        if (((player.x >= enemy.x - 50) && (player.x <= enemy.x + 50)) && ((player.y >= enemy.y - 40) && (player.y <= enemy.y + 40))) {
            ctx.clearRect(0, 0, 300, 300);
            console.log("collision ", player.x, player.y)
                //debugger;
            deadcount = deadcount + 1;
            ctx.font = "30px Arial";
            ctx.fillText("You Lose! - " + deadcount, 10, 50);
            console.log("Deaths ", deadcount)
            player = new Player(202.5, 375);
        }
    }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var speed = Math.floor(Math.random() * 400 + 300);
var allEnemies = [new Enemy(0, 140), new Enemy(0, 55)]
var player = new Player(202.5, 400)
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