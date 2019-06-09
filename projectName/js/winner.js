// Winner

var Winner = function(game) {};
Winner.prototype = {
  preload: function(){
    console.log('Winner: preload');
  },
  create: function(){
    console.log('Winner: create');
    //Starting screen text
    back = game.add.sprite(0, 0, 'background');
    //game.stage.backgroundColor = "#8A8A8A";
    winJohnny = game.add.sprite(200, 200, 'winJohnny');
		winJohnny.scale.setTo(.4, .4);
    win = game.add.sprite(120, 70, 'win');
    win.scale.setTo(1, 1);
    restart = game.add.sprite(70, 200, 'restart');
		restart.scale.setTo(.5, .5);

    //var winnerText = game.add.text(200, 100, 'Game Over',
      //{ fontSize: '32px', fill: '#FFF' });
    //var winnerText = game.add.text(120, 200, 'Press [space] to restart.',
      //{ fontSize: '32px', fill: '#FFF' });
  },
  update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      game.state.start('MainMenu');
    }
  }
}
