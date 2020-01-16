class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 560,'ground');
    this.platforms.create(700, 560,'ground');
    this.platforms.create(700, 400,'ground').setScale(0.5).refreshBody();

    this.player = this.physics.add.sprite(100,0, 'idle')
    this.player.body.setGravityY(2500);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.platforms, this.player);

    this.player.setSize(80, 90)
    this.player.setOffset(32, 0)
    this.player.setCircle(48);

    this.text = this.add.text(0, 0, "0", { fontFamily: '"Roboto Condensed"' });

    this.is_left = false

    this.twice = 0
    this.h = 0;
    this.acceleration = 20;
    this.max_speed = 581;
    this.doubleJump();

    this.max_velocity = 205;
    this.normal_velocity = 175;

    // this.particles = this.add.particles('prt1');

    // this.emitter = this.particles.createEmitter({
    //     speed: 50,
    //     scale: { start: 0.1, end: 0.1 },
    //     blendMode: 'ADD'
    // })

    // this.emitter.startFollow(this.player)

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 17 }),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 11 }),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: 'if_fly',
      frames: this.anims.generateFrameNumbers('if_fly', { start: 0, end: 5 }),
      frameRate: 20,
      repeat: -1
    })

    this.input.keyboard.on('keydown_P', function () {
      this.scale.toggleFullscreen()
    }, this)

    this.enemies = []
    //enemies
    //enemy(index, x, y, jumpX, jumpY, duration)
    this.enemies.push(this.enemy(0, 500, 520, 0, 430, 1000))
    this.enemies.push(this.enemy(1, 700, 520, 0, 430, 500))
    this.enemies.push(this.enemy(2, 600, 360, 900, 0, 4000))

  }

  update(time, param2) {
    let c = (1000 / param2) / 60;
    this.text.setText((c * 60).toFixed(0) + ' fps') // show fps
    this.cursors = this.input.keyboard.createCursorKeys()

    if (this.cursors.up.isDown && this.player.body.onFloor()) {                  // jumping
      if (this.cursors.up.getDuration() < 400) {
        this.player.body.setVelocityY(this.player.body.velocity.y -= (23 / c))
      }
      if (this.cursors.up.getDuration() >= 400 && this.twice < 2) {
        this.player.body.setVelocityY(this.player.body.velocity.y += 10)
      }
    }

    if (this.cursors.up.isDown) {                  // jumping
      if (this.cursors.up.getDuration() < 400) {
        this.player.body.setVelocityY(this.player.body.velocity.y -= (23 / c))
      }
      if (this.cursors.up.getDuration() >= 400 && this.twice < 2) {
        this.player.body.setVelocityY(this.player.body.velocity.y += (10 / c))
      }
    }

    if (this.cursors.left.isDown) {              //moving left
      this.player.setVelocityX(-this.normal_velocity);
      this.player.setScale(-0.5, 0.5);
      this.player.setOffset(125,0)
      this.player.anims.play('walk', true);
      this.is_left = true
      if(this.normal_velocity <= this.max_velocity) this.normal_velocity+=0.2;
      
    }

    else if (this.cursors.right.isDown) {      //moving right
      this.player.setOffset(32,0)
      this.player.setVelocityX(this.normal_velocity)
      this.player.setScale(0.5, 0.5)
      this.player.anims.play('walk', true)
      this.is_left = false
      if(this.normal_velocity <= this.max_velocity) this.normal_velocity+=0.2;
      
    }

    else {
      this.player.setVelocityX(0)
      if(this.is_left) {
        this.player.setScale(-0.5, 0.5)
        this.player.setOffset(125,0)
      }
      else {
        this.player.setScale(0.5, 0.5)
        this.player.setOffset(32,0)
      } 
      this.player.anims.play('idle', true)
      this.normal_velocity = 175;
      
    }

    if(this.player.body.onFloor())
        this.twice = 0

    if(!this.player.body.onFloor())  {
      this.player.anims.play('if_fly', true)
    }  

    this.touchEnemy()

  }

  doubleJump() {
    this.input.keyboard.on('keydown_UP', function () {
      if(!this.player.body.onFloor() && this.twice === 0) {
        this.twice+=2
        this.player.body.setVelocityY(-500)
      } else if(this.twice < 2) {
        this.twice++
        this.player.body.setVelocityY(-500);
      }
    }, this)
  }

  enemy = function(index, x, y, jumpX, jumpY, duration) {
    this.enm = this.physics.add.sprite(x,y, 'enemy')
    this.enm.setScale(-0.14, 0.14)
    this.enm.name = index.toString()
    this.physics.world.enable(this.enm)
    this.enm.body.immovable = true
    this.enm.body.collideWorldBounds = true
    this.enm.setOffset(440,0)
    
    if(jumpX > 0) {
      this.enm_tween = this.tweens.add({
        targets: this.enm,
        props: {
          x: { value: jumpX.toString(), duration, ease: 'Power2' },
        },
        ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 500,
        repeat: -1,            // -1: infinity
        yoyo: true
     })
    } else if( jumpY > 0 ) {
      this.enm_tween = this.tweens.add({
        targets: this.enm,
        props: {
          y: { value: jumpY.toString(), duration, ease: 'Quad.easeOut' }
        },
        ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 500,
        repeat: -1,            // -1: infinity
        yoyo: true
     })
    }

    return this.enm
  }

  touchEnemy() {
      this.enemies.map( (enemy, index) => {
        if(Math.abs(enemy.y - this.player.y) <= 30 && Math.abs(enemy.x - this.player.x) <= 30)
          console.log('enemy ' + index + ' killed you)')
      })
  }

}