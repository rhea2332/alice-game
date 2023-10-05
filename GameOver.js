Game.GameOver = function(game){};

var endcredits;
var enterbutton;
var background;
var middleground;
var startKey;
var startmusic;
var audioFlag = true;



Game.GameOver.prototype={

  create:function(){

     this.startMusic();

     background= this.add.tileSprite(0,0,1400,800,'gardenbg');
     middleground= this.add.tileSprite(0,0,1400,800,'starttreebg');

     endcredits = this.add.image(700, 350, "gameover");
     endcredits.anchor.setTo(0.5, 0.5);

     enterbutton = this.add.image(700, 665, "enter");
     enterbutton.anchor.setTo(0.5);

     startKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
     startKey.onDown.add(this.startGame, this);


     this.time.events.loop(700, this.blinkText, this);
     //this.time.events.loop(700, this.blinkText2, this);

},

startGame: function () {
        startmusic.destroy();
        this.state.start('TitleScreen');
},

blinkText: function () {
    if (enterbutton.alpha) {
        enterbutton.alpha = 0;
    } else {
        enterbutton.alpha = 1;
    }
},

startMusic: function(){
	if (!audioFlag){
             return
}

     startmusic = this.add.audio("endCreditsMusic");
     startmusic.loop = true;
     startmusic.play();
},

update: function () {
    background.tilePosition.x -= 0.25;
    middleground.tilePosition.x -= 0.4;
}

}
