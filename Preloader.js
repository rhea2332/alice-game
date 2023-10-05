Game.Preloader = function(game){
  this.preloadBar = null;
};

Game.Preloader.prototype = {
preload:function(){

  this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,'preloaderBar');
  this.preloadBar.anchor.setTo(0.5,0.5);
  this.time.advancesTiming= true;
  this.load.setPreloadSprite(this.preloadBar);
  //LOAD ALL ASSETS
this.load.image("title", "assets/title-screen.png");
this.load.image("enter", "assets/press-enter-text.png");
this.load.image("spacebar", "assets/press-space-text.png");
this.load.image("instructions", "assets/instructions.png");
this.load.image("gameover", "assets/game-over.png");

this.load.image('gardenbg', 'assets/gardenbgpink.png');
this.load.image('treebg', 'assets/bg2.png');
this.load.image('starttreebg', 'assets/startscreen.png');
this.load.tilemap('map','assets/map.csv');
this.load.image('tileset','assets/tileset.png');
this.load.image('soundbutton','assets/sound.png');
this.load.image('mutebutton','assets/mute.png');

this.load.spritesheet('player','assets/AliceSpriteSheet.png',172,200);
this.load.spritesheet('redcard','assets/cardmanRED.png',188,125);
this.load.spritesheet('blackcard','assets/cardmanBLACK.png',165,125);
this.load.spritesheet('bottle','assets/drinkMe.png',80,100);
this.load.spritesheet('heart','assets/heart.png',49,40); //resize images
this.load.spritesheet('rabbit','assets/alicerabbit.png',128,125);
this.load.spritesheet('hud','assets/hud.png',254,50);

this.load.audio('thememusic', 'sounds/alicetheme.mp3');
this.load.audio('startScreenMusic', 'sounds/alicethemeacapella.mp3');
this.load.audio('endCreditsMusic', 'sounds/gameover.mp3');
this.load.audio('killsound', 'sounds/enemy-death.ogg');
this.load.audio('hurtsound', 'sounds/hurt.ogg');
this.load.audio('itemsound', 'sounds/item.ogg');
this.load.audio('heartsound', 'sounds/magic.ogg');
this.load.audio('levelupsound', 'sounds/levelup.ogg');
this.load.audio('jumpsound', 'sounds/jump.ogg');

},

create:function(){
this.state.start('TitleScreen');

}

}
