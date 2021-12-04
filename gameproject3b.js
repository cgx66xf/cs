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
var collectable;


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
	collectable= {
		x_pos: 100,
		y_pos: floorPos_y-45,
		size: 10,
		isFound: false 
	};
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the collectable
	if (dist(gameChar_x,gameChar_y,collectable.x_pos,collectable.y_pos) <= 70)
	{
		collectable.isFound = true;
	}

	if(collectable.isFound == false)
	{
		fill(229,228,226);
		rect(collectable.x_pos,collectable.y_pos,7*collectable.size,4*collectable.size); 
		fill(255,215,0);
		rect(collectable.x_pos+1*collectable.size,collectable.y_pos+1/2*collectable.size,5*collectable.size,3*collectable.size,10);
	}
	//draw the canyon
	fill(180,100,10);
	rect(680,floorPos_y,150,145);


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
		gameChar_x -= 15;
	}
	else if(isRight == true)
	{
		gameChar_x += 15;
	}

	//gravity
	if(gameChar_y < floorPos_y)
	{
		gameChar_y += 2;
	}
	
	if(gameChar_x > 680 && gameChar_x < 830)
	{
		isPlummeting= true; 
	}
	else
	{
		isPlummeting= false;
	}

	if(isPlummeting == true)
	{
		gameChar_y +=5;
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
			console.log("space bar is pressed")
		}
		else
		{
			console.log("space key is pressed but gameChar_y != floorPos_y")
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

