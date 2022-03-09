/*
Game project submission of Taner Paker
I choosed sound as an extension because i had already built platforms and enemies during the lectures, from what i learned at the enemies lecture i used it to build an alien spaceship as a background object.
Most of the sounds i used are from the game Mario but i have also added a copyright-free sound aswell.
I got to play with html to load the p5.sound.js file and it was my first time touching html so it was quite exciting :)
What i found difficult about the sound extension is that i was going to add a game over sound but because of the startgame() function after the execution of the bit of code that make the sound play it would cause a loop and crash my computer.
I tried adding the .play() method after the start game function and before it so it doesnt make the sound cause a loop but all of my attempts were unsuccessfull so i couldnt implement a gameover sound when all lives are consumed.
Some of the functions have really long arguments ex:The triangles at drawMountain() i kept some of the functions as a one liner by choice to not scramble them into new lines.
*/
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var trees_x;
var clouds;
var mountains;
var collectables;
var canyons;
var game_score;
var flagpole;
var lives;

var jumpSound;
var fallSound;
var collectSound;
var winSound;
var aliens;
var platforms;


function preload()
{
	soundFormats('mp3');
	jumpSound= loadSound('assets/jumpsound.mp3');
	fallSound= loadSound('assets/fallsound.mp3');
	collectSound= loadSound('assets/collectsound.mp3');
	winSound= loadSound('assets/winsound.mp3');
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    lives= 3;
    startGame();
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

	push();
	translate(scrollPos, 0); 
  
	// Draw clouds.
	drawClouds();

	// Draw mountains.
	drawMountain();

	// Draw trees.
	drawTrees();

	// Draw canyons.
	for(var i= 0; i< canyons.length; i++)
	{
		drawCanyon(canyons[i]);
		checkCanyon(canyons[i]);
	}

	// Draw collectable items.
	for(var i= 0; i< collectables.length; i++)
	{
		if(collectables[i].isFound == false)
		{
			drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
		}
	}

	for(var i=0; i< aliens.length; i++)
	{
		aliens[i].draw();
	}

	for(i=0; i< platforms.length; i++){
		platforms[i].draw();
	}

    //Draw flagpole.
    drawflagpole();
    if(flagpole.isReached == false)
    {
        checkflagpole();
    }

	
    pop();

	// Draw game character.
	drawGameChar();

    //draw the score

    fill(255);
    noStroke();
    text("Score: "+ game_score, 20, 20);

    //lives
    checkPlayerDie();

    if(lives < 1)
    {
        textSize(30);
        text("GAME OVER!",width/2, height/2);
    }

    if(flagpole.isReached ==1)
    {
        textSize(30);
        text("Flag reached!", width/2, height/2);
		return;
    }


	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
	if(gameChar_y < floorPos_y )
	{
		var isContact= false;
		for(i= 0; i< platforms.length; i++){
			if(platforms[i].checkContact(gameChar_world_x, gameChar_y)){
				isContact= true;
				break;
			} 
		}
		if(isContact == false){
			gameChar_y += 2;
			isFalling= true;
		}
	}
	else
	{
		isFalling= false;
	}
	if(isPlummeting == true)
	{
		isFalling= false;
		gameChar_y += 10;
	}

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
	console.log(gameChar_world_x);
}


function keyPressed()
{

	if(keyCode == 37)
	{
		isLeft= true;
		console.log("left arrow pressed");
	}
	else if(keyCode == 39)
	{
		isRight= true;
		console.log("right arrow pressed");
	}
	else if(keyCode == 32)
	{
		if(gameChar_y == floorPos_y)
		{
			gameChar_y -= 100;
			console.log("space bar is pressed");
			//code to play jumpsound when jumped
			jumpSound.play();
		}
		else
		{
			console.log("space key is pressed but gameChar_y != floorPos_y");
		}
	}

}

function keyReleased()
{
	if(keyCode == 37)
	{
		isLeft= false;
		console.log("left arrow released");
	}
	else if(keyCode == 39)
	{
		isRight= false;
		console.log("right arrow released");
	}
}


// Function to draw the game character.

