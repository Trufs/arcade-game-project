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


//Enemy class
class Enemy {
	constructor(x,y){
		this.sprite = 'images/enemy-bug.png'; // The image/sprite for enemies
		this.x=x;
		this.y=y;
    	this.speed = 50; // initial speed
	}

	render(){  // draw enemy on screen
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	update(dt){ // Update the enemy's position
		if (this.x > 505){  // enemies come back after crossing the screen
			randomize(xValues);
			this.x = x;
			this.y = y;
		}
		this.x += this.speed*dt;  // this part makes enemies move
	}

	increaseSpeed(){  //increase speed after a level is won
		allEnemies.forEach(function(enemy) {
			enemy.speed += 10;
		});
	}

	resetEnemy(){
		allEnemies.forEach(function(enemy) {
			randomize(xValues);
			enemy.x = x;
			enemy.y = y;
		});
	}

	checkCollisions(){  //handle collisions with the player
		if (this.x <= (player.x + 40) && this.x >= (player.x - 40) &&
			this.y <= (player.y + 40) && this.y >= (player.y - 40)){
			console.log('collision');
			player.resetPlayer(); //reset player position
		}
	}
}

//Player class
class Player {
	constructor(){
		this.sprite = 'images/char-pink-girl.png';  //character image
		this.x = 100;  //initial location
		this.y = 300;
	}

	render(){  //draws the player on canvas
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	update(){ // Update the player's position

		if (this.y <0){ // check if the player won
			this.winning();
		}
		else if (this.x > 400){ //prevent going offscreen horizontally
			this.x -= 100;
		}
		else if (this.x < 0){
			this.x += 100;
		}

		if (this.y > 400){ //prevent going offscreen vertically
			this.y -= 83;
		}
		else if (this.y < -100){
			this.y += 83;
		}
	}

	handleInput(direction){ //allows user to control the character
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
		this.x = 100;
		this.y = 300;
	}

	winning(){ //
		scoreboard.updateLevels();
		this.resetPlayer();
		enemy.increaseSpeed();
		enemy.resetEnemy();
		gem.resetGems();
	}
}

class Scoreboard{
	constructor(){
		this.x = 10;
		this.y = 40;
		this.lvl = 1;
		this.gems = 0;
		this.sprite = 'images/gem-orange.png';
	}

	render(){
		ctx.font = '24px serif';
	    ctx.fillText(`Speed: ${this.lvl}`, this.x, this.y);
	    ctx.drawImage(Resources.get(this.sprite), 420, -20, 50, 70);
	    ctx.fillText(`${this.gems}`, 475, 40);
	}

	updateLevels(){
	    this.lvl++;
	}

	updateGems(){
		 allGems.forEach(function(gem) {  //loops through all of the objects within your allEnemies array                                             // as defined in app.js and calls their update() methods.
            if(gem.y<=0&&gem.y>-3){
            	scoreboard.gems++;
            }


        });

	}
}

class Gem{
	constructor(x,y){
		this.sprite = 'images/gem-orange.png' ;  //gem image
		this.x = x;
		this.y = y;
		this.speed = 150;
		this.found = false;
	}

	render(){
	    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 70);

	}

	update(dt){
		if(this.found === true && this.y >-100){
			this.y -= this.speed*dt;
		}
	}

	resetGems(){
		allGems.forEach(function(gem) {
			randomize(gemValues);
			gem.x = x;
			gem.y = y+80;
			gem.found = false;
		});
	}

	checkCollisions(){  //handle collisions with the player
		if (this.x <= (player.x + 50) && this.x >= (player.x - 50) &&
			this.y <= (player.y + 100) && this.y >= (player.y - 5)){
			console.log('you found a gem');
			this.found = true;
			scoreboard.updateGems(); //add gem to the scoreboard

		}
	}
}


	var scoreboard = new Scoreboard();
	const allEnemies = [];
	let x, y, yChoser;
	let xValues = [0, -80, -280, -380, -480, -580];
	let gemValues = [25, 125, 225, 325, 425];


	for (let i=0; i<6; i++){
		randomize(xValues);
		var enemy = new Enemy(x,y);
		allEnemies.push(enemy);
	}

function randomize(values){
		x = values[Math.floor(Math.random() * values.length)];
		yChoser = Math.random();
		yChoser<=0.33 ? y=43 : yChoser<=0.66 ? y = 126 : y = 205;
		return x, y;
}

	const allGems = [];
	for (let i=0; i<3; i++){
		randomize(gemValues);
		var gem = new Gem(x,y+80);
		allGems.push(gem);
	}



	var player = new Player(); //initiate player







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
