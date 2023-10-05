//constructor for enemy redcard character object
Enemy1 = function(index,game,x,y){
this.redcard = game.add.sprite(x,y,'redcard');
this.redcard.anchor.setTo(0.5,0.5);
this.redcard.animations.add('left',[0,1,2,3,4],7,true);
this.redcard.animations.play('left');
this.redcard.name = index.toString();
game.physics.enable(this.redcard,Phaser.Physics.ARCADE);
this.redcard.body.immovable = true;
this.redcard.body.collideWorldBounds = true;
this.redcard.body.allowGravity = false;

this.redcardTween = game.add.tween(this.redcard).to({
  x: this.redcard.x + 350
},3000,'Linear',true,0,100,true);

}

//constructor for enemy redcard character object
Enemy2 = function(index,game,x,y){
this.blackcard = game.add.sprite(x,y,'blackcard');
this.blackcard.anchor.setTo(0.5,0.5);
this.blackcard.animations.add('left',[0,1,2,3,4],7,true);
this.blackcard.animations.play('left');
this.blackcard.name = index.toString();
game.physics.enable(this.blackcard,Phaser.Physics.ARCADE);
this.blackcard.body.immovable = true;
this.blackcard.body.collideWorldBounds = true;
this.blackcard.body.allowGravity = false;

this.blackcardTween = game.add.tween(this.blackcard).to({
  x: this.blackcard.x + 350
},3000,'Linear',true,0,100,true);

}

//constructor for potion bottles object
DrinkMe = function(index,game,x,y){
this.bottle = game.add.sprite(x,y,'bottle');
this.bottle.anchor.setTo(0.5,0.5);
this.bottle.animations.add('drink',[0,1,2,3,4,5,6,7],3,true);
this.bottle.animations.play('drink');
this.bottle.name = index.toString();
game.physics.enable(this.bottle,Phaser.Physics.ARCADE);
this.bottle.body.immovable = true;
this.bottle.body.collideWorldBounds = true;
this.bottle.body.allowGravity = false;

this.bottleTween = game.add.tween(this.bottle).to({ 
  y: this.bottle.y + 25
},2000,'Linear',true,0,100,true);
}

//constructor for lifeheart object
HeartLife = function(index,game,x,y){
this.heart = game.add.sprite(x,y,'heart');
this.heart.anchor.setTo(0.5,0.5);
this.heart.animations.add('life',[0,1,2,3,4,5,6,7],7,true);
this.heart.animations.play('life');
this.heart.name = index.toString();
game.physics.enable(this.heart,Phaser.Physics.ARCADE);
this.heart.body.immovable = true;
this.heart.body.collideWorldBounds = true;
this.heart.body.allowGravity = false;

this.heartTween = game.add.tween(this.heart).to({
    y: this.heart.y + 25
},2000,'Linear',true,0,100,true);
}

//constructor for rabbit object
Rabbit = function(index,game,x,y){
  this.rabbit = game.add.sprite(x,y,'rabbit');
  this.rabbit.anchor.setTo(0.5,0.5);
  this.rabbit.animations.add('run',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],7,true);
  this.rabbit.animations.play('run',7,false,true);
  this.rabbit.name = index.toString();
  game.physics.enable(this.rabbit,Phaser.Physics.ARCADE);
  this.rabbit.body.immovable = true;
  this.rabbit.body.collideWorldBounds = true;
  this.rabbit.body.allowGravity = false;

this.rabbitTween = game.add.tween(this.rabbit).to({
    x: this.rabbit.x + 1400
},5000,'Linear',true,0,100,true);

}


Game.Level1 = function(game){};

//game variables
var map;
var layer;
var player;
var enemies_group;
var bg;
var bg2;
var controls = {};
var playerSpeed= 400;
var jumpTimer = 0;
var score = 0;
var hud;
var scoreLabel;
var health = 3;
var click=1;
//music sound effects variables
var music;
var audioFlag = true;
var audioHurt;
var audioKill;
var audioItem;
var audioHeart;
var audioLevelUp;
var audioJump;

var mutebutton;
//objects
var enemy1;
var enemy2;
var enemy3;
var enemy4;
var enemy5;
var enemy6;
var bottle1;
var bottle2;
var bottle3;
var bottle4;
var bottle5;
var life1;
var life2;
var life3;
var rabbit;

