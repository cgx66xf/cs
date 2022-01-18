/*

The Game Project 5 - Bring it all together

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

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
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
	trees_x= [100,300,600,1200,1600,2000,2150,2900,3100,3500,4000,4200,4400];

	collectables= [
		{x_pos: 200, y_pos: 400, size: 10, isFound: false},
		{x_pos: 400, y_pos: 400, size: 10, isFound: false},
		{x_pos: 1700, y_pos: 400, size: 10, isFound: false},
		{x_pos: 2100, y_pos: 400, size: 10, isFound: false},
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
		{x_pos: 400, y_pos: floorPos_y, size: 1},
		{x_pos: 700, y_pos: floorPos_y, size: 1},
		{x_pos: 1000, y_pos: floorPos_y, size: 1},
		{x_pos: 1300, y_pos: floorPos_y, size: 1},
		{x_pos: 2100, y_pos: floorPos_y, size: 1},
		{x_pos: 3000, y_pos: floorPos_y, size: 1},
		{x_pos: 4100, y_pos: floorPos_y, size: 1}];

	canyons= [
		{x_pos: 100, width: 150},
		{x_pos: 500, width: 150},
		{x_pos: 900, width: 150},
		{x_pos: 1400, width: 150},
		{x_pos: 2100, width: 150},
		{x_pos: 2400, width: 150},
		{x_pos: 3000, width: 150},
		{x_pos: 3400, width: 150}];

	
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
		}
		checkCollectable(collectables[i]);
	}

	pop();

	// Draw game character.
	
	drawGameChar();

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
		gameChar_y += 2;
		isFalling= true;
	}
	else
	{
		isFalling= false;
	}

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

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
			console.log("space bar is pressed")
		}
		else
		{
			console.log("space key is pressed but gameChar_y != floorPos_y")
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


// ------------------------------
// Game character render function
// ------------------------------

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

// ---------------------------
// Background render functions
// ---------------------------

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
		fill(150,113,23)
		triangle(mountains[i].x_pos,mountains[i].y_pos,mountains[i].x_pos+40,mountains[i].y_pos-50,mountains[i].x_pos+100,mountains[i].y_pos)
		triangle(mountains[i].x_pos+50,mountains[i].y_pos,mountains[i].x_pos+90,mountains[i].y_pos-50,mountains[i].x_pos+150,mountains[i].y_pos)
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


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
	fill(180,100,10);
	rect(t_canyon.x_pos,floorPos_y,t_canyon.width,145);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
	if(gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos + t_canyon.width && gameChar_y == floorPos_y)
	{
		console.log("You are plumetting");
		isPlummeting= true;
	}

}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

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
	if (dist(gameChar_world_x,gameChar_y, t_collectable.x_pos, t_collectable.y_pos) <= 70)
	{
		t_collectable.isFound= true;
		console.log("collectable.x_pos: "+ t_collectable.x_pos+ "is found gamecharx loc:"+ gameChar_x);
	}
}