function drawGameChar()
{
	// draw game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
		fill(200);
		ellipse(gameChar_x,gameChar_y-17,35,40);
		ellipse(gameChar_x,gameChar_y-55,20,30);
		fill(0);
		ellipse(gameChar_x-4,gameChar_y-58,4,4);
		ellipse(gameChar_x+4,gameChar_y-58,4,4);
		ellipse(gameChar_x,gameChar_y-22,5,5);
		ellipse(gameChar_x,gameChar_y-13,5,5);
		fill(255,140,0);
		ellipse(gameChar_x,gameChar_y-50,4,4);
		fill(255,0,0);
		rect(gameChar_x-15,gameChar_y-40,30,10,10);
		rect(gameChar_x+10,gameChar_y-60,10,30,10);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
		fill(200);
		ellipse(gameChar_x,gameChar_y-17,35,40);
		ellipse(gameChar_x,gameChar_y-55,20,30);
		fill(0);
		ellipse(gameChar_x-4,gameChar_y-58,4,4);
		ellipse(gameChar_x+4,gameChar_y-58,4,4);
		ellipse(gameChar_x,gameChar_y-22,5,5);
		ellipse(gameChar_x,gameChar_y-13,5,5);
		fill(255,140,0);
		ellipse(gameChar_x,gameChar_y-50,4,4);
		fill(255,0,0);
		rect(gameChar_x-15,gameChar_y-40,30,10,10);
		rect(gameChar_x-20,gameChar_y-60,10,30,10);

	}
	else if(isLeft)
	{
		// add your walking left code
		fill(200);
		ellipse(gameChar_x,gameChar_y-17,35,40);
		ellipse(gameChar_x,gameChar_y-48,20,25);
		fill(0);
		ellipse(gameChar_x-4,gameChar_y-52,4,4);
		ellipse(gameChar_x+4,gameChar_y-52,4,4);
		ellipse(gameChar_x,gameChar_y-22,5,5);
		ellipse(gameChar_x,gameChar_y-13,5,5);
		fill(255,140,0);
		ellipse(gameChar_x,gameChar_y-46,4,4);
		fill(255,0,0);
		rect(gameChar_x-15,gameChar_y-40,30,10,10);
		rect(gameChar_x+5,gameChar_y-40,10,30,10);

	}
	else if(isRight)
	{
		// add your walking right code
		fill(200);
		ellipse(gameChar_x,gameChar_y-17,35,40);
		ellipse(gameChar_x,gameChar_y-48,20,25);
		fill(0);
		ellipse(gameChar_x-4,gameChar_y-52,4,4);
		ellipse(gameChar_x+4,gameChar_y-52,4,4);
		ellipse(gameChar_x,gameChar_y-22,5,5);
		ellipse(gameChar_x,gameChar_y-13,5,5);
		fill(255,140,0);
		ellipse(gameChar_x,gameChar_y-46,4,4);
		fill(255,0,0);
		rect(gameChar_x-15,gameChar_y-40,30,10,10);
		rect(gameChar_x-16,gameChar_y-40,10,30,10);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		fill(200);
		ellipse(gameChar_x,gameChar_y-17,40,40);
		ellipse(gameChar_x,gameChar_y-55,25,30);
		fill(0);
		ellipse(gameChar_x-4,gameChar_y-58,4,4);
		ellipse(gameChar_x+4,gameChar_y-58,4,4);
		ellipse(gameChar_x,gameChar_y-22,5,5);
		ellipse(gameChar_x,gameChar_y-13,5,5);
		fill(255,140,0);
		ellipse(gameChar_x,gameChar_y-50,4,4);
		fill(255,0,0);
		rect(gameChar_x-15,gameChar_y-40,30,10,10);
		rect(gameChar_x+10,gameChar_y-60,10,30,10);

	}
	else
	{
		// add your standing front facing code
		fill(200);
		ellipse(gameChar_x,gameChar_y-17,40,40);
		ellipse(gameChar_x,gameChar_y-48,25,25);
		fill(0);
		ellipse(gameChar_x-4,gameChar_y-52,4,4);
		ellipse(gameChar_x+4,gameChar_y-52,4,4);
		ellipse(gameChar_x,gameChar_y-22,5,5);
		ellipse(gameChar_x,gameChar_y-13,5,5);
		fill(255,140,0);
		ellipse(gameChar_x,gameChar_y-46,4,4);
		fill(255,0,0);
		rect(gameChar_x-15,gameChar_y-40,30,10,10);
		rect(gameChar_x+5,gameChar_y-40,10,30,10);


	}
}


