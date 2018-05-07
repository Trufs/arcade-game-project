// The Enemy function, which initiates the Enemy by:
	// Setting the Enemy initial location (you need to implement) *
	// Setting the Enemy speed (you need to implement)
	// The update method for the Enemy Updates the Enemy location (you need to implement) *
	// Handles collision with the Player (you need to implement)
	// You can add your own Enemy methods as needed

//HANDLE KEY PRESSES
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

class Enemy {
	constructor(x,y){
		this.sprite = 'images/enemy-bug.png';     // The image/sprite for our enemies, this uses a helper we've provided to easily load images

    	this.location = {
    		x: x,
    		y: y
    	}

    	this.speed = 100; // how many pixels the enemy will move between the frames
	}

	render(){
		ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);
	}

	update(dt){
		// Update the enemy's position  Parameter: dt, a time delta between ticks
		if (this.location.x > 505){
			this.location.x = 0;
		}

		this.location.x += this.speed*dt;
		this.render();
	}

	// checkCollisions(){
	// 	if (enemy.x === player.x && enemy.y === player.y){
	// 		console.log('collision');
	// 	}
	}
}


class Player {
	constructor(){
		this.sprite = 'images/char-pink-girl.png';
		this.x = 300;
		this.y = 300;
	}

	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	update(){
		// Update the player's position
		if (this.x > 400){
			this.x -= 100;
		}
		else if (this.x < 0){
			this.x += 100;

		}
		if (this.y > 400){
			this.y -= 83;
		}
		else if (this.y < -100){
			this.y += 83;
		}
	}

	handleInput(direction){
		let diff;
		console.log(direction);
		switch (direction){
			case 'left':
				this.x -= 100;
				break;
			case 'right':
				this.x += 100;
				break;
			case 'up':
				this.y -= 83;
				break;
			case 'down':
				this.y += 83;
				break;
		}

	}
}



const allEnemies = [];
let x = 30;
let y = 50;
for (let i=0; i<2; i++){
	var enemy = new Enemy(x,y);
	allEnemies.push(enemy);
	x += 50;
	y += 80;

}

var player = new Player();
player.render();


//^^^INITIALIZE  //initializing can probably be done with IIFEs?
// Once you have completed implementing the Player and Enemy, you should instantiate them by:
	// Creating a new Player object
	// Creating several new Enemies objects and placing them in an array called allEnemies
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



    // ^^^ You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

//PLAYER
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// You will need to implement the Player class, and you can use the Enemy class as an example on how to get started. At minimum you should implement the following:
	// The Player function, which initiates the Player by:
		// Loading the image by setting this.sprite to the appropriate image in the image folder (use the code from the Enemy function as an example on how to do that) *
		// Setting the Player initial location *
	// The update method for the Player (can be similar to the one for the Enemy) *
	// The render method for the Player (use the code from the render method for the Enemy) *
	// The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular: *
	// Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
	// Recall that the player cannot move off screen (so you will need to check for that and handle appropriately). *
	// If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
	// You can add your own Player methods as needed.