var rocket,rocketImg
var fire,pipe,ice,topP
var sky,backgroundImg

var topGroup,bottomGroup,coinsGroup;
var coin,coinImg

var playButton,playImg
var resetButton,resetImg
var start = 1;
var play  = 2;
var end = 0
var gameState = start;

var score;


function preload(){
backgroundImg = loadImage("images/sky.png");
 rocketImg = loadImage("images/rocket.png");
 //fire = loadImage("images/fire.png");
 pipe = loadImage("images/pipe.png");
 //ice = loadImage("images/ice.png");
 topP = loadImage("images/topPipe.png");
 playImg = loadImage("images/play.png");

 coinImg = loadImage("images/coin.png")

 resetImg = loadImage("images/reset.png");

}

function setup(){
createCanvas(displayWidth,displayHeight-140)

bg = createSprite(0,displayHeight/2,displayWidth,displayHeight-140)
bg.addImage(backgroundImg);
bg.scale = 6.5;
bg.x = displayWidth/2


rocket = createSprite(150,350,20,50);
rocket.scale = 0.55
rocket.addImage(rocketImg);
rocket.debug  = true;
rocket.setCollider("rectangle", 0,0,300,300)
playButton = createSprite(displayWidth/2,displayHeight/2)
playButton.addImage(playImg);



topGroup = new Group();
bottomGroup = new Group();
coinsGroup = new Group();

score = 0;

}

function draw(){
background("white")


if(gameState  === start){


  playButton.visible = true;
  rocket.velocityY  = 0;
  bg.velocityX  = 0;

  if(mousePressedOver(playButton)){

    gameState  = play;
  }

}

 else if(gameState===play){
  score = score + Math.round(getFrameRate()/60);
  bg.velocityX = -2
  if (keyDown("space")){
    rocket.velocityY = -18;
  }

if(bg.x<0){
  bg.x = displayWidth/2
}


  rocket.velocityY = rocket.velocityY + 0.8
  topPipe();
bottomPipe();
spawnCoins();
playButton.visible = false;

if(rocket.isTouching(topGroup)||rocket.isTouching(bottomGroup)){
  gameState = end;
 // rocket.visible = false;
  }

}
 else if(gameState===end){
//playButton.visible = true;
resetButton = createSprite(displayWidth/2,displayHeight/2)
resetButton.addImage(resetImg);
resetButton.scale = 0.5;
 }


  

  

  console.log(displayWidth);

 drawSprites();
 
  text("Score: "+ score, 500,50);

}

function topPipe(){
  if(frameCount % 150 === 0){
    obstacle = createSprite(displayWidth,100);
    obstacle.velocityX = -4
    obstacle.addImage(topP);
    obstacle.scale = 0.8
    obstacle.lifetime = displayWidth/4;
    obstacle.debug  = true

   topGroup.add(obstacle);

   obstacle.setCollider("rectangle",0,0,50,200)

  }

}

function bottomPipe(){
  if(frameCount % 175 === 0){
    bObstacle = createSprite(displayWidth,600);
    bObstacle.velocityX = -4
    bObstacle.addImage(pipe);
    bObstacle.scale = 0.8
    bObstacle.lifetime = displayWidth/4;
bObstacle.debug  = true;
    bottomGroup.add(bObstacle);

    bObstacle.setCollider("rectangle",-50,150,150,250)

  }

}

function spawnCoins(){
  if(frameCount % 350 === 0){
    coin = createSprite(500,450)
coin.addImage(coinImg)
coin.scale = 0.5
coin.velocityX = -4
coin.lifetime = displayWidth/4;
coinsGroup.add(coin)
  }
}