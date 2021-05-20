var lives = 3;
var gameState = "start"
var score = 0;
var count = 0;

function preload() {
  sky = loadImage("images/new background.jpg");
  play = loadImage("images/playButton.jpg");
  marioImg = loadImage("images/mario.png");
  mario2Img = loadImage("images/mario2.png");
  obstacleImg = loadImage("images/obstacle.png");
  restart = loadImage("images/restart.png");
  brickImg = loadImage("images/brick.png");
  groundImg = loadImage("images/ground2.png");
  coinImg = loadImage("images/coin.png");
 coinSound = loadSound("images/coin.wav");
 lifeImg = loadImage("images/life.png");
}

function setup() {
  createCanvas(600, 500);
  //creating the background
  wall = createSprite(300, 250, 600, 500);
  wall.addImage("sky", sky);
  ground = createSprite(300,460,600,20);
  ground.visible = false;
  mario = createSprite(20, 385, 20, 60);
  mario.addImage("marioImg", marioImg);
  life1 = createSprite(267, 15, 10, 10);
  life2 = createSprite(317, 15, 10, 10);
  life3 = createSprite(367, 15, 10, 10);
  life1.addImage("lifeImg",lifeImg);
  life2.addImage("lifeImg",lifeImg);
  life3.addImage("lifeImg",lifeImg);
  life1.scale = 0.1;
  life2.scale = 0.1;
  life3.scale = 0.1;
  obstaclesGroup = createGroup();
  coinsGroup = createGroup();
  button = createSprite(400, 350, 100, 60)
  button.addImage("play", play);
  button.scale = 0.3;
bricksGroup = createGroup();


  //Create the Bodies Here.
}


function draw() {
  background("black");
  createEdgeSprites();

mario.bounce(bricksGroup);

  //console.log(gameState);
  if (gameState == "start") {
    background("black");
    mario.visible = false;
    wall.visible = false;


    life1.visible = false;
    life2.visible = false;
    life3.visible = false;
    obstaclesGroup.setVisibleEach(false);
    fill("white");
    textSize(20);
    text(" Welcome to the Mario Game!", 70, 46);
    text("Click on the button below to start", 60, 80);

    if (mousePressedOver(button)) {
      gameState = "play";
    }
  }
  if (gameState == "play") {
    button.visible = false;
    mario.visible = true;
    life1.visible = true;
    life2.visible = true;
    life3.visible = true;
    obstaclesGroup.setVisibleEach(true);
    wall.visible = true;
    wall.velocityX = -2;

    //making infinitely scrolling background

    if (wall.x < 0) {
      wall.x = 400;
    }

    obstacles();
    spawnBricks();
    coins();
  }

  if(gameState == "end"){
    wall.velocityX = 0;
    obstaclesGroup.visible = true;
    obstaclesGroup.velocityX = 0;
    bricksGroup.visible = true;
    bricksGroup.velocityX = 0;
    mario.visible = true;
    button.visible = false;
  }
  
  if (keyDown(UP_ARROW)) {
    mario.velocityY = -9;
    mario.velocityX = 0;
  }
  mario.velocityY = mario.velocityY + 0.8;
  mario.collide(ground); 


  if (mario.isTouching(obstaclesGroup)) {
    lives = lives - 1;
    //  playSound("sound://category_pop/deep_bubble_notification.mp3");
    mario.x = 20;
    mario.y = 40;
  }

  if (lives == 2) {
    life1.destroy();
  }

  if (lives == 1) {
    life2.destroy();
  }

  if (lives == 0) {
    life3.destroy();
    gameState = "end";
  }

  if (wall.y < 0) {
    wall.y = 200;
  }
  for(var i = 0 ; i<coinsGroup.length ; i++){
    if(mario.isTouching(coinsGroup.get(i))){
      coinsGroup.get(i).destroy();
      score = score + 2;
      coinSound.play();
    }
  }
 
 

  drawSprites();

  // making the score
  textSize(20);
  fill("black");
  text("coins : "+score , 500,20);
}

function obstacles() {
  if (World.frameCount % 80 === 0) {
    var obstacle = createSprite(605, random(150,250), 20, 20);
    //obstacle.debug = true;
    obstacle.setCollider("rectangle", 0, 0, 10, 10);
    obstacle.addImage("obstacleImg", obstacleImg);
    obstacle.scale = 0.5;
    obstacle.velocityX = -4;
    obstaclesGroup.add(obstacle);

  }

}


function spawnBricks() {
  if (World.frameCount % 70 === 0) {
    var brick = createSprite(610, random(300, 500), 30, 30);
    brick.addImage("brickImg",brickImg);
    brick.velocityX = -2;

    bricksGroup.add(brick);
  }
}

function coins() {
  if (World.frameCount % 100 === 0) {
    var coin = createSprite(610, random(200, 400), 30, 30);
    coin.addImage("coinImg",coinImg);
    coin.velocityX = -2;
    coin.scale = 0.1;

    coinsGroup.add(coin);
    count = count + 1;
  }

}
    
  




