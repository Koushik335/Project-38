var rabbit,rabbitImg
var carrot,carrotImg
var background2,backgroundImg
var obstacleI,obstacleG
var carrotI,carrotG
var ground
var score=0
var gameOver,gameOverImg,gameOverS
var gameState="PLAY"
var reset,resetImg

function preload(){
 rabbitImg=loadImage("rabbit.png");
 carrotImg=loadImage("carrot.png");
 backgroundImg=loadImage("background.png");
 obstacleI=loadImage("obstacle.png");
 carrotI=loadImage("carrot.png");
 gameOverImg=loadImage("GameOver.png");
 resetImg=loadImage("Reset.png");
 gameOverS=loadSound("gameOver.wav");
}

function setup() {
  createCanvas(400,400);
 background2=createSprite(200,200);
 background2.addImage(backgroundImg);
 background2.scale=0.9;
 background2.velocityX=-3;
 rabbit=createSprite(50,360);
 rabbit.addImage(rabbitImg);
 rabbit.scale=0.350;
 ground=createSprite(0,400,800,5);
  gameOver=createSprite(200,200);
  gameOver.addImage(gameOverImg);
  reset=createSprite(200,350);
  reset.addImage(resetImg);
  reset.scale=0.5;
 obstacleG=new Group();
 carrotG=new Group();
}

function draw() {
  background(220);
 if(gameState==="PLAY"){
  if(background2.x<0){
    background2.x=background2.width/2;
  }
  if(keyDown("space")&&rabbit.y>=200){
    rabbit.velocityY=-10;
  }
  rabbit.velocityY=rabbit.velocityY+0.8;
  ground.visible=false;
  gameOver.visible=false;
  reset.visible=false;
  
  
  carrot();
  obstacle();
  if(rabbit.isTouching(carrotG)){
    score=score+2;
    carrotG.destroyEach();
  }
  if(rabbit.isTouching(obstacleG)){
    gameOverS.play();
    gameState="END";
    obstacleG.destroyEach();
  }
 }
  rabbit.collide(ground);
  if(gameState==="END"){
      gameOver.visible=true;
      background2.velocityX=0;
      reset.visible=true;
    if(mousePressedOver(reset)){
      gameState="PLAY";
      background2.velocityX=-3;
      score=0;
    }
  }
  drawSprites();
  //stroke("green")
textSize(18)
fill("green")
   text("Score:"+score,310,30)
}
function obstacle(){
  if(frameCount%250===0){
var obstacle=createSprite(400,360);
    obstacle.addImage(obstacleI);
    obstacle.velocityX=-4;
    obstacle.scale=0.3;
    obstacle.lifetime=120;
    obstacleG.add(obstacle);
  }
}
function carrot(){
  if(frameCount%150===0){
    var carrot=createSprite(400,Math.round(random(150,250)))
    carrot.addImage(carrotI)
    carrot.velocityX=-4
    carrot.scale=0.8;
    carrot.lifetime=120
    carrotG.add(carrot)
  }
}