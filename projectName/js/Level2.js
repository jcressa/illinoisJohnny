// Level2

var Level2 = function(game) {this.ghost;};
Level2.prototype = {
  preload: function(){
    game.load.tilemap('level', 'assets/img/B2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tilesheet', 'assets/img/B2.png');
    game.load.image('B2', 'assets/img/B2.png');
  },
  create: function(){
    console.log('Play: create');
    //Reset player to alive state
    dead = false;
    //heartNum = 3;
    //Enable physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //Set world bounds
    game.world.setBounds(0, 0, 600, 1200);

    //Add noise
    oof = game.add.audio('oof');

    //Background
    //test = game.add.sprite(0,0, 'test');
    back = game.add.sprite(0, 0, 'background');
    level = game.add.sprite(0,0, 'B2');
    this.map = game.add.tilemap('level');
    this.map.addTilesetImage('textures2', 'tilesheet');
    this.map.setCollisionByExclusion([]);
    this.mapLayer = this.map.createLayer('Tile Layer 2');
    this.mapLayer.resizeWorld();

    //Spikes
    spikes = game.add.group();
    makeSpikes(504, 145, 4);
    makeSpikes(384, 458, 5);
    makeSpikes(240, 600, 2);
    makeSpikes(285, 935, 3);
    makeSpikes(0, 1035, 10);
    makeSpikes(504, 1222, 2);

    //Player
    player = game.add.sprite(32, 32, 'player', '0');
    player.anchor.set(0.5);
    player.scale.setTo(1.5, 1.5);
    game.physics.arcade.enable(player);
    player.body.setSize(24, 32, 5, 0);
    player.body.bounce.y = 0;
    player.body.gravity.y = playerGravity;
    player.body.collideWorldBounds = true;

    //Animations
    //Moving player left
    pLeft = player.animations.add('left', [4, 5, 6], 10, true);
    //Moving player right
    pRight = player.animations.add('right', [1, 2, 3], 10, true);

    //Hitboxes
    hitboxes = game.add.group();
    hitboxes.enableBody = true;
    player.addChild(hitboxes);
    sideAtt = hitboxes.create(0,0,null);
    sideAtt.body.enable = false;
    //sideAtt.body.setSize(0, 0, 0, 0);

    //Create ghosts
    var g1Vel = game.rnd.integerInRange(-40,40);
    var g2Vel = game.rnd.integerInRange(-40,40);
    var g3Vel = game.rnd.integerInRange(-40,40);
    var g4Vel = game.rnd.integerInRange(-40,40);
    var g5Vel = game.rnd.integerInRange(-40,40);
    this.ghost1 = new ghosts(game, 'ghost', '4', 140, 860, g1Vel, 1.5);
    game.add.existing(this.ghost1);
    this.ghost2 = new ghosts(game, 'ghost', '4', 32, 200, g2Vel, 1.5);
    game.add.existing(this.ghost2);
    this.ghost3 = new ghosts(game, 'ghost', '4', 390, 500, g3Vel, 1.5);
    game.add.existing(this.ghost3);
    this.ghost4 = new ghosts(game, 'ghost', '4', 470, 850, g4Vel, 1.5);
    game.add.existing(this.ghost4);
    this.ghost5 = new ghosts(game, 'ghost', '4', 200, 750, g5Vel, 1.5);
    game.add.existing(this.ghost5);


    //Hearts
    hearts = game.add.group();
    health(heartNum);

    //Pause text
    pauseText = game.add.text(game.camera.x + 120, game.camera.y + 250, 'Paused', { fontSize: '100px', fill: '#000' });
    pauseText.alpha = 0;

    // make camera follow player
    game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, 0.2, 0.2);
  },
  update: function(){
    //Hearts move ith camera
    hearts.y = game.camera.y + 16;
    //Player collisions
    game.physics.arcade.collide(player, this.mapLayer);
    game.physics.arcade.collide(this.mapLayer, spikes);

    //Creates collision between player and platforms
    this.isGrounded = player.body.blocked.down;
    //var hitGround = game.physics.arcade.collide(player, this.mapLayer);
    cursors = game.input.keyboard.createCursorKeys();
    //Stop moving player
    player.body.velocity.x = 0;

    if(paused == false){
      if(cursors.left.isDown){
        //Moving left
        player.body.velocity.x = -playerSpeed;
        player.animations.play('left');
        last = 0;
        lastFrame = 4;
      }else if(cursors.right.isDown){
        //Moving right
        player.body.velocity.x = playerSpeed;
        player.animations.play('right');
        last = 1;
        lastFrame = 1;
      }else{
        //Standing
        if(last == 0){
          //player.animations.play('iLeft');
          player.frame = 4;
        } else {
          //player.animations.play('iRight');
          player.frame = 1;
        }
        //player.frame = 4;
      }
      player.body.gravity.y = playerGravity;

      //Player can jump if they're on the ground
      if (cursors.up.isDown && this.isGrounded){
        player.body.velocity.y = -playerJump;
      }
    }

    //Plays sound and decrements health when the player hits spikes
    if(game.physics.arcade.overlap(player, spikes) == true && hurt == false
    && ivFrame == false){
      oof.play();
      hurt = true;
      heartNum -= .5;
      health(heartNum);
      if(ivFrame == false){
        ivFrame = true;
      }
    }
    //Plays sound and decrements health when the player hits ghost
    if(game.physics.arcade.overlap(player, this.ghost1) == true
    && hurt == false && ivFrame == false && !this.ghost1.body.touching.up && !player.body.touching.down){
      ouch();
    } else if(game.physics.arcade.overlap(player, this.ghost2) == true
    && hurt == false && ivFrame == false && !this.ghost2.body.touching.up && !player.body.touching.down){
      ouch();
    } else if(game.physics.arcade.overlap(player, this.ghost3) == true
    && hurt == false && ivFrame == false && !this.ghost3.body.touching.up && !player.body.touching.down){
      ouch();
    } else if(game.physics.arcade.overlap(player, this.ghost4) == true
    && hurt == false && ivFrame == false && !this.ghost4.body.touching.up && !player.body.touching.down){
      ouch();
    } else if(game.physics.arcade.overlap(player, this.ghost5) == true
    && hurt == false && ivFrame == false && !this.ghost5.body.touching.up && !player.body.touching.down){
      ouch();
    }

    //IV Frames
    if(ivFrame == true){
      if(ivCount < 120){
        player.alpha = 0.5;
        ivCount++;
      } else {
        player.alpha = 1;
        ivFrame = false;
        ivCount = 0;
        hurt = false;
      }
    }

    //In-game pause
    if(game.input.keyboard.downDuration(Phaser.Keyboard.P)){
      if(paused == false){
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.body.gravity.y = 0;
        player.animations.stop(null, true);
        paused = true;
        pauseText.x = game.camera.x + 120;
        pauseText.y = game.camera.y + 250;
        pauseText.alpha = 1;
      } else {
        paused = false;
        player.animations.play('left');
        player.body.gravity.y = playerGravity;
        pauseText.alpha = 0;
      }
    }

    //Checks if the player has moved off of the spikes to reset
    if(game.physics.arcade.overlap(player, spikes) == false
    && game.physics.arcade.overlap(player, this.ghost1) == false
    && game.physics.arcade.overlap(player, this.ghost2) == false
    && game.physics.arcade.overlap(player, this.ghost3) == false
    && game.physics.arcade.overlap(player, this.ghost4) == false
    && game.physics.arcade.overlap(player, this.ghost5) == false
    && hurt == true && ivFrame == false){
      hurt = false;
    }

    //Attack
    if(game.input.keyboard.downDuration(Phaser.Keyboard.F)){
      makeHitBox();
      game.time.events.add(Phaser.Timer.SECOND * 1, killBox, this);
    }

    //Death
    if(dead == true){
      game.state.start('GameOver');
    }
  },
  render: function(){
    //game.debug.body(sideAtt);
    //game.debug.body(player);
    //game.debug.body(ghost);
  }
}
