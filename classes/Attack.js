class Attack {

    constructor(enemies, hitbox, input, anims) {
        this.enemies = enemies
        this.hitbox = hitbox
        this.input = input
        this.anims = anims
        this.is_attack = false
        this.delay = false
        this.attack()
    }

    attack() {
        this.input.keyboard.on('keydown_F', function () {
          if (!this.delay) {
            this.enemies.map( (enemy, index) => {
              if(enemy.x - this.hitbox.x <= 30 && enemy.y -this.hitbox.y <= 30){
                // killEnemy();
                console.log("yay");
              }
            })
            this.anims.play('attack', true)
            this.is_attack = true
            this.delay = true;
            let t = this
            setTimeout(function () {
              t.is_attack = false
              t.anims.remove('attack');
            }, 300)
            setTimeout(function () {
              t.delay = false;
            }, 300)
          }
        }, this)
      }

}