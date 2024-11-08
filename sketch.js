let sprite;
let floor;

function setup() {
	new Canvas(250, 250);
	world.gravity.y = 10;

	ball = new Sprite();
	ball.diameter = 25;
	ball.x = 45;
	ball.y = 30;

	floor = new Sprite();
	floor.y = 60;
	floor.x = 50;
	floor.w = 100;
	floor.h = 10;
	floor.collider = 'k';
	floor.rotation = 20;
	floor.velocity.y = -1;

	floor2 = new Sprite();
	floor2.y = 140;
	floor2.x = 160;
	floor2.w = 100;
	floor2.h = 10;
	floor2.collider = 'k';
	floor2.rotation = 150;
	floor2.velocity.y = -1;
	
	floor3 = new Sprite();
	floor3.y = 180;
	floor3.x = 50;
	floor3.w = 100;
	floor3.h = 10;
	floor3.collider = 'k';
	floor3.rotation = 5;
	
	wall = new Sprite();
	wall.y = 155;
	wall.x = 5;
	wall.w = 10;
	wall.h = 50;
	wall.collider = 'static';

	floor4 = new Sprite();
	floor4.y = 240;
	floor4.x = 120;
	floor4.w = 100;
	floor4.h = 10;
	floor4.collider = 'static';
	
	wall = new Sprite();
	wall.y = 220;
	wall.x = 175;
	wall.w = 10;
	wall.h = 50;
	wall.collider = 'static';
}

function draw() {
	clear();
}
