function mummies(game, key, frame, xPos, yPos, scale){
  Phaser.Sprite.call(this, game, xPos, yPos, key, frame);

    game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.anchor.set(0.5);
    this.scale.x = scale;
    this.scale.y = scale;
    this.enableBody = true;
    this.body.immovable = true;
    this.body.setSize(18, 32, 7, 0);
    this.body.gravity.y = playerGravity;
    this.body.velocity.x = mummySpeed;
    //Animations
    //Moving mummies left and right
    this.animations.add('left', [0,1,2], 3, true);
    this.animations.add('right', [3,4], 2, true);
    //Moving mummies right
    this.animations.play('right');
}

mummySpeed = 35;

mummies.prototype = Object.create(Phaser.Sprite.prototype);
mummies.prototype.constructor = mummies;

mummies.prototype.update = function(){
  // Checking collisions with the ghosts and player
  game.physics.arcade.collide(this, mapLayer);
  game.physics.arcade.collide(this, player);
  game.physics.arcade.collide(this, walls);
  this.isGrounded = this.body.blocked.down;

    // player is touching bottom
    // ghost touching up
    // automatically jump when both make contact
    if(this.body.touching.up && player.body.touching.down){
      player.body.velocity.y = -playerJump/2;
    } else if(this.body.touching.left && player.body.touching.right &&
    	hurt == false && ivFrame == false) {
    	ouch();
    	player.body.velocity.y = -200;
    	player.body.velocity.x = -3000;
    } else if(this.body.touching.right && player.body.touching.left
    	&& hurt == false && ivFrame == false) {
    	ouch();
    	player.body.velocity.y = -200;
    	player.body.velocity.x = 3000;
    }

    if(this.body.touching.left || this.body.blocked.left) {
    	this.body.velocity.x = mummySpeed;
    	this.animations.play('right');
	  } else if(this.body.touching.right || this.body.blocked.right){
		   this.body.velocity.x = -mummySpeed;
		   this.animations.play('left');
	  }

}
