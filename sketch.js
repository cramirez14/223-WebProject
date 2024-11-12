let player;
let bottomFloor;

function setup() {
	new Canvas(400, 600);
	world.gravity.y = 10;

	bottomFloor = new Sprite(200, 600, 400, 10, 'static');

	player = new Sprite(200, 570, 50, 50, 'dynamic');
	player.rotationLock = true;
}

function draw() {
	clear();
	background(0);

	if (kb.pressing('left')) {
		player.x -= 5;
	} else if (kb.pressing('right')) {
		player.x += 5;
	}

	if (kb.pressed('up') && player.colliding(bottomFloor)) {
		player.vel.y -= 10;
	}
}