// Level3

var Level3 = function(game) {this.ghost;};
Level3.prototype = {
  preload: function(){
    game.load.tilemap('level', 'assets/img/B3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tilesheet', 'assets/img/B3.png');
    game.load.image('B3', 'assets/img/B3.png');
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
    level = game.add.sprite(0,0, 'B3');
    this.map = game.add.tilemap('level');
    this.map.addTilesetImage('textures3', 'tilesheet');
    this.map.setCollisionByExclusion([]);
    mapLayer = this.map.createLayer('Tile Layer 3');
    mapLayer.resizeWorld();

    //Spikes
    spikes = game.add.group();
    makeSpikes(72,72,1);
    makeSpikes(504,72,1);
    makeSpikes(168, 336 , 1);
    makeSpikes(408, 336, 1);
    makeSpikes(264, 360,3);
    makeSpikes(48,456,1);
    makeSpikes(528,456,1);
    makeSpikes(72, 480 , 2);
    makeSpikes(480,480,2);
    makeSpikes(216, 600, 1);
    makeSpikes(360, 600 ,1);
    makeSpikes(0, 816 , 3);
    makeSpikes(528, 816 , 3);
    makeSpikes(0, 960, 3);
    makeSpikes(192, 984, 2);
    makeSpikes(432,1056, 3);
    makeSpikes(264, 1104, 1);
    makeSpikes(144,1128,2);
    makeSpikes(504,1200,2);
    makeSpikes(216, 1272, 2);
    makeSpikes(360, 1272 ,2);

    //Player
    player = game.add.sprite(400, 32, 'player');
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
    this.ghost1 = new ghosts(game, 'ghost', '4', 288, 552, g1Vel, 1.5);
    game.add.existing(this.ghost1);
    this.ghost2 = new ghosts(game, 'ghost', '4', 456, 960, g2Vel, 1.5);
    game.add.existing(this.ghost2);
    this.ghost3 = new ghosts(game, 'ghost', '4', 48, 1128, g3Vel, 1.5);
    game.add.existing(this.ghost3);

    // Create Mummies
    this.mummy1 = new mummies(game, 'mummy', '2', 24, 24, 1.3);
    game.add.existing(this.mummy1);
    this.mummy2 = new mummies(game, 'mummy', '2', 552, 24, 1.3);
    game.add.existing(this.mummy2);
    this.mummy3 = new mummies(game, 'mummy', '2', 216, 672, 1.3);
    game.add.existing(this.mummy3);
    this.mummy4 = new mummies(game, 'mummy', '2', 96, 1344, 1.3);
    game.add.existing(this.mummy4);
    this.mummy5 = new mummies(game, 'mummy', '2', 504, 1344, 1.3);
    game.add.existing(this.mummy5);

    //Invisible walls
    walls = game.add.group();
    makeWalls(144,696);
    makeWalls(432, 696);
    makeWalls(192, 1368);
    makeWalls(408, 1368);

    //treasure
    treasure = game.add.sprite(275, 1332, 'treasure');
    treasure.scale.setTo(.7, .7);
    game.physics.arcade.enable(treasure);


    //black
    //black = game.add.sprite(0, 0, 'black');
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

    //Pause text
    pauseText = game.add.text(game.camera.x + 120, game.camera.y + 250, 'Paused', { fontSize: '100px', fill: '#000' });
    pauseText.alpha = 0;

    // make camera follow player
    game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, 0.2, 0.2);
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

    if(game.physics.arcade.overlap(player, treasure) == true){
      game.state.start('Winner');
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
