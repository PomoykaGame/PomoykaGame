class Attack {

    constructor(enemies, hitbox, input, anims) {
        this.enemies = enemies
        this.hitbox = hitbox
        this.input = input
        this.anims = anims
        this.is_attack = false
        this.delay = false
        this.attack();
    }

    attack() {
        this.input.keyboard.on('keydown_F', function () {
          if (!this.delay) {
          
            this.enemies.children.iterate(function(child){
              if(Math.abs(child.x - this.hitbox.x) <= 15 && Math.abs(child.y -this.hitbox.y <= 30)){
                // killEnemy();
                console.log("yay");
              }
            }, this)
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