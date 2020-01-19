class Physics {

    constructor(enemies, hitbox, input, anims, player, attack, c) {
        this.enemies = enemies
        this.hitbox = hitbox
        this.input = input
        this.anims = anims
        this.player = player
        this.c = c
        this.is_attack = attack;
        this.normal_velocity = 175
        this.twice = 0
        this.is_left = false
        this.physics()
        this.doubleJump();
        // this.attack();
    }

    physics() {
        this.cursors = this.input.keyboard.createCursorKeys()

        if (this.cursors.up.isDown && this.player.body.onFloor()) {     // jumping
            if (this.cursors.up.getDuration() < 400) {
              this.player.body.setVelocityY(this.player.body.velocity.y -= (23 / this.c))
            }
            if (this.cursors.up.getDuration() >= 400 && this.twice < 2) {
              this.player.body.setVelocityY(this.player.body.velocity.y += 10)
            }
          }
      
          if (this.cursors.up.isDown) {                  // jumping
            if (this.cursors.up.getDuration() < 400) {
              this.player.body.setVelocityY(this.player.body.velocity.y -= (23 / this.c))
            }
            if (this.cursors.up.getDuration() >= 400 && this.twice < 2) {
              this.player.body.setVelocityY(this.player.body.velocity.y += (10 / this.c))
            }
          }
      
          if (this.cursors.left.isDown) {     
            this.hitbox.x = this.player.x-37;         //moving left
            this.player.setVelocityX(-this.normal_velocity);
            this.player.setScale(-0.5, 0.5);
            this.player.setOffset(96, 8)
            if (this.is_attack === false)
              this.anims.play('walk', true);
            this.is_left = true
          }
      
          else if (this.cursors.right.isDown) { 
            this.hitbox.x = this.player.x+37;     //moving right
            this.player.setOffset(50, 8)
            this.player.setVelocityX(this.normal_velocity)
            this.player.setScale(0.5, 0.5)
            if (this.is_attack === false)
              this.anims.play('walk', true)
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

      

}