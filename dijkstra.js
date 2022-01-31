var unvisited= [];
var vertex= [];


function setup()
{
	createCanvas(1000,800);
	background(245);
	fill(255);

	vertex= [
		{posX: 100, posY: 100, id: 'A', dist: null, prev: null}, 
		{posX: 300, posY: 100, id: 'B', dist: null, prev: null}, 
		{posX: 100, posY: 300, id: 'C', dist: null, prev: null}, 
		{posX: 300, posY: 300, id: 'D', dist: null, prev: null}, 
		{posX: 500, posY: 200, id: 'E', dist: null, prev: null}];

}

function draw()
{
	for(i= 0; i< vertex.length; i++)
	{
		textSize(40);
		fill(255);
		ellipse(vertex[i].posX, vertex[i].posY, 50, 50);
		fill(0);
		text(vertex[i].id, vertex[i].posX- 13, vertex[i].posY+ 10);
	}
	
}

// takes in a starting vertex and ending vertex returns the shortest path between them
function dijkstra()
{
	for(i= 0; i< vertex.length; i++)
	{
		unvisited.push(vertex[i].id);

		if(vertex[i].name == 'A')
		{
			vertex[i].dist= 0;

		}

		else if(vertex[i].name != 'A')
		{
			vertex[i].dist= null;
		}
	}
	while(unvisited.length > 0)
	{
		console.log(min(vertex.dist));
	}
}

dijkstra();