Game.Level1.prototype={

  create:function(game){

this.startMusic();
this.stage.backgroundColor= '#3A5963';

//backgroundimage
bg= this.add.tileSprite(0,0,12000,800,'gardenbg');
bg.fixedToCamera = true﻿;
bg.cameraOffset.setTo(0,0);
bg.scale.set(1);

//middlegroundimage
bg2= this.add.tileSprite(0,0,12000,800,'treebg');
//bg2.fixedToCamera = true﻿;
bg2.cameraOffset.setTo(0,0);
bg2.scale.set(1);

this.physics.arcade.gravity.y = 1400;

//tilemap level design
map= this.add.tilemap('map',80,80);
map.addTilesetImage('tileset');
layer=map.createLayer(0);
layer.resizeWorld();

map.setCollisionBetween(0,0);
map.setCollisionBetween(1,1);

map.setTileIndexCallback(2,this.resetPlayer,this);
map.setTileIndexCallback(3,this.resetPlayer,this);
map.setTileIndexCallback(4,this.getRabbit,this);
map.setTileIndexCallback(5,this.getRabbit,this);
map.setTileIndexCallback(10,this.getRabbit,this);
map.setTileIndexCallback(11,this.getRabbit,this);

this.createHud();

this.createButton(game,1350,50,40,25,
function(){
  if(click==1){
    click=2;
  music.pause();
}
else if (click==2){
  click=1;
    music.resume();
}
});

//playerAlice animation
player = this.add.sprite(100,400,'player');
player.anchor.setTo(0.5,0.5);
player.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12,13],7,true);
player.animations.add('jump',[18],1,true);
player.animations.add('run',[14,15,16,17,18,19,20,21,22,23],7,true);
this.physics.arcade.enable(player);
this.camera.follow(player);
player.body.collideWorldBounds = true;

controls= {
  right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
  left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
  up: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
};

//creating objects
enemy1=new Enemy1(0,game,2900,655);
enemy2=new Enemy2(0,game,5340,655);
enemy3=new Enemy1(0,game,7600,655);
enemy4=new Enemy2(0,game,8400,655);
enemy5=new Enemy1(0,game,10480,655);
enemy6=new Enemy2(0,game,11120,655);
bottle1=new DrinkMe(0,game,2480,640);
bottle2=new DrinkMe(0,game,4720,450);
bottle3=new DrinkMe(0,game,7820,640);
bottle4=new DrinkMe(0,game,8500,640);
bottle5=new DrinkMe(0,game,10240,640);
life1=new HeartLife(0,game,4100,560);
life2=new HeartLife(0,game,6880,640);
life3=new HeartLife(0,game,10240,300);

rabbit=new Rabbit(0,game,800,665);

},

//all sound effects
startMusic: function(){
	if (!audioFlag){
             return
}
     audioKill = this.add.audio("killsound");
     audioItem = this.add.audio("itemsound");
     audioHurt = this.add.audio("hurtsound");
     audioHeart = this.add.audio("heartsound");
     audioLevelUp = this.add.audio("levelupsound");
     audioJump = this.add.audio("jumpsound");

     music = this.add.audio("thememusic");
     music.loop = true;
     music.play();
},

stopMusic: function(){
  this.sound.mute = true;
},

//life and score counter
createHud: function () {

    hud = this.add.sprite(10, 30, 'hud');
    hud.fixedToCamera = true;

    scoreLabel = this.add.text(225, 38, "0", {font: "26px VT323", fill: "#ffffff"});
    scoreLabel.fixedToCamera = true;
    score = 0;

},



