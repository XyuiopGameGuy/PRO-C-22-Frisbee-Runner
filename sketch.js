 //criando variaveis
 var boyDead;
 var boy; 
 var boyAnime;
 var ground;
 var ground2;
 var invisibleground;
 var beachImg;
 var frisbeeImg;
 var frisbee
 var beach;
 var PLAYGAME = 1;
 var ENDGAME = 0;
 var gamestate = PLAYGAME;
 var obstacleG;
 var checkpoint;
 var die;
 var musicPlay;
 var jump;
 var score = 0;
 var gameover;
 var gameoverMusic;
 var restart;
 var gameoverImg;
 var restartImg;

 // carregando animacoes
 function preload(){
  checkpoint = loadSound("Checkpoint.ogg");

  gameoverImg = loadImage("Over.png");

  restartImg = loadImage("button.png")

  gameoverMusic= loadSound("gameOver.flac")

  jump = loadSound("jump.wav");

  boyAnime= loadAnimation("Run (1).png", "Run (2).png", "Run (3).png", "Run (4).png", "Run (5).png", "Run (6).png", "Run (7).png", "Run (8).png",);

  boyDead= loadAnimation("Dead (10).png");

  ground= loadImage("Pad.png");

  frisbeeImg= loadImage("Frisbee.png");

  beachImg= loadImage("Beach.png");

  obstacle1= loadImage("Coconut.png");

  obstacle2= loadImage("Crab.png");

  obstacle3= loadImage("Rock.png");

  obstacle4= loadImage("Sand.png");

}
// criando os sprites 
function setup(){
  createCanvas(windowWidth,windowHeight);

  beach= createSprite(width/2, height-500);

  beach.visible= true;

  beach.scale= 1.15;

  beach.addImage(beachImg);

  restart = createSprite(width/2, height-480, 75, 64); 

  restart.visible=false;

  restart.scale=0.3;

  restart.addImage(restartImg);

  gameover = createSprite(width/2, height-560, 381, 21);

  gameover.addImage(gameoverImg);

  gameover.visible=false;

  gameover.scale=0.7;

  frisbee= createSprite(1000, 50, 200, 200);

  frisbee.addImage(frisbeeImg);

  frisbee.scale=0.3;

  boy= createSprite(100, 190, 89, 94) ;

  boy.addAnimation("running", boyAnime);

  boy.addAnimation("dead", boyDead);
  
  boy.scale= 0.2;

  boy.setCollider("circle", 0, 0, 200);
  boy.debug= false;

  ground2 = createSprite(width, height-390, 600, 26);
  ground2.visible=true;
  ground2.addImage(ground);
  ground2.scale=1.2;

  invisibleground= createSprite(300, 220, 600, 10);

  invisibleground.visible=false;

  var rand =  Math.round(random(1,100))
  console.log(rand)

  obstacleG= new Group();
}

function draw(){
  background("white");

  fill("black");
  text("score: " + score, width/2, height-250);
  //console.log(frameCount);

  if (gamestate == PLAYGAME){
    createObstacles();
    score= score + Math.round(frameRate()/60);
    ground2.velocityX= -(10 + 2*(score/200));
    beach.velocityX= -(10 + 2*(score/200));
    frisbee.velocityX= -(10 + 2*(score/200));
    if (score > 0 && score % 200 == 0){
      checkpoint.play();
    }
  
    if (ground2.x < 0){
      ground2.x= ground2.width/2;
    } 
    if (beach.x < 0){
      beach.x= beach.width/2;
    } 
    if (frisbee.x > -1000){
      frisbee.x=frisbee.width;
    } 
    console.log(frisbee.x)
    if(keyDown("space") && boy.y > 152){
      jump.play();
      boy.velocityY=-13;
    }
    boy.velocityY=boy.velocityY +0.8
    //console.log(boy.y);
    
    if (boy.isTouching (obstacleG)){
      gameoverMusic.play();
      gamestate = ENDGAME;
   }
  }
    else if (gamestate == ENDGAME) {
      gameover.visible=true;
      restart.visible=true;
      checkpoint.stop();
      boy.changeAnimation("dead", boyDead);
      ground2.velocityX= 0;
      beach.velocityX= 0;
      frisbee.velocityX= 10;
      boy.velocityY= 0;
      boy.x=100;
      boy.y=190;
      obstacleG.setLifetimeEach(-1);
      obstacleG.setVelocityXEach(0);
      if (mousePressedOver(restart)){
        reset();
    }
    }
    boy.collide(invisibleground);
    gameover.depth= frisbee.depth;
    gameover.depth= gameover.depth+1;
    drawSprites();
}

function createObstacles(){
  if (frameCount %80 == 0) {
    obstacle= createSprite(width, 200, 50, 50);
    obstacle.velocityX= -(10 + 2*(score/200))
   var randObstacle= Math.round(random(1, 4));
   obstacle.scale = 0.3;
   obstacle.lifetime= 300;
   obstacleG.add(obstacle);

   switch(randObstacle){
   case 1: obstacle.addImage(obstacle1);
   break;
   case 2: obstacle.addImage(obstacle2);
   break;
   case 3: obstacle.addImage(obstacle3);
   break;
   case 4: obstacle.addImage(obstacle4);
   default: break;
  }
}
}
function reset(){
  gamestate = PLAYGAME;
  gameoverMusic.stop();
  boy.changeAnimation("running", boyAnime);
  score=0;
  boy.x=100;
  boy.y=190;
  obstacleG.destroyEach();
  gameover.visible=false;
  restart.visible=false;
}