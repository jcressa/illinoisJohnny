function ghosts(game, key, frame, xPos, yPos, scale){
  Phaser.Sprite.call(this, game, xPos, yPos, key, frame);

    game.physics.enable(this);
    //this.body.collideWorldBounds = true;
    this.anchor.set(0.5);
    this.scale.x = scale;
    this.scale.y = scale;
    this.enableBody = true;
    this.body.immovable = true;
    this.body.setSize(24, 32, 5, 0);
    //Animations
    //Moving ghost left
    this.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
    //Moving ghost right
    this.animations.play('left');
}

ghosts.prototype = Object.create(Phaser.Sprite.prototype);
ghosts.prototype.constructor = ghosts;
ghosts.prototype.update = function(){
  hitGhost = game.physics.arcade.overlap(sideAtt, this);

  if(hitGhost){
    this.kill();
  }
}
