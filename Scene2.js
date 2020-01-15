class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.player = this.physics.add.sprite(100, 552, 'dude');
    this.player2 = this.physics.add.sprite(100, 350, 'dude');

    this.player.body.setGravityY(2500);
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);

    this.text = this.add.text(0,0,this.player.y,{ fontFamily: '"Roboto Condensed"' });
    this.text2 = this.add.text(300,0,"Highest :",{ fontFamily: '"Roboto Condensed"' });

    this.twice = 0
    this.real_time
    this.h = 0;
    this.acceleration = 5000;
    this.drag = 1000;
    this.max_speed = 240;

    this.input.keyboard.on('keydown_W', function(event) {
      this.jump_started = this.real_time
      if(this.player.body.onFloor())
        this.twice = 0
      if(this.twice < 2) {
        this.twice++
        this.player.body.setVelocityY(-500)
      }
    },this)

    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    this.particles = this.add.particles('prt1');

    this.emitter = this.particles.createEmitter({
        speed: 50,
        scale: { start: 0.1, end: 0.1 },
        blendMode: 'ADD'
    })

    this.emitter.startFollow(this.player)
  }

  update(time, param2) {
    let c = (1000/param2)/60;
    this.text.setText('y: ' + Math.abs(this.player.y.toFixed(0) - 552) + ', ' + (c*60).toFixed(0) + ' fps');
    this.h = (Math.abs(this.player.y.toFixed(0) - 552)>this.h)? Math.abs(this.player.y.toFixed(0) - 552) : this.h;
    this.text2.setText("Highest : "+ this.h);
    
    this.cursors = this.input.keyboard.createCursorKeys();
    this.real_time = time
    this.cursors = this.input.keyboard.createCursorKeys();


    if(this.key_W.isDown) {
      if(this.key_W.getDuration() < 400) {
        this.player.body.setVelocityY(this.player.body.velocity.y-=(23/c))
      }
      if(this.key_W.getDuration() >= 400 && this.twice < 2) {
        this.player.body.setVelocityY(this.player.body.velocity.y+=10)
      }
    }

    //key A
    if(this.key_A.isDown) {
      this.player.setVelocityX(-220);
      this.player.body.setAccelerationX(-this.acceleration);
    }

    //key D
    else if(this.key_D.isDown) {
      this.player.setVelocityX(220);
      this.player.body.acceleration.x = this.acceleration;
    }

    else {
      this.player.setVelocityX(0);
      this.player.body.acceleration.x = 0;
    }

}

}