Game.TitleScreen = function(game){};

var titleimage;
var enterbutton;
var spacebarbutton;
var background;
var middleground;
var startKey;
var start2Key;
var title2;
var startmusic;
var audioFlag = true;

Game.TitleScreen.prototype={

  create:function(){
//this.state.start('Level1');
     this.startMusic();
     background= this.add.tileSprite(0,0,1400,800,'gardenbg');
     middleground= this.add.tileSprite(0,0,1400,800,'starttreebg');

     titleimage = this.add.image(700, 350, "title");
     titleimage.anchor.setTo(0.5, 0.5);

     enterbutton = this.add.image(700, 665, "enter");
     enterbutton.anchor.setTo(0.5);

     startKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
     startKey.onDown.add(this.startGame, this);

     start2Key = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
     start2Key.onDown.add(this.start2Game, this);

     this.time.events.loop(700, this.blinkText, this);
     

},

startGame: function () {
        title2 = this.add.image(700, 400, 'instructions');
        title2.anchor.setTo(0.5);
        titleimage.destroy();
        enterbutton.destroy();
        spacebarbutton = this.add.image(700, 665, "spacebar");
        spacebarbutton.anchor.setTo(0.5);
        this.time.events.loop(700, this.blinkText2, this);
},

start2Game: function () {
        startmusic.destroy();
        this.state.start('Level1');
	
},

blinkText: function () {
    if (enterbutton.alpha) {
        enterbutton.alpha = 0;
    } else {
        enterbutton.alpha = 1;
    }
},

blinkText2: function () {
    if (spacebarbutton.alpha) {
        spacebarbutton.alpha = 0;
    } else {
        spacebarbutton.alpha = 1;
    }
},

startMusic: function(){
	if (!audioFlag){
             return
}

     startmusic = this.add.audio("startScreenMusic");
     startmusic.loop = true;
     startmusic.play();
},

update: function () {
    background.tilePosition.x -= 0.25;
    middleground.tilePosition.x -= 0.4;
}

}
