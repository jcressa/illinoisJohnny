// MainMenu

var game;
var count = 0;
var space;

window.onload = function() {
	game = new Phaser.Game(600, 600, Phaser.AUTO);
	game.state.add('MainMenu', MainMenu);
	game.state.add('Level1', Level1);
	game.state.add('Level2', Level2);
	game.state.add('GameOver', GameOver);
	game.state.start('MainMenu');
}

var MainMenu = function(game) {};
MainMenu.prototype = {
  preload: function(){
    console.log('Mainmenu: preload');

    game.load.image('ground', 'assets/img/platform.png');
    game.load.image('background', 'assets/img/background.png');
    game.load.image('spike', 'assets/img/spikes_24.png');
    game.load.image('wall', 'assets/img/spikes_24.png');
    game.load.image('heart', 'assets/img/heart_full.png');
    game.load.image('heartHalf', 'assets/img/heart_half.png');
    game.load.image('light', 'assets/img/light.png');
    game.load.image('black', 'assets/img/black.png');
    game.load.image('door', 'assets/img/door.png');
		game.load.image('johnny', 'assets/img/johnny.png');
		game.load.image('opening', 'assets/img/opening.jpg');
		game.load.image('title', 'assets/img/title.png');
		game.load.image('glow', 'assets/img/glow.png');
		game.load.image('space', 'assets/img/space.png');
		game.load.image('gameover', 'assets/img/gameover.png');
    game.load.audio('oof', 'assets/audio/oof.mp3');
		game.load.audio('music', 'assets/audio/music.mp3');
		game.load.audio('mummy', 'assets/audio/mummy.mp3');
    game.load.atlas('pAtlas', 'assets/img/player.png', 'assets/img/player.json');
    game.load.spritesheet('ghost', 'assets/img/ghost.png', 32, 24);
		game.load.spritesheet('mummy', 'assets/img/mummy.png', 32, 24);
    game.load.spritesheet('player', 'assets/img/player2.png', 32, 24);
		game.load.spritesheet('leftA', 'assets/img/leftA.png', 32, 24);
		game.load.spritesheet('rightA', 'assets/img/rightA.png', 32, 24);
    game.stage.backgroundColor = "#8A8A8A";
  },
  create: function(){
    game.stage.backgroundColor = "#8A8A8A";
		//Add music
    music = game.add.audio('music');
		music.play();
    //Starting screen text
		opening = game.add.sprite(0, 0, 'opening');
		opening.scale.setTo(1.4, 1.4);
		title = game.add.sprite(30, 70, 'title');
		title.scale.setTo(.8, .8);
		space = game.add.sprite(110, 220, 'space');
		space.scale.setTo(.4, .4);
		johnny = game.add.sprite(300, 300, 'johnny');
		johnny.scale.setTo(.3, .3);
    //var gameText = game.add.text(180, 100, 'Illinois Johnny',
      //{ fontSize: '32px', fill: '#FFF' });
    //var startText1 = game.add.text(110, 150, 'Use arrow keys to move.',
      //{ fontSize: '32px', fill: '#FFF' });
  //  var startText2 = game.add.text(130, 200, 'Press [space] to start.',
      //{ fontSize: '32px', fill: '#FFF' });
    //console.log('Mainmenu: create');
  },
  update: function(){
		if(count < 40){
      space.alpha = 1;
      count++;
    } else if(count > 80){
      count = 0;
    } else {
      space.alpha = .5;
      count++;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      game.state.start('Level1');
    }
  }
}