update:function(game){

  //  Scroll the background
  bg.tilePosition.x -= 0.3;

  this.physics.arcade.collide (player,layer);

  this.physics.arcade.collide (player,enemy1.redcard,this.resetPlayer);
  this.physics.arcade.collide (player,enemy2.blackcard,this.resetPlayer);
  this.physics.arcade.collide (player,enemy3.redcard,this.resetPlayer);
  this.physics.arcade.collide (player,enemy4.blackcard,this.resetPlayer);
  this.physics.arcade.collide (player,enemy5.redcard,this.resetPlayer);
  this.physics.arcade.collide (player,enemy6.blackcard,this.resetPlayer);

  this.physics.arcade.collide (player,bottle1.bottle, this.increaseScore);
  this.physics.arcade.collide (player,bottle2.bottle, this.increaseScore);
  this.physics.arcade.collide (player,bottle3.bottle, this.increaseScore);
  this.physics.arcade.collide (player,bottle4.bottle, this.increaseScore);
  this.physics.arcade.collide (player,bottle5.bottle, this.increaseScore);

  this.physics.arcade.collide (player,life1.heart, this.increaseLife);
  this.physics.arcade.collide (player,life2.heart, this.increaseLife);
  this.physics.arcade.collide (player,life3.heart, this.increaseLife);



  player.body.velocity.x = 0;

  if(controls.right.isDown){
    player.animations.play('run');
    player.scale.setTo(1,1);
    player.body.velocity.x += playerSpeed;
  }

  if(controls.left.isDown){
    player.animations.play('run');
    player.scale.setTo(-1,1);
    player.body.velocity.x -= playerSpeed;
  }

  if(controls.up.isDown && (player.body.onFloor() ||
   player.body.touching.down) && this.time.now > jumpTimer){
    player.body.velocity.y = -900;
    jumpTimer = this.time.now + 750;
    player.animations.play('jump');
    audioJump.play();
  }

  if(player.body.velocity.x == 0 && player.body.velocity.y == 0){
    player.animations.play('idle');
  }

//all potion objects
  if(checkOverlap(player,bottle1.bottle)) {
    this.collectPotion(player,bottle1.bottle);
  }
  if(checkOverlap(player,bottle2.bottle)) {
    this.collectPotion(player,bottle2.bottle);
  }
  if(checkOverlap(player,bottle3.bottle)) {
    this.collectPotion(player,bottle3.bottle);
  }
  if(checkOverlap(player,bottle4.bottle)) {
    this.collectPotion(player,bottle4.bottle);
  }
  if(checkOverlap(player,bottle5.bottle)) {
    this.collectPotion(player,bottle5.bottle);
  }

//all heart objects
  if(checkOverlap(player,life1.heart)) {
    this.collectLife(player,life1.heart);
  }
  if(checkOverlap(player,life2.heart)) {
    this.collectLife(player,life2.heart);
  }
  if(checkOverlap(player,life3.heart)) {
    this.collectLife(player,life3.heart);
  }

//change frame for number of lifehearts collected
  this.updateHealthHud();

  if (health < 1) {
    health=3;
      music.destroy();
      this.state.start('GameOver');
      console.log("gameover");
    //  health =3;
  }
},

createButton: function(game,x,y,w,h,callback){
  var button1= game.add.button(x,y,'soundbutton',callback,this,2,1,0);
  button1.anchor.setTo(0.5,0.5);
  button1.width= w;
  button1.height= h;
  button1.fixedToCamera = true;

},

increaseScore: function(){
    audioItem.play();
    score++;
    scoreLabel.text = score;
},

collectPotion: function (player, item) {
    item.kill();
},

increaseLife: function(){
  audioHeart.play();
  //player.health++;
  // if (player.health > 5) {
  //     player.health = 5;
  //     console.log(player.health);
  // }
  health++;
   if (health > 3) {
       health = 3;
   }
},

collectLife: function (player, item) {
    item.kill();
},

updateHealthHud: function () {
    //switch (player.health) {
    switch (health) {

        case 3:
            hud.frame = 0;
            break;
        case 2:
            hud.frame = 1;
            break;
        case 1:
            hud.frame = 2;
            break;
        case 0:
            hud.frame = 3;
            break;

    }
},

resetPlayer:function(){
  audioHurt.play();
  player.reset(100,300);

  health-- ;

},

getRabbit:function(){
  music.destroy();
  audioLevelUp.play();
  this.state.start('GameOver');
}

}//end of prototype

function checkOverlap(spriteA,spriteB){

var boundsA = spriteA.getBounds();
var boundsB = spriteB.getBounds();

return Phaser.Rectangle.intersects(boundsA,boundsB);

}
