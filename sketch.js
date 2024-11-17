let player;
let bottomFloor;

function setup() {
	new Canvas(400, 600);
	world.gravity.y = 10;

	bottomFloor = new Sprite(200, 600, 400, 10, 'static');
	bottomFloor.color = 'green';

	player = new Sprite(200, 570, 50, 50, 'dynamic');
	player.rotationLock = true;

	platforms = new Group();

	for(let i = 0; i < 6; i++) {
		let platform = new platforms.Sprite();
		platform.w = 100;
		platform.h = 10;
		platform.x = random(0, 400);
		platform.y = i * 100;
		platform.collider = 'static';
		platform.color = 'gray';
	}
}

function draw() {
	clear();
	background(0);

	if (kb.pressing('left')) {
		player.x -= 5;
	} else if (kb.pressing('right')) {
		player.x += 5;
	}

	if (kb.presses('up') && player.colliding(bottomFloor) || kb.presses('up') && player.colliding(platforms)) {
		player.vel.y -= 7;
	}
}