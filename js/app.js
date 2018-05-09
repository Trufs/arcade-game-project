
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
		this.x=x;							 //x,y - coordinates of the enemy on canvas
		this.y=y;
    	this.speed = Math.floor(Math.random() * 100 + 50); // initial speed
	}

	render(){  // draw enemy on screen
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	update(dt){ // Update the enemy's position and speed
		if (this.x > 505){  // enemies come back after crossing the screen
			randomize(xValues);  //get random x,y values for the enemy
			this.x = x;
			this.y = y;
			this.speed = Math.floor(Math.random() * 200 + 50);
		}
		this.x += this.speed*dt;  // this part makes enemies move
	}

	increaseSpeed(){  //increase speed after a level is won
			this.speed += 10;
	}

	resetEnemy(){  //resets enemies after a level is won
			randomize(xValues);
			this.x = x;
			this.y = y;
	}

	checkCollisions(){  //handle collisions with the player
		if (this.x <= (player.x + 40) && this.x >= (player.x - 40) &&
			this.y <= (player.y + 40) && this.y >= (player.y - 40)){
			console.log('collision');
			scoreboard.decreaseGems();
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
		allEnemies.forEach(function(enemy) {
			enemy.increaseSpeed();
		});
		allEnemies.forEach(function(enemy) {
			enemy.resetEnemy();
		});
		allGems.forEach(function(gem) {
			gem.resetGems();
		});
	}
}


//Scoreboard class
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
	    ctx.fillText(`Level: ${this.lvl}`, this.x, this.y);
	    ctx.drawImage(Resources.get(this.sprite), 415, -20, 50, 70);
	    ctx.fillText(`${this.gems}`, 470, 40);
	}

	updateLevels(){
	    this.lvl++;
	}

	decreaseGems(){
		if (this.gems > 0){
			this.gems -= [1,2,3][Math.floor(Math.random() * 3)];  //decrease number of gems
		}
		if (this.gems < 0){  //prevent having negative gems
			this.gems = 0;
		}
	}

}


//Gem class
class Gem{
	constructor(x,y){
		this.sprite = 'images/gem-orange.png' ;  //gem image
		this.x = x;
		this.y = y;
		this.speed = 1550;
		this.found = false;
	}

	render(){
	    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 70);
	}

	update(dt){
		if(this.found === true && this.y >-70){
			this.y -= this.speed*dt;
		}
	}

	resetGems(){
			randomize(gemValues);
			this.x = x;
			this.y = y+80;
			this.found = false;
			checkGems(allGems);
	}

	checkCollisions(){  //handle collisions with the player
		if (this.x <= (player.x + 50) && this.x >= (player.x - 50) &&
			this.y <= (player.y + 100) && this.y >= (player.y - 5)){
			console.log('you found a gem');
			if(this.found === false){ //prevent adding the same gem twice
				this.found = true;
				scoreboard.gems++; //add gem to the scoreboard
			}
		}
	}
}


//variables needed for creating enemies and gems
let x, y, yChoser;
const allEnemies = [];
const allGems = [];
const xValues = [0, -80, -280, -380, -480, -580, -680, -780, -880];
const gemValues = [25, 125, 225, 325, 425];


//randomize x and y values for enemies and gems
function randomize(values){
		x = values[Math.floor(Math.random() * values.length)];
		yChoser = Math.random();
		yChoser<=0.33 ? y=43 : yChoser<=0.66 ? y = 126 : y = 205;
		return x, y;
}

//create enemies
(function makeEnemies(){
		for (let i=0; i<6; i++){
		randomize(xValues);
		var enemy = new Enemy(x,y);
		allEnemies.push(enemy);
	}
})();

//create gems
(function makeGems(){
		for (let i=0; i<3; i++){
			randomize(gemValues);
			var gem = new Gem(x,y+80);
			allGems.push(gem);
		}
		checkGems(allGems);
})();

//check if gems don't double in the same position
function checkGems(gemArray){
	console.log(gemArray[0].x, gemArray[0].y);
	console.log(gemArray[1].x, gemArray[1].y);
	console.log(gemArray[2].x, gemArray[2].y);

	for (let i=0; i<gemArray.length; i++){
		for(let j=i+1; j<gemArray.length; j++){
			if(gemArray[i].x === gemArray[j].x && gemArray[i].y === gemArray[j].y){
					console.log('trouble');
					randomize(gemValues);
					gemArray[j].x = x;
					gemArray[j].y = y+80;
					checkGems(allGems);
			}
		}
	}
}


//create other entities
var scoreboard = new Scoreboard(); //initiate scoreboard
var player = new Player(); //initiate player
