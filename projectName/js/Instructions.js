// Instructions
var count = 0;
var Instructions = function(game) {};
Instructions.prototype = {
  preload: function(){
    console.log('Instructions: preload');
  },
  create: function(){
    console.log('Instructions: create');
    //Starting screen text
    back = game.add.sprite(0, 0, 'background');
    //game.stage.backgroundColor = "#8A8A8A";
    instructions = game.add.sprite(60, 70, 'instructions');
		instructions.scale.setTo(.8, .8);
    instructions2 = game.add.sprite(120, 220, 'instructions2');
    instructions2.scale.setTo(.4, .4);
    space = game.add.sprite(100, 450, 'space');
		space.scale.setTo(.4, .4);
    skip = game.add.text(80, 520, '(Also, you can press "S" to skip a level)', { font: '24px Arial', fill: '#fff' });

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
      music.stop();
      game.state.start('Level1');
    }
  }
}
