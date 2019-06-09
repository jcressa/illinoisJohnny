// GameOver

var GameOver = function(game) {};
GameOver.prototype = {
  preload: function(){
    console.log('GameOver: preload');
  },
  create: function(){
    console.log('GameOver: create');
    //Starting screen text
    back = game.add.sprite(0, 0, 'background');
    //game.stage.backgroundColor = "#8A8A8A";
    gameover = game.add.sprite(110, 100, 'gameover');
		gameover.scale.setTo(.8, .8);
    restart = game.add.sprite(70, 300, 'restart');
		restart.scale.setTo(.5, .5);

    //var gameOverText = game.add.text(200, 100, 'Game Over',
      //{ fontSize: '32px', fill: '#FFF' });
    //var gameOverText = game.add.text(120, 200, 'Press [space] to restart.',
      //{ fontSize: '32px', fill: '#FFF' });
  },
  update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      game.state.start('Level1');
    }
  }
}