// Function to draw cloud objects.
function drawClouds()
{
	for(var i= 0; i< clouds.length; i++)
	{
		fill(255);
		ellipse(clouds[i].x_pos,clouds[i].y_pos,14*clouds[i].size,8*clouds[i].size);
		fill(248);
		ellipse(clouds[i].x_pos+50,clouds[i].y_pos,14*clouds[i].size,9*clouds[i].size);
	}
}

// Function to draw mountains objects.
function drawMountain()
{
	for (var i= 0; i < mountains.length; i++)
	{
		fill(96,96,96);
		triangle(mountains[i].x_pos,mountains[i].y_pos,mountains[i].x_pos+40*mountains[i].size,mountains[i].y_pos-50*mountains[i].size,mountains[i].x_pos+100*mountains[i].size,mountains[i].y_pos);
		triangle(mountains[i].x_pos+50*mountains[i].size,mountains[i].y_pos,mountains[i].x_pos+90*mountains[i].size,mountains[i].y_pos-50*mountains[i].size,mountains[i].x_pos+150*mountains[i].size,mountains[i].y_pos);
		fill(200,200,200);
		triangle(mountains[i].x_pos+20*mountains[i].size,mountains[i].y_pos-25*mountains[i].size,mountains[i].x_pos+40*mountains[i].size,mountains[i].y_pos-50*mountains[i].size,mountains[i].x_pos+70*mountains[i].size,mountains[i].y_pos-25*mountains[i].size);
	}

}

// Function to draw trees objects.
function drawTrees()
{
	for (var i= 0; i< trees_x.length; i++)
	{
		fill(139,69,19);
		rect(trees_x[i], floorPos_y-60,40,60);
		fill(100,120,50);
		triangle(trees_x[i]-50,floorPos_y-55,trees_x[i]+20,floorPos_y-145,trees_x[i]+80,floorPos_y-55);
	}
}


// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
	fill(100, 155, 255);
	rect(t_canyon.x_pos,floorPos_y,t_canyon.width,145);
	fill(0, 155, 0);
	triangle(t_canyon.x_pos,floorPos_y,t_canyon.x_pos+15,floorPos_y+50,t_canyon.x_pos, floorPos_y+150);
	triangle(t_canyon.x_pos+t_canyon.width,floorPos_y,t_canyon.x_pos+t_canyon.width-15,floorPos_y+100,t_canyon.x_pos+t_canyon.width, floorPos_y+150);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
	if(gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_y == floorPos_y)
	{
		isPlummeting= true;
		fallSound.play('','','','',2);
		console.log("You are plumetting");
	}

}


// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
	fill(229,228,226);
	rect(t_collectable.x_pos,t_collectable.y_pos,7*t_collectable.size,4*t_collectable.size); 
	fill(255,215,0);
	rect(t_collectable.x_pos+1*t_collectable.size,t_collectable.y_pos+1/2*t_collectable.size,5*t_collectable.size,3*t_collectable.size,10);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
	if (dist(gameChar_world_x,gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size*7)
	{
		t_collectable.isFound= true;
		console.log("collectable.x_pos: "+ t_collectable.x_pos+ "is found gamecharx loc:"+ gameChar_x);
        game_score += 1;
		collectSound.play();
	}
}

function drawflagpole()
{
    if(flagpole.isReached == false)
    {
        fill(255);
        rect(flagpole.x_pos,floorPos_y-100, 15, 100);
        fill(255,0,0);
        rect(flagpole.x_pos,floorPos_y-150, 100, 50);
    }
    else if(flagpole.isReached == true)
    {
		fill(255);
        rect(flagpole.x_pos,floorPos_y-100, 15, 100);
        fill(0,255,0);
        rect(flagpole.x_pos,floorPos_y-125, 100, 50);

    }
}

function checkflagpole()
{
    if(dist(gameChar_world_x, gameChar_y, flagpole.x_pos, floorPos_y) < 70)
    {
        flagpole.isReached= true;
		//play winsound
		winSound.play();
    }
}

