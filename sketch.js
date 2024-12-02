/* Carlos Ramirez, Web Project
I used the p5play tool to create this program. I learned a lot about the tool like its colliders and all the different types there are.
I learned about their sprite function which allows for the creation of sprites and how to customize these sprites to my liking. 
I learned how to create groups which can store multiple sprites that are similar to each other like an array. In my program I applied 
many topics such as classes, constructors, methods, global variables, functions, loops and much more. */

/* defines a class called Player */
class Player {

	/* constructor: called when a new instance of the Player class is created
	initializes the players properties */
	constructor(x, y, width, height) {
		/* creates a new Sprite using the p5play Sprite constructor
		also uses the given x, y, coordinates and width, height dimensions
		and uses the dynamic collider type (will be affected by gravity) */
		this.sprite = new Sprite(x, y, width, height, 'dynamic');
		// stops sprite from rotating
		this.sprite.rotationLock = true;
		// sets sprite image to astronaut emoji
		this.sprite.image = '🧑‍🚀';
	}

	// sets sprite rate of motion when moving left to -5
	moveLeft() {
		this.sprite.x -= 5;
	}

	// sets sprite rate of motion when moving left to 5
	moveRight() {
		this.sprite.x += 5;
	}

	// sets sprite rate of motion when jumping by decreasing its vertical velocity by -7
	jump() {
		this.sprite.vel.y -= 7;
	}

	// checks if sprite is colliding with a platform
	isColliding(platform) {
		return this.sprite.colliding(platform);
	}
}

/* Global Variables */
let player; // variable for player object
let bottomFloor; // variable for bottomFloor sprite
let platforms; // variable for platforms group
let platformCounter = 0; // variable to count number of platforms reached
let stars; // variable for stars group

/* defines setup function */
function setup() {

	// creates the canvas with a width of 400 & and height of 600
	new Canvas(400, 600);

	// initializes the world gravity by 10
	world.gravity.y = 10;

	// creates a new sprite using the Sprite constructor for the bottom floor
	// bottomFloor uses the static collider type (can't be moved)
	bottomFloor = new Sprite(200, 600, 400, 10, 'static');
	bottomFloor.color = 'gray';

	// creates a Player object with variables for the x, y, width, & height
	//                   x    y   w   h
	player = new Player(200, 570, 50, 50);

	// creates a group for platform sprites
	platforms = new Group();
	
	// generates random x coordinate for the first platform
	let platformX = random(50, 350);

	// creates a group for the star sprites
	stars = new Group();

	// calls spawnStars function to spawn 50 stars within -600 to 600 (y coordinate)
	spawnStars(50, -600, 600);

	// calls spawnPlatforms function to spawn a platform at the randomly generated x coordinate
	spawnPlatforms(platformX);
}

/* defines draw function */
function draw() {

	// clears the canvas
	clear();
	// sets background color to black
	background(0);

	// ensures camera is off
	camera.off();

	// sets text size to 15 for the 'Platforms Reached' in the upper left corner
	textSize(15);
	// sets font color to white
	fill(255);
	// displays number of platforms reach at the xy coordinate 10, 20
	text('Platforms Reached: ' + platformCounter, 10, 20);

	// turns camera on
	camera.on();

	// the following code allows camera to follow player sprite
	camera.x = player.sprite.x; // sets cameras x position as players x position
	camera.y = player.sprite.y; // sets cameras y position as players y position

	// this for...of loop draws the stars from the stars group
	// important so the stars are drawn first before the player so they will appear behind the player
	for (let star of stars) { 
		star.draw(); 
	}

	/* if else statement to determine whether the player should move left or right depending on what arrow key
	is being pressed */
	if (kb.pressing('left')) {
		// calls player moveLeft method
		player.moveLeft();
	} else if (kb.pressing('right')) {
		// calls player moveRight method
		player.moveRight();
	}

	/* if statement which determines if the player is colliding with either the bottomFloor or the platforms from
	the platforms group and is pressing up then they will jump */
	if (kb.presses('up') && player.isColliding(bottomFloor) || kb.presses('up') && player.isColliding(platforms)) {
		// calls player jump method
		player.jump();
	}

	// if statement which checks if player has reached the newest platform
	if (player.sprite.y < platforms[platforms.length - 1].y && player.isColliding(platforms)) {
		// generates random number between 75-325 for platforms x coordinate
		let platformX = random(75, 325);
		// calls spawnPlatforms function
		spawnPlatforms(platformX);
		/* calls spawnStars function and uses 7, players y coordinate subtracted by 1200 & 600
		to determine the next set of stars spawn range */
		spawnStars(7, player.sprite.y - 1200, player.sprite.y - 600);
		// increments platformCounter by 1
		platformCounter++;
	}

	// if statement for when the sprites y coordinate is below 700
	if (player.sprite.y > 700) {
		// reloads the page
		location.reload();
	}
}

/* defines spawnPlatforms function which takes one parameter*/
function spawnPlatforms(platformX) {

	// creates a new sprite called platform which will be apart of the platforms group
	let platform = new platforms.Sprite();
	// initializes its width to 100
	platform.w = 100;
	// initializes its height to 10
	platform.h = 10;

	/* if statement which checks if the platform is within the players range and will adjust it to avoid it 
	from spawning directly above the player
	Math.abs() : returns the absolute value of a number
	platformX - player.sprite.x : calculates distance between platforms x coordinate and the players x coordinate
	< platform.w : checks if the horizontal distance is less than the width of the platform */
	if (Math.abs(platformX - player.sprite.x) < platform.w) { 
		// if statement which checks if platforms x coordinate is to the left of players x coordinate 
		if (platformX < player.sprite.x) { 
			// moves platform further to the left
			platformX -= platform.w; 
		} else { 
			// moves platform further to the right
			platformX += platform.w; 
		} 
	}

	// initializes platforms x coordinate as the argument passed through
	platform.x = platformX;
	// platform spawns 100 pixels higher than the players y position
	platform.y = player.sprite.y - 100;
	// platform uses the static collider type
	platform.collider = 'static';
	// sets platform color to be gray
	platform.color = 'gray';	
}

/* defines spawnStars function which takes three parameters
 count - number of stars to spawn
 minY - minimum y coordinate for spawning the stars (player.sprite.y - 1200)
 maxY - maximum y coordinate for spawning the stars (player.sprite.y - 600)*/
function spawnStars(count, minY, maxY) {

	// for loop which will iterate the amount of times count equals
	for (let i = 0; i < count; i++) {
		// creates a star sprite which will be apart of the stars group
		let star = new stars.Sprite();
		// stars width is randomized to a number between 5 & 20
		star.w = random(5, 20);
		// stars height is randomized to a number between 5 & 20
		star.h = random(5, 20);
		// stars collider type is initialized to none
		star.collider = 'none';
		// stars x coordinate will be set to a random number between -300 & 700
		star.x = random(-300, 700);
		// stars x coordinate will be set to a random number between the values of minY & maxY
		star.y = random(minY, maxY);
		// sets the star image to the star emoji
		star.image = '⭐';
	}
}
