
class Player {
	constructor(x, y, width, height) {
		this.sprite = new Sprite(x, y, width, height, 'dynamic');
		this.sprite.rotationLock = true;
		this.sprite.image = '🧑‍🚀';
	}

	moveLeft() {
		this.sprite.x -= 5;
	}

	moveRight() {
		this.sprite.x += 5;
	}

	jump() {
		this.sprite.vel.y -= 7;
	}

	isColliding(platform) {
		return this.sprite.colliding(platform);
	}
}

let player;
let bottomFloor;
let platforms;
let platformCounter = 0;
let stars;

function setup() {
	new Canvas(400, 600);

	world.gravity.y = 10;

	bottomFloor = new Sprite(200, 600, 400, 10, 'static');
	bottomFloor.color = 'gray';

	player = new Player(200, 570, 50, 50);

	platforms = new Group();
	
	let platformX = random(50, 350);

	stars = new Group();

	spawnStars(50, -600, 600);

	spawnPlatforms(platformX);
	
}

function draw() {
	clear();
	background(0);

	camera.off();
	textSize(15);
	fill(255);
	text('Platforms Reached: ' + platformCounter, 10, 20);
	camera.on();
	camera.x = player.sprite.x;
	camera.y = player.sprite.y;

	for (let star of stars) { 
		star.draw(); 
	}

	player.image = '🧑‍🚀';

	if (kb.pressing('left')) {
		player.moveLeft();
	} else if (kb.pressing('right')) {
		player.moveRight();
	}

	if (kb.presses('up') && player.isColliding(bottomFloor) || kb.presses('up') && player.isColliding(platforms)) {
		player.jump();
	}

	if (player.sprite.y < platforms[platforms.length - 1].y && player.isColliding(platforms)) {
		let platformX = random(75, 325);
		spawnPlatforms(platformX);
		spawnStars(7, player.sprite.y - 1200, player.sprite.y - 600);
		platformCounter++;
	}

	if (player.sprite.y > 700) {
		location.reload();
	}
}

function spawnPlatforms(platformX) {
	let platform = new platforms.Sprite();
	platform.w = 100;
	platform.h = 10;

	if (Math.abs(platformX - player.sprite.x) < platform.w) { 
		// Adjust the platformX to be outside the player's width range 
		if (platformX < player.sprite.x) { 
			platformX -= platform.w; 
		} else { 
			platformX += platform.w; 
		} 
	}

	platform.x = platformX;
	// platform spawns 100 pixels higher than the players y position
	platform.y = player.sprite.y - 100;
	platform.collider = 'static';
	platform.color = 'gray';	
}

function spawnStars(count, minY, maxY) {
	for (let i = 0; i < count; i++) {
		let star = new stars.Sprite();
		star.w = random(5, 20);
		star.h = random(5, 20);
		star.collider = 'none';
		star.x = random(-300, 700);
		star.y = random(minY, maxY);
		// star.y = player.y - random(300, 600);
		star.image = '⭐';
	}
}
