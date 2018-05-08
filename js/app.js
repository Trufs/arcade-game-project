// The Enemy function, which initiates the Enemy by:
	// Setting the Enemy initial location (you need to implement) *
	// Setting the Enemy speed (you need to implement) *
	// The update method for the Enemy Updates the Enemy location (you need to implement) *
	// Handles collision with the Player (you need to implement)
	// You can add your own Enemy methods as needed

//Handle Key Presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

const finished = document.querySelector('.congrats');
;
//Enemy class
class Enemy {
	constructor(x,y){
		this.sprite = 'images/enemy-bug.png';     // The image/sprite for enemies

    	this.location = {  //initial location
    		x: x,
    		y: y
    	}

    	this.speed = 50; // initial speed
	}

	render(){  // draw enemy on screen
		ctx.drawImage(Resources.get(this.sprite), this.location.x, this.location.y);

	}

	update(dt){ // Update the enemy's position

		if (this.location.x > 505){  // enemies come back after crossing the screen
			this.location.x = Math.random() * -300;
			this.location.y = Math.random() * 250;
		}

		this.location.x += this.speed*dt;  // this part makes enemies move
	}

	increaseSpeed(){  //increase speed after a level is won
		allEnemies.forEach(function(enemy) {
			enemy.speed += 10;
		});
	}

	checkCollisions(){  //handle collisions with the player
		if (this.location.x <= (player.x + 40) && this.location.x >= (player.x - 40) &&
			this.location.y <= (player.y + 40) && this.location.y >= (player.y - 40)){
			console.log('collision');
			player.resetPlayer(); //reset player position
		}
	}
}


//Player class
class Player {
	constructor(){
		this.sprite = 'images/char-pink-girl.png';  //player image
		this.x = 300;  //initial location
		this.y = 300;
	}

	render(){  //draws the player on canvas
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

	}

	update(){ // Update the player's position

		if (this.y <0){ // check if the player won
			this.winning();
		}
		else if (this.x > 400){ //prevent going offscreen
			this.x -= 100;
		}
		else if (this.x < 0){
			this.x += 100;
		}

		if (this.y > 400){ //prevent going offscreen
			this.y -= 83;
		}
		else if (this.y < -100){
			this.y += 83;
		}
	}

	handleInput(direction){ //allows user to control the hero
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

	resetPlayer(){  //reset to initial position
		this.x = 300;
		this.y = 300;
	}

	winning(){
		console.log('win');
		scoreboard.updateLevels();
		this.resetPlayer();
		enemy.increaseSpeed();
	}
}

class Scoreboard{
	constructor(){
		this.x = 10;
		this.y = 40;
		this.lvl = 1;
	}

	render(){
		ctx.font = '24px serif';
	    ctx.fillText(`Speed: ${this.lvl}`, this.x, this.y);
	}

	updateLevels(){
	    this.lvl++;
	}
}

var scoreboard = new Scoreboard();
const allEnemies = [];
	let x = Math.random() * -500;
	let y = Math.random() * 250;

	for (let i=0; i<3; i++){
		x = Math.random() * -300;
		y = Math.random() * 250;
		var enemy = new Enemy(x,y);
		allEnemies.push(enemy);

	}

	var player = new Player(); //initiate player
	player.render();  //render player





    // ^^^ You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

//PLAYER
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//  At minimum you should implement the following:
	// The Player function, which initiates the Player by:
		// Loading the image by setting this.sprite to the appropriate image in the image folder (use the code from the Enemy function as an example on how to do that) *
		// Setting the Player initial location *
	// The update method for the Player (can be similar to the one for the Enemy) *
	// The render method for the Player (use the code from the render method for the Enemy) *
	// The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular: *
	// Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down. *
	// Recall that the player cannot move off screen (so you will need to check for that and handle appropriately). *
	// If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).*
	// You can add your own Player methods as needed.
