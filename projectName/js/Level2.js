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
    mummy = game.add.audio('mummy');

    //Background
    //test = game.add.sprite(0,0, 'test');
    back = game.add.sprite(0, 0, 'background');
    level = game.add.sprite(0,0, 'B2');
    this.map = game.add.tilemap('level');
    this.map.addTilesetImage('textures2', 'tilesheet');
    this.map.setCollisionByExclusion([]);
    mapLayer = this.map.createLayer('Tile Layer 2');
    mapLayer.resizeWorld();

    //Spikes
    spikes = game.add.group();
    makeSpikes(144, 120, 1);
    makeSpikes(96, 288, 1);
    makeSpikes(480, 336, 1);
    makeSpikes(312, 480, 1);
    makeSpikes(504, 480, 1);
    makeSpikes(120, 576, 3);
    makeSpikes(48, 720, 1);
    makeSpikes(312, 936, 2);
    makeSpikes(0, 1032, 3);
    makeSpikes(336, 1104, 2);
    makeSpikes(120, 1152, 1);
    makeSpikes(192, 1344, 6);
    makeSpikes(504,1344, 4);

    //door
    door = game.add.sprite(30, 1265, 'door');
    door.scale.setTo(.15, .15);
    game.physics.arcade.enable(door);
    door.body.setSize(200,400,280,300);

    //Player
    player = game.add.sprite(16, 32, 'player');
    player.anchor.set(0.5);
    player.scale.setTo(1.5, 1.5);
    game.physics.arcade.enable(player);
    player.body.setSize(13, 32, 10, 0);
    player.body.bounce.y = 0;
    player.body.gravity.y = playerGravity;
    player.body.collideWorldBounds = true;

    //Animations
    //Moving player left
    pLeft = player.animations.add('left', [4, 5, 6], 10, true);
    //Moving player right
    pRight = player.animations.add('right', [1, 2, 3], 10, true);

    //Create ghosts
    var g1Vel = game.rnd.integerInRange(-40,40);
    var g2Vel = game.rnd.integerInRange(-40,40);
    var g3Vel = game.rnd.integerInRange(-40,40);
    var g4Vel = game.rnd.integerInRange(-40,40);
    var g5Vel = game.rnd.integerInRange(-40,40);
    this.ghost1 = new ghosts(game, 'ghost', '4', 264, 336, g1Vel, 1.5);
    game.add.existing(this.ghost1);
    this.ghost2 = new ghosts(game, 'ghost', '4', 192, 744, g2Vel, 1.5);
    game.add.existing(this.ghost2);
    this.ghost3 = new ghosts(game, 'ghost', '4', 552, 1080, g3Vel, 1.5);
    game.add.existing(this.ghost3);
    this.ghost4 = new ghosts(game, 'ghost', '4', 48, 1200, g4Vel, 1.5);
    game.add.existing(this.ghost4);

    // Create Mummies
    this.mummy1 = new mummies(game, 'mummy', '2', 408, 432, 1.3);
    game.add.existing(this.mummy1);
    this.mummy2 = new mummies(game, 'mummy', '2', 144, 552, 1.3);
    game.add.existing(this.mummy2);
    this.mummy3 = new mummies(game, 'mummy', '2', 480, 672, 1.3);
    game.add.existing(this.mummy3);
    this.mummy4 = new mummies(game, 'mummy', '2', 96, 1008, 1.3);
    game.add.existing(this.mummy4);
    this.mummy5 = new mummies(game, 'mummy', '2', 288, 1320, 1.3);
    game.add.existing(this.mummy5);

    //Invisible walls
    walls = game.add.group();
    makeWalls(312,456);
    makeWalls(504, 456);
    makeWalls(48, 576);
    makeWalls(240, 576);
    makeWalls(384, 696);
    makeWalls(240, 1032);

    //light
    light = game.add.sprite(0, 0, 'light');
    game.physics.arcade.enable(light);
    light.scale.setTo(1.9, 1.9);
    light.anchor.set(0.5);
    light.alpha = 0.9;
    glow = game.add.sprite(0, 0, 'glow');
    game.physics.arcade.enable(glow);
    glow.scale.setTo(1.2, 1.2);
    glow.anchor.set(0.5);
    glow.alpha = 0.3;

    //Hearts
    frame = game.add.sprite(420, 0, 'frame');
    frame.scale.setTo(.27, .12);
    hearts = game.add.group();
    health(heartNum);

    // make camera follow player
    game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, 0.2, 0.2);

    // Pauses the game
	  pause_label = game.add.text(520, 80, 'Pause', { font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        // When the pause button is pressed, pause the game
        game.paused = true;
    });
  },
  update: function(){
    if(player.body.velocity.y > 700){
      player.body.velocity.y = 700;
    }
    //mummy noise
    if(mCount < 500){
      mCount++;
    } else {
      mummy.play();
      mCount = 0;
    }
    //light movement
    light.body.x = player.body.x - 940;
    light.body.y = player.body.y - 670;
    glow.body.x = player.body.x - 290;
    glow.body.y = player.body.y - 230;

    //Hearts move ith camera
    hearts.y = game.camera.y + 16;
    frame.y = game.camera.y + 5;
    //Player collisions
    game.physics.arcade.collide(player, mapLayer);

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
    // unpauses the game when u click anywhere
    game.input.onDown.add(unpause, self);

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

    //door
    if(game.physics.arcade.overlap(player, door) == true){
      game.state.start('Level3');
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
      game.state.start('MainMenu');
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
      game.state.start('Level3');
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
