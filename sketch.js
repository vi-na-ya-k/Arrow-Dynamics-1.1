//Use Arrow Keys To AIM
//Press and Hold Space to Aim Better
//Release Space to Shoot!

var score, backGround, bGImage, backGround2, bGImage2, scoreText;
var bow, bowArrow, arrow, bowShoot, x;
var bowImage, bowArrowImage, arrowImage;
var YellowballoonsImage, OrangeballoonsImage;
var GreenballoonsImage, BlueballoonsImage;
var Y1, O1, G1, B1;
var yGroup, gGroup, bGroup, oGroup;
var TimeText, Time;
var target;

function preload(){
 bGImage = loadImage("PlayGr.jpg");
 bGImage2 = loadImage("PlayGr2.jpg");
 bowImage = loadImage("Bow.png", "bowArrow.png");
 arrowImage = loadImage("Arrow.png");
 bowArrowImage = loadImage("bowArrow.png");
 YellowballoonsImage = loadImage("BalloonYellow.png");
 OrangeballoonsImage = loadImage("BalloonOrange.png");
 GreenballoonsImage = loadImage("BalloonGreen.png");
 BlueballoonsImage = loadImage("BalloonBlue.png");
}

function setup() {
  createCanvas(500, 400);
  
  //backGroundSprite
  backGround = createSprite(300, 200, 600, 400);
  backGround.addImage("bg", bGImage);
  backGround2 = createSprite(-312, 200, 600, 400);
  backGround2.addImage("bg2", bGImage2);
  
  //BowSprite
  bow = createSprite(canvas.width/2, 350, 50, 50);
  bow.addImage("Bow", bowImage);
  bow.scale = 0.1;
  bow.rotation = 270;
  bowShoot = createSprite(canvas.width/2, 350, 600, 400);
  bowShoot.shapecolor = "red";
  bowShoot.scale = bow.scale;
  bowShoot.rotation = bow.rotation;
  bowShoot.addImage("bowShoot", bowArrowImage);
  bowShoot.visible = false;
  
  //ArrowSprite
  arrow = createSprite(canvas.width/2, 350, 10, 50);
  arrow.addImage("Arrow", arrowImage);
  arrow.scale = bow.scale;
  arrow.rotation = bow.rotation;
  arrow.visible = true;
  
  //groups
  oGroup = new Group();
  gGroup = new Group();
  bGroup = new Group();
  yGroup = new Group();

  score = 0;
  target = 200;
  Time = 180;
}

function draw() {
  background(220);
  bGMove();
  controls();
  spawn();
  targetChange();
  
  if(arrow.x > 550 || arrow.x < -50 || arrow.y > 450 || arrow.y < -50) {
    reset();
  }
  
  drawSprites();
  
  if(frameCount % 60 === 0){
    Time--;
  }
  
  fill("black");
  strokeWeight(16);
  textFont("Courier New");
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Get " + target + " points before the timer runs out out!", 5, 10, 500, 50);
  
  fill("white");
  strokeWeight(16);
  textFont("Courier New");
  textSize(32);
  textAlign(LEFT, CENTER);
  text(score, 20, 380);
  
  textAlign(RIGHT, CENTER);
  text(Time, 480, 380);
  
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Points:", 52, 350);
  
  TimeText = text("Time Left:", 420, 350);
  
  if(Time === 0){
    fill("white");
    textAlign(CENTER, CENTER);
    textSize(128);
    text("END!");
    
    oGroup.setVelocityXEach(0);
    bGroup.setVelocityXEach(0);
    gGroup.setVelocityXEach(0);
    yGroup.setVelocityXEach(0);
    
    TimeText.destroy();
  }
}

function bGMove(){
  backGround.velocityX = 2;
  backGround2.velocityX = 2;
  
  if(backGround.x === 912){
    backGround.x = -312;
  }
  if(backGround2.x === 912){
    backGround2.x = -312;
  }
}

function controls(){
  if(keyWentDown("space") && arrow.x === bow.x && arrow.y === bow.y) {
    bowShoot.visible = true;
    bow.visible = false;
    arrow.visible = false;
  }
  
  if(keyWentUp("space") && arrow.x === bow.x) {
    bowShoot.visible = false;
    bow.visible = true;
    arrow.visible = true;
    arrow.setSpeedAndDirection(6, arrow.rotation);
  }
  if(keyDown("right") && arrow.x === bow.x){
    bow.rotation++;
    bowShoot.rotation++;
    arrow.rotation++;
  }
  if(keyDown("left") && arrow.x === bow.x){
    bow.rotation--;
    bowShoot.rotation--;
    arrow.rotation--;
  }
}

function reset(){
    arrow.y = bow.y;
    arrow.x = bow.x;
    arrow.setSpeedAndDirection(0, arrow.rotation);
}

function spawn(){
  if (frameCount % 55 === 0){
    O1 = createSprite(550, Math.round(random(50,225)), 39, 75);
    O1.velocityX = -7;
    O1.addImage("OB", OrangeballoonsImage);
    O1.lifetime = canvas.width + 100;
    oGroup.add(O1);
  } else if (frameCount % 60 === 0){
    G1 = createSprite(550, Math.round(random(50,225)), 28, 75);
    G1.velocityX = -6;
    G1.addImage("GB", GreenballoonsImage);
    G1.lifetime = canvas.width + 100;
    gGroup.add(G1);
  } else if(frameCount % 65 === 0){
    B1 = createSprite(550, Math.round(random(50,225)), 41, 60);
    B1.velocityX = -5;
    B1.addImage("BB", BlueballoonsImage);
    B1.lifetime = canvas.width + 100;
    bGroup.add(B1);
  } else if(frameCount % 70 === 0){
    Y1 = createSprite(550, Math.round(random(50,225)), 40, 50);
    Y1.velocityX = -8;
    Y1.addImage("YB", YellowballoonsImage);
    Y1.lifetime = canvas.width + 100;
    yGroup.add(Y1);
  }
  
  if(yGroup.isTouching(arrow)){
    Y1.destroy();
    reset();
    score = score + 4;
  }
  
  if(oGroup.isTouching(arrow)){
    O1.destroy();
    reset();
    score = score + 3;
  }
  
  if(gGroup.isTouching(arrow)){
    G1.destroy();
    reset();
    score = score + 2;
  }
  
  if(bGroup.isTouching(arrow)){
    B1.destroy();
    reset();
    score = score + 1;
  }
}

function targetChange(){
  if(score >= 200 && target === 200){
    Time = 240;
    target = 300;
    score = 0;
  }
  if(score >= 300 && target === 300){
    Time = 360;
    target = 400;
    score = 0;
  }
  if(score >= 400 && target === 400){
    Time = 480;
    target = 500;
    score = 0;
  }
  if(score >= 540 && target === 500){
    Time = 600;
    target = 600;
    score = 0;
  }
  if(score >= 600 && target === 600){
    Time = 660;
    target = 700;
    score = 0;
  }
}