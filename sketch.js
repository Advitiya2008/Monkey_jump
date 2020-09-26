var monkey, monkeyimg, invisible, count, bananaGroup, stones, gameover, backgrounds, gameoverimg, imgb, bananaimg, stonesimg, banana, obstacle;

var PLAY=1;
var END=0;

var gamestate=PLAY;

function preload(){
  gameoverimg=loadImage("gameover.png.png");

 // imgb=loadImage("jungle.png");
  bananaimg=loadImage("banana.png");
  stonesimg=loadImage("obstacle.png");
  monkeyimg=loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");
}

function setup(){
  
monkey = createSprite(40, 360, 10, 10);
monkey.addAnimation("m", monkeyimg);
monkey.scale=0.1;
//monkey.setCollider("circle", 0, 0, 200);
//monkey.debug=true;
  
invisible = createSprite(200, 395, 400, 10);
invisible.visible=false;

count=0;

//backgrounds=createSprite(200, 200, 400, 400);
//backgrounds.addAnimation("b", imgb);
  
bananaGroup = new Group();
stones = new Group();

gameover = createSprite(200, 200, 10, 10);
gameover.addImage ("g", gameoverimg);
gameover.scale=0.3;
gameover.visible=false;

  
}

function draw() {
  background(255);
  
if(gamestate===PLAY){
  monkey.collide(invisible);
  if(keyDown("space") && monkey.y >= 359){
  monkey.velocityY = -14 ;
    }
    
  if(bananaGroup.isTouching(monkey)){
    count=count+1;
    bananaGroup.destroyEach();
  }
   
  if(stones.isTouching(monkey)){
    gamestate=END;
  } 
    textSize(18); 
  text("score: "+count, 310, 50);
  
  monkey.velocityY = monkey.velocityY + 0.8;
  bananas();
  stone();
} 

if(gamestate===END){
  gameover.visible=true;
  //backgrounds.visible=false;
  background("black");
 if(mousePressedOver(gameover)){
   reset();
 }
}
  drawSprites();
}

function stone() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(400,395,10,40);
    obstacle.y = round(random(370,395));
    obstacle.velocityX = - (6 + 3*count/10);
    obstacle.addAnimation("S",stonesimg);
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 70;
    obstacle.setCollider("rectangle",0, 0, 200, 200);
    //obstacle.debug=true;
    stones.add(obstacle);
  }
}

function bananas() {
  if (frameCount % 60 === 0) {
    bannana = createSprite(400,320,40,10);
    bannana.y = round(random(280,320));
    bannana.addAnimation("z", bananaimg);
    bannana.scale = 0.06;
    bannana.velocityX = - (6+3*count/10);
    
    bannana.lifetime = 134;
    bannana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(bannana);
  }
}

function reset(){
  gamestate=PLAY;
  stones.destroyEach();
  bananaGroup.destroyEach();
  gameover.visible=false;
  count=0;
  monkey.y=360;
 // backgrounds.visible=true;
}