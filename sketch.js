//Create variables here
var dog, happyDog, dogImage;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250,300,150,150);
  dog.addImage(dogImage)
  dog.scale = 0.15
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  textSize(20)
  
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();
  //add styles here

  textSize(13)
  fill("RED")
  stroke("BLACK")
  text("Note: Press Up_Arrow Key to feed drago milk", 130,10,300,20)

}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x = x-1
  }
  database.ref('/').update({
    Food: x
  })
}

