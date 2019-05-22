// GameOver

var GameOver = function(game) {};
GameOver.prototype = {
  preload: function(){
    console.log('GameOver: preload');
  },
  create: function(){
    console.log('GameOver: create');
    game.stage.backgroundColor = "#8A8A8A";
    //Starting screen text
    var gameOverText = game.add.text(200, 100, 'Game Over',
      { fontSize: '32px', fill: '#FFF' });
    var gameOverText = game.add.text(120, 200, 'Press [space] to restart.',
      { fontSize: '32px', fill: '#FFF' });
  },
  update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      game.state.start('MainMenu');
    }
  }
}
