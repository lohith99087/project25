const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var playerArrowLists = [];

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var arrow;
var baseimage;
var playerimage;

function preload() {
  backgroundImg = loadImage("background.png");
  baseimage = loadImage("base.png");
  playerimage = loadImage("player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );

  arrow = new PlayerArrow(
    playerArcher.body.position.x,
    playerArcher.body.position.y,
    100,
    10
  );
}

function draw() {
  background(backgroundImg);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)
  Engine.update(engine);

  playerArcher.display();
  //arrow.display();

  for(var i=0; i<playerArrowLists.length; i++){
    showPlayerArrows(playerArrowLists[i])
  }

  

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
}

function keyReleased(){
  if (keyCode === 32) {
    playerArrowLists[playerArrowLists.length-1].shoot(playerArcher.body.angle);
  }
}

function keyPressed(){
  if(keyCode === 32)
   {
     var playerArrow = new PlayerArrow(380,240,100,20)
     playerArrow.display(); 
     playerArrowLists.push(playerArrow);
    }

}


function showPlayerArrows(arrow){
  if (arrow){
    arrow.display();
  }
}


