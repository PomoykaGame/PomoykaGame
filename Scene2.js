class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.player = this.physics.add.sprite(100, 552, 'sprite1');
    this.player.setScale(0.6)
    this.player.body.setGravityY(2500);
    this.player.setCollideWorldBounds(true);

    this.text = this.add.text(0, 0, "0", { fontFamily: '"Roboto Condensed"' });

    this.twice = 0
    this.real_time
    this.h = 0;
    this.acceleration = 20;
    this.max_speed = 581;
    this.doubleJump();

    // this.particles = this.add.particles('prt1');

    // this.emitter = this.particles.createEmitter({
    //     speed: 50,
    //     scale: { start: 0.1, end: 0.1 },
    //     blendMode: 'ADD'
    // })

    // this.emitter.startFollow(this.player)

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('sprite1', { start: 0, end: 17 }),
      frameRate: 10,
      repeat: -1
  });
 
  }

  update(time, param2) {
    let c = (1000 / param2) / 60;
    this.text.setText((c * 60).toFixed(0) + ' fps'); // show fps

    this.real_time = time
    this.cursors = this.input.keyboard.createCursorKeys();

    if (this.cursors.up.isDown) {                  // jumping
      if (this.cursors.up.getDuration() < 400) {
        this.player.body.setVelocityY(this.player.body.velocity.y -= (23 / c))
      }
      if (this.cursors.up.getDuration() >= 400 && this.twice < 2) {
        this.player.body.setVelocityY(this.player.body.velocity.y += 10)
      }
    }

    if (this.cursors.left.isDown) {              //moving left
      this.player.setVelocityX(-200);
      this.player.setScale(-0.6,0.6);
      this.player.anims.play('right', true);
    }

    else if (this.cursors.right.isDown) {      //moving right
      this.player.setVelocityX(200);
      this.player.setScale(0.6,0.6)
      this.player.anims.play('right', true);
    }

    else {
      this.player.setVelocityX(0);
    }

  }

  doubleJump() {
    this.input.keyboard.on('keydown_UP', function () {
      this.jump_started = this.real_time;
      if (this.player.body.onFloor())
        this.twice = 0;
      if (this.twice < 2) {
        this.twice++;
        this.player.body.setVelocityY(-500);
      }
    }, this)
  }
}