function checkPlayerDie()
{
    if(gameChar_y > floorPos_y + 500)
    {
        lives -= 1;
        console.log("lives: ", lives);
		//return to starting point
		gameChar_x = width/2;
		gameChar_y = floorPos_y;
		isPlummeting= 0;
		scrollPos = 0;
    }
    if(lives == 0)
    {
        startGame();
    }
    for(i=0; i <lives; i++)
    {
        fill(255,0,0);
        ellipse(width-130 + i*40, 20, 30, 30);
    }
}

function Alien(x, y, range)
{
	this.x= x;
	this.y= y;
	this.range= range;

	this.current_x= x;
	this.inc= 1;

	this.update= function(){
		this.current_x += this.inc;
		if(this.current_x >= this.x+ this.range){
			this.inc= -1;
		}
		
		else if(this.current_x < this.x){
			this.inc= +1;
		}
	}

	this.draw= function(){
		//this draws our alien spaceship note that this is a background object to make the scenery populated 
		this.update();
		fill(0,255,128);
		ellipse(this.current_x+50, this.y, 60, 60);
		fill(160,160,160);
		rect(this.current_x, this.y, 100,30);
		ellipse(this.current_x, this.y+ 15, 30, 30);
		ellipse(this.current_x+100, this.y+ 15, 30, 30);
		fill(255,255,51);
		ellipse(this.current_x+ 7.5,this.y+ 15, 15, 15);
		ellipse(this.current_x+ 50,this.y+ 15, 15, 15);
		ellipse(this.current_x+ 92.5,this.y+ 15, 15, 15);

	}

	this.checkContact= function(gc_x, gc_y){
		var d= dist(gc_x, gc_y, this.current_x, this.y)
		if(d< 20){
			return true;
		}
		return false;
	}
}

function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
	trees_x= [100,300,1100,131600,2000,2250,2900,3250,3650,4000,4200,4700];

	collectables= [
		{x_pos: 820, y_pos: 390, size: 10, isFound: false},
		{x_pos: 1700, y_pos: 400, size: 10, isFound: false},
		{x_pos: 2000, y_pos: 400, size: 10, isFound: false},
		{x_pos: 4000, y_pos: 400, size: 10, isFound: false},
		{x_pos: 2750, y_pos: 400, size: 10, isFound: false},
		{x_pos: 4800, y_pos: 400, size: 10, isfound: false}];

	clouds= [
		{x_pos: 200, y_pos: 100, size: 10},
		{x_pos: 600, y_pos: 100, size: 10},
		{x_pos: 800, y_pos: 100, size: 10},
		{x_pos: 1200, y_pos: 100, size: 10},
		{x_pos: 2000, y_pos: 100, size: 10},
		{x_pos: 2400, y_pos: 100, size: 10},
		{x_pos: 3100, y_pos: 100, size: 10}];

	
	mountains= [
		{x_pos: 100, y_pos: floorPos_y, size: 3},
		{x_pos: 1600, y_pos: floorPos_y, size: 3},
		{x_pos: 3600, y_pos: floorPos_y, size: 3},
		{x_pos: 4300, y_pos: floorPos_y, size: 3}];

	canyons= [
		{x_pos: 600, width: 150},
		{x_pos: 900, width: 150},
		{x_pos: 1400, width: 150},
		{x_pos: 2100, width: 150},
		{x_pos: 2400, width: 150},
		{x_pos: 3000, width: 150},
		{x_pos: 3400, width: 150}];

	aliens= [];
	aliens.push(new Alien(500, 150, 1000));

	platforms= [];
	platforms.push(createPlatforms(500, floorPos_y- 100, 200));

    game_score= 0;

    flagpole= {x_pos: 5000, isReached: false};


	function createPlatforms(x, y, length)
	{
		var p= {
			x: x,
			y: y,
			length: length,
			draw: function(){
				fill(255, 0, 255);
				rect(this.x, this.y, this.length, 20);
			},
			checkContact: function(gc_x, gc_y){
				if(gc_x > this.x && gc_x < this.x + this.length){
					var d= this.y- gc_y;
					if(d>= 0 && d< 5){
						return true;
					}
				}
				return false;
			}
		};
		return p;
	}

}
