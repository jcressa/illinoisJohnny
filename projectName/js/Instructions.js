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
    instructions2 = game.add.sprite(20, 240, 'instructions2');
    instructions2.scale.setTo(.4, .4);
    space = game.add.sprite(110, 520, 'space');
		space.scale.setTo(.4, .4);

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
