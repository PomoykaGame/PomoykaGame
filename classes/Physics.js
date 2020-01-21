class Physics {

  constructor(input, anims, player) {
    this.enemies = null
    this.hitbox = null
    this.input = input
    this.anims = anims
    this.player = player
    this.is_attack = null
    this.isDamaged = null
    this.normal_velocity = 175
    this.twice
    this.is_left = false
    this.dash_is_available = true
    this.dash_is_playing = false
    this.doubleJump()
    this.dashOn()
  }

  physics(c) {
    this.cursors = this.input.keyboard.createCursorKeys()

    if (this.cursors.up.isDown && this.dash_is_playing === false && !this.isDamaged) {                  // jumping
      if (this.cursors.up.getDuration() < 400) {
        this.player.body.setVelocityY(this.player.body.velocity.y -= (23 / c))
      }
      if (this.cursors.up.getDuration() >= 400 && this.twice < 2) {
        this.player.body.setVelocityY(this.player.body.velocity.y += (10 / c))
      }
    }

    if (this.cursors.left.isDown && this.dash_is_playing === false && !this.isDamaged) {
      this.hitbox.x = this.player.x - 37;         //moving left
      this.player.setVelocityX(-this.normal_velocity);
      this.player.setScale(-0.5, 0.5);
      this.player.setOffset(96, 8)
      if (this.is_attack === false)
        this.anims.play('walk', true);
      this.is_left = true
    }

    else if (this.cursors.right.isDown && this.dash_is_playing === false && !this.isDamaged) {
      this.hitbox.x = this.player.x + 37;     //moving right
      this.player.setOffset(50, 8)
      this.player.setVelocityX(this.normal_velocity)
      this.player.setScale(0.5, 0.5)
      if (this.is_attack === false) {
        this.anims.play('walk', true)
      }
      this.is_left = false
    }

    else {
      if (!this.dash_is_playing && !this.isDamaged)
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
        this.anims.play('idle', true)
    }

    this.normal_velocity = 175;

    if (this.player.body.onFloor())
      this.twice = 0

    if (!this.player.body.onFloor()) {
      if (this.is_attack === false)
        this.anims.play('if_fly', true)
    }

    this.hitbox.y = this.player.y

    if (this.is_left) {
      this.hitbox.x = this.player.x - 37;
    }
    else {
      this.hitbox.x = this.player.x + 37;
    }

  }

  doubleJump() {
    this.input.keyboard.on('keydown_UP', function () {
      if (!this.player.body.onFloor() && this.twice === 0 && this.dash_is_playing === false && !this.isDamaged) {
        this.twice += 2
        this.player.body.setVelocityY(-500)
      } else if (this.twice < 2 && this.dash_is_playing === false && !this.isDamaged) {
        this.twice++
        this.player.body.setVelocityY(-500);
      }
    }, this)
  }

  touchEnemy() {
    if (!this.isDamaged) {
      this.isDamaged = true
      if (this.player.x < this.enemy1.x) {
        this.player.body.velocity.x = -200
        this.player.body.velocity.y = -450
      } else {
        this.player.body.velocity.x = 200
        this.player.body.velocity.y = -450
      }
      this.player.setTint(0xff0000)

      let t = this

      setTimeout(function () {
        t.isDamaged = false;
        t.player.body.velocity.x = 0;
        t.player.body.velocity.y = 0;
        t.player.clearTint();
      }, 430)

      this.hlth.health -= 0.25
      this.hlth.health = this.hlth.health.toFixed(2)
      this.text2.setText('Health : ' + Math.floor(this.hlth.health * 100))
      this.hlth.redrawLifebar();
    }
  }

  async delay(ms) {
    return new Promise(async (resolve) => {
      setTimeout(function () { resolve() }, ms)
    })
  }

  dashOn() {
    //dash left
    this.input.keyboard.on('keydown_Z', async function () {
      if (this.dash_is_available) {
        this.is_left = true
        this.dash_is_available = false
        this.dash_is_playing = true
        this.player.setVelocityX(-700)
        this.player.setVelocityY(0)
        this.player.body.setGravityY(0)
        await this.delay(250)
        this.player.body.setVelocityX(0)
        this.dash_is_playing = false
        this.player.body.setGravityY(2500)
        setTimeout(() => this.dash_is_available = true, 1000)
      }
    }, this)
    //dash right
    this.input.keyboard.on('keydown_X', async function () {
      if (this.dash_is_available) {
        this.is_left = false
        this.dash_is_available = false
        this.dash_is_playing = true
        this.player.body.setVelocityX(700)
        this.player.setVelocityY(0)
        this.player.body.setGravityY(0)
        await this.delay(250)
        this.player.body.setVelocityX(0)
        this.dash_is_playing = false
        this.player.body.setGravityY(2500)
        setTimeout(() => this.dash_is_available = true, 1000)
      }
    }, this)
  }
}