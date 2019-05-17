/*
Game: Illinois Johnny
Group #: 55
Names: Joey Cressa, Eric Tseng, Sandy Evsanaa
Github: https://github.com/jcressa/illinoisJohnny
*/
var game= new Phaser.Game(600, 600, Phaser.AUTO);
var playerGravity = 2000;
var playerJump = 725
var playerSpeed = 250;
var yHeart = 16;
var hurt = false;
var heartNum = 3;
var heart1;
var heart2;
var heart3;
var dead = false;
var ghostCounter = 0;
var last = 0;
var lastFrame = 5;
var ivCount = 0;
var ivFrame = false;
var paused = false;
var pauseText;

var MainMenu = function(game) {};
MainMenu.prototype = {
  preload: function(){
    console.log('Mainmenu: preload');
    game.stage.backgroundColor = "#8A8A8A";
    //Starting screen text
    var gameText = game.add.text(180, 100, 'Illinois Johnny',
      { fontSize: '32px', fill: '#FFF' });
    var startText1 = game.add.text(110, 150, 'Use arrow keys to move.',
      { fontSize: '32px', fill: '#FFF' });
    var startText2 = game.add.text(130, 200, 'Press [space] to start.',
      { fontSize: '32px', fill: '#FFF' });
  },
  create: function(){
    console.log('Mainmenu: create');
  },
  update: function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
      game.state.start('Play');
    }
  }
}

var Play = function(game) {};
Play.prototype = {
  preload: function(){
    console.log('Play: preload');
    game.load.image('ground', 'assets/img/platform.png');
    game.load.image('background', 'assets/img/B1.png');
    game.load.image('spike', 'assets/img/spikes_24.png');
    game.load.image('heart', 'assets/img/heart_full.png');
    game.load.image('heartHalf', 'assets/img/heart_half.png');
    game.load.audio('oof', 'assets/audio/oof.mp3');
    game.load.atlas('pAtlas', 'assets/img/player.png', 'assets/img/player.json');
    //game.load.atlas('gAtlas', 'assets/img/ghost.png', 'assets/img/ghost.json');
    game.load.tilemap('level', 'assets/img/B1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tilesheet', 'assets/img/B1.png');
    game.load.spritesheet('ghost', 'assets/img/ghost.png', 32, 24);
    game.stage.backgroundColor = "#8A8A8A";
  },
  create: function(){
    console.log('Play: create');
    //Reset player to alive state
    dead = false;
    heartNum = 3;
    //Enable physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //Set world bounds
    game.world.setBounds(0, 0, 600, 1200);

    //Add noise
    oof = game.add.audio('oof');

    //Background
    //test = game.add.sprite(0,0, 'test');
    back = game.add.sprite(0, 0, 'background');
    this.map = game.add.tilemap('level');
    this.map.addTilesetImage('textures', 'tilesheet');
    this.map.setCollisionByExclusion([]);
    this.mapLayer = this.map.createLayer('Tile Layer 1');
    this.mapLayer.resizeWorld();

    //Spikes
    spikes = game.add.group();
    makeSpikes(504, 288, 4);
    makeSpikes(384, 528, 5);
    makeSpikes(120, 648, 3);
    makeSpikes(408, 960, 4);
    makeSpikes(0, 1128, 12);

    //Player
    player = game.add.sprite(32, 250, 'pAtlas', lastFrame);
    player.anchor.set(0.5);
    player.scale.setTo(.1,.1);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0;
    player.body.gravity.y = playerGravity;
    player.body.collideWorldBounds = true;

    //Animations
    //Moving player left
    pLeft = player.animations.add('left', [0, 1, 2, 3], 10, true);
    //Moving player right
    pRight = player.animations.add('right', [5, 6, 7, 8], 10, true);

    //Hitboxes
    hitboxes = game.add.group();
    hitboxes.enableBody = true;
    player.addChild(hitboxes);
    sideAtt = hitboxes.create(0,0,null);
    sideAtt.body.enable = false;
    //sideAtt.body.setSize(0, 0, 0, 0);

    //Ghost
    ghost = game.add.sprite(140, 860, 'ghost', '4');
    ghost.anchor.set(0.5);
    ghost.scale.setTo(1.5,1.5);
    game.physics.arcade.enable(ghost);
    ghost.body.setSize(24, 32, 5, 0);
    //Animations
    //Moving ghost left
    ghost.animations.add('left', [0, 1, 2, 3, 4, 5], 10, true);
    //Moving ghost right
    //ghost.animations.add('right', [4, 5, 6, 7], 10, true);
    ghost.animations.play('left');

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
        lastFrame = 3;
      }else if(cursors.right.isDown){
        //Moving right
        player.body.velocity.x = playerSpeed;
        player.animations.play('right');
        last = 1;
        lastFrame = 5;
      }else{
        //Standing
        if(last == 0){
          //player.animations.play('iLeft');
          player.frame = 3;
        } else {
          //player.animations.play('iRight');
          player.frame = 5;
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
    if(game.physics.arcade.overlap(player, spikes) == false && hurt == true){
      hurt = false;
    }
    //Ghost collision with attack
    if(game.physics.arcade.overlap(ghost, sideAtt) == true){
      ghost.kill();
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
    game.debug.body(sideAtt);
    //game.debug.body(player);
    //game.debug.body(ghost);
  }
}

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
      game.state.start('Play');
    }
  }
}

//Creates a line of spikes
function makeSpikes(xPos, yPos, n){
  for(var i = 0; i < n; i += 1){
    var spike = spikes.create(xPos,yPos, 'spike');
    game.physics.arcade.enable(spike);
    spike.enableBody = true;
    spike.body.immovable = true;
    xPos += 24;
  }
}

//Creates players attack hitbox
function makeHitBox(){
  //Side Attack
  attacked = true;
  sideAtt = hitboxes.create(0,0,null);
  sideAtt.body.setSize(0,0,0,0);
  if(last == 0){
    //sideAtt.scale.setTo(-1, 1);
    sideAtt.body.setSize(48,16,-50,-10);
  } else if(last == 1){
    //sideAtt.scale.setTo(1, 1);
    sideAtt.body.setSize(48,16, 0, -10);
  }
  sideAtt.body.allowGravity = false;
  sideAtt.body.enable = true;
}

//Destroys the hitbox off the attack
function killBox(){
  sideAtt.destroy();
}

//Updates the players current health
function health(heartNum){
  hearts = game.add.group();
  //Kills off previous heart sprites and creates new updated health
  if(heartNum == 3){
    heart1 = hearts.create(225,yHeart, 'heart');
    heart2 = hearts.create(275,yHeart, 'heart');
    heart3 = hearts.create(325,yHeart, 'heart');
  } else if(heartNum == 2.5){
    heart1.kill();
    heart2.kill();
    heart3.kill();
    heart1 = hearts.create(225,yHeart, 'heart');
    heart2 = hearts.create(275,yHeart, 'heart');
    heart3 = hearts.create(325,yHeart, 'heartHalf');
  } else if(heartNum == 2){
    heart1.kill();
    heart2.kill();
    heart3.kill();
    heart1 = hearts.create(225,yHeart, 'heart');
    heart2 = hearts.create(275,yHeart, 'heart');
  } else if(heartNum == 1.5){
    heart1.kill();
    heart2.kill();
    heart1 = hearts.create(225,yHeart, 'heart');
    heart2 = hearts.create(275,yHeart, 'heartHalf');
  } else if(heartNum == 1){
    heart1.kill();
    heart2.kill();
    heart1 = hearts.create(225,yHeart, 'heart');
  } else if(heartNum == .5){
    heart1.kill();
    heart1 = hearts.create(225,yHeart, 'heartHalf');
  } else {
    heart1.kill();
    dead = true;
  }
}

game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
