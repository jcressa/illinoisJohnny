function ghosts(game, key, frame, xPos, yPos, xVel, scale){
  Phaser.Sprite.call(this, game, xPos, yPos, key, frame);

    game.physics.enable(this);
    //this.body.collideWorldBounds = true;
    this.anchor.set(0.5);
    this.scale.x = scale;
    this.scale.y = scale;
    this.enableBody = true;
    this.body.immovable = true;
    this.body.setSize(18, 20, 7, 4);
    gVel = xVel;
    this.body.velocity.x = gVel;
    this.body.collideWorldBounds = true;
    //Animations
    //Moving ghost left
    this.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
    //Moving ghost right
    this.animations.play('left');
}

ghosts.prototype = Object.create(Phaser.Sprite.prototype);
ghosts.prototype.constructor = ghosts;

ghosts.prototype.update = function(){
  // Checking collisions with the ghosts and player
  game.physics.arcade.collide(player.body.x, this);

  // This disables all other collisions but up(top)
  this.body.checkCollision.down = false;
  //this.body.checkCollision.left = false;
  //this.body.checkCollision.right = false;


    // player is touching bottom
    // ghost touching up
    // automatically jump when both make contact
    if(this.body.touching.up && player.body.touching.down){
      player.body.velocity.y = -playerJump/1.5;
    }
    if(this.body.x > 550 || this.body.x < 5){
      this.body.velocity.x = -this.body.velocity.x;
    }
    /*
    if(count < 1000){
      this.body.velocity.x *= 1;
      count++;
    } else if(count > 2000){
      count = 0;
    } else {
      this.body.velocity.x *= -1;
      count++;
    }
    */
}
