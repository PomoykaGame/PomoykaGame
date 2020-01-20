class Scene2 extends Phaser.Scene {

  constructor() {
    super("playGame");
  }

  create() {
    this.add.image(0, 0, 'background1').setOrigin(0).setScale(0.54);
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 560, 'ground')
    this.platforms.create(700, 560, 'ground')
    this.platforms.create(700, 400, 'ground').setScale(0.5).refreshBody()

    this.player = this.physics.add.sprite(100, 0, 'idle')
    this.player.body.setGravityY(2500);
    this.player.setCollideWorldBounds(true);

    this.killEnemy();

    this.hitbox = this.physics.add.sprite(120, 500);   
    this.hitbox.body.setSize(10,30);

    this.enemy_with_hp = this.physics.add.sprite(300, 520, 'enemy')
    this.enemy_with_hp.setScale(0.15, 0.15)
    this.enemy_hp = 300

   

    this.physics.add.collider(this.platforms, this.player);

    this.player.setSize(45, 90)

    this.text = this.add.text(972, 0, "0", { fontFamily: '"Roboto Condensed"' });

    this.text2 = this.add.text(10, 15, "Health : 100", { fontFamily: '"Roboto Condensed"' });
    this.text2.setFontSize(25);


    this.h = 0;
    this.acceleration = 20;
    this.max_speed = 581;
    


    this.input.keyboard.on('keydown_P', function () {
      this.scale.toggleFullscreen()
    }, this)

    this.is_left = false;

    this.enemies = []
    //enemies
    //enemy(index, x, y, jumpX, jumpY, duration)
    this.enemies.push(this.enemy(0, 500, 520, 0, 0, 1000))
    this.enemies.push(this.enemy(1, 700, 520, 0, 430, 500))
    this.enemies.push(this.enemy(2, 600, 360, 900, 0, 4000))

    this.physics.add.collider(this.player, this.enemies);
    this.physics.add.collider(this.enemies, this.player)

    //Healthbar
    this.lifeBar = this.add.graphics()
    this.hlth = new Healthbar(this.lifeBar)

    
    this.attack = new Attack(this.enemies, this.hitbox, this.input, this.player.anims)
    
  }

  update(time, param2) {
    let c = (1000 / param2) / 60;
    this.text.setText((c * 60).toFixed(0) + ' fps') // show fps
  
    this.physics = new Physics(this.enemies, this.hitbox, this.input, this.player.anims, this.player, this.attack.is_attack, c, this.is_left);

    this.is_left = this.physics.is_left

    
 
    this.touchEnemy();

    
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
        if(this.hlth.health > 0) {
          this.hlth.health -= 0.01
          this.hlth.health = this.hlth.health.toFixed(2)
          this.text2.setText('Health : ' + Math.floor(this.hlth.health*100))
        }
        this.hlth.redrawLifebar()
      }
    })
  }

  killEnemy(){
    console.log("You killed enemy!");
  }
}