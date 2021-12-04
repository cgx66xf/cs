/*
The Game Project
Week 3
Game interaction
*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	isLeft= false;
	isRight= false;
	isFalling= false;
	isPlummeting= false;
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon


	//the game character
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

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if(isLeft == true)
	{
		gameChar_x -= 5;
	}
	else if(isRight == true)
	{
		gameChar_x += 5;
	}

	//gravity
	if(gameChar_y < floorPos_y)
	{
		gameChar_y += 5;
	}

}


function keyPressed()
{
	// if statements to control the animation of the character when
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
		}
	}
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
}

function keyReleased()
{
	// if statements to control the animation of the character when
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

	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
}
