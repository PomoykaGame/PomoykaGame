class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 560, 'ground')
    this.platforms.create(700, 560, 'ground')
    this.platforms.create(700, 400, 'ground').setScale(0.5).refreshBody()

    this.player = this.physics.add.sprite(100, 0, 'idle')
    this.player.body.setGravityY(2500);
    this.player.setCollideWorldBounds(true);

    this.enemy_with_hp = this.physics.add.sprite(300, 520, 'enemy')
    this.enemy_with_hp.setScale(0.15, 0.15)
    this.enemy_hp = 300

    this.health_color = 'hsl(0, 100%, 50%)'
    this.health = 1
    this.lifeBar = this.add.graphics();
    this.redrawLifebar();

    this.physics.add.collider(this.platforms, this.player);

    this.player.setSize(45, 90)

    this.text = this.add.text(0, 0, "0", { fontFamily: '"Roboto Condensed"' });

    this.is_left = false

    this.twice = 0
    this.h = 0;
    this.acceleration = 20;
    this.max_speed = 581;
    this.doubleJump();

    this.normal_velocity = 175;

    this.is_attack = false
    this.delay = false

    this.attack();

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

    this.lifeBar.x = this.player.x - 1
    this.lifeBar.y = this.player.y

    if (this.cursors.up.isDown && this.player.body.onFloor()) {     // jumping
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
      this.player.setOffset(96, 8)
      if (this.is_attack === false)
        this.player.anims.play('walk', true);
      this.is_left = true
    }

    else if (this.cursors.right.isDown) {      //moving right
      this.player.setOffset(50, 8)
      this.player.setVelocityX(this.normal_velocity)
      this.player.setScale(0.5, 0.5)
      if (this.is_attack === false)
        this.player.anims.play('walk', true)
      this.is_left = false
    }

    else {
      this.player.setVelocityX(0)
      if (this.is_left) {
        this.player.setScale(-0.5, 0.5)
        this.player.setOffset(96, 8)
      }
      else {
        this.player.setScale(0.5, 0.5)
        this.player.setOffset(50, 8)
      }
      if (this.is_attack === false)
        this.player.anims.play('idle', true)
    }

    this.normal_velocity = 175;

    if (this.player.body.onFloor())
      this.twice = 0

    if (!this.player.body.onFloor()) {
      if (this.is_attack === false)
        this.player.anims.play('if_fly', true)
    }

    this.touchEnemy()

  }

  doubleJump() {
    this.input.keyboard.on('keydown_UP', function () {
      if (!this.player.body.onFloor() && this.twice === 0) {
        this.twice += 2
        this.player.body.setVelocityY(-500)
      } else if (this.twice < 2) {
        this.twice++
        this.player.body.setVelocityY(-500);
      }
    }, this)
  }

  enemy(index, x, y, jumpX, jumpY, duration) {
    this.enm = this.physics.add.sprite(x, y, 'enemy')
    this.enm.setScale(-0.14, 0.14)
    this.enm.name = index.toString()
    this.physics.world.enable(this.enm)
    this.enm.body.immovable = true
    this.enm.body.collideWorldBounds = true
    this.enm.setOffset(440, 0)

    if (jumpX > 0) {
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
    } else if (jumpY > 0) {
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
      if(Math.abs(enemy.y - this.player.y) <= 30 && Math.abs(enemy.x - this.player.x) <= 30) {
        console.log('health: ' + this.health)
        if(this.health > 0) {
          this.health -= 0.01
          this.health = this.health.toFixed(2)
        }
        this.redrawLifebar()
      }
    })
}

redrawLifebar() {
  this.health_color = this.getColorForPercentage(this.health)
  this.width = 50
  this.height = -90
  this.lifeBar.clear()
  this.lifeBar.fillStyle(this.health_color, 1)
  this.lifeBar.fillRect(
    -this.width / 2,
    this.height / 2,
    this.width * this.health,
    8
  );
  this.lifeBar.setDepth(1)
}

getColorForPercentage = function(pct) {
  let percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];
  for (var i = 1; i < percentColors.length - 1; i++) {
      if (pct < percentColors[i].pct) {
          break;
      }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
  };
  return this.fullColorHex(color.r, color.g, color.b)
} 

rgbToHex(rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

fullColorHex(r,g,b) {   
  var red = this.rgbToHex(r);
  var green = this.rgbToHex(g);
  var blue = this.rgbToHex(b);
  return '0x' + red+green+blue;
}

  attack() {
    this.input.keyboard.on('keydown_F', function () {
      if (!this.delay) {
        this.player.anims.play('attack', true)
        this.is_attack = true
        this.delay = true;
        let t = this
        setTimeout(function () {
          t.is_attack = false
          t.player.anims.remove('attack');
        }, 300)
        setTimeout(function () {
          t.delay = false;
        }, 300)
      }
    }, this)
  }

}