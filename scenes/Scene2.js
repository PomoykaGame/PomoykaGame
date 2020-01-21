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
    this.player.body.setGravityY(2500)
    this.player.setCollideWorldBounds(true)

    this.hitbox = this.physics.add.sprite(120, 500)
    this.hitbox.body.setSize(10,30)

    this.physics.add.collider(this.platforms, this.player)

    this.player.setSize(45, 90)

    this.text = this.add.text(972, 0, "0", { fontFamily: '"Roboto Condensed"' })

    this.text2 = this.add.text(10, 15, "Health : 100", { fontFamily: '"Roboto Condensed"' })
    this.text2.setFontSize(25);

    this.h = 0
    this.acceleration = 20
    this.max_speed = 581

    this.input.keyboard.on('keydown_P', function () {
      this.scale.toggleFullscreen()
    }, this)

    this.is_left = false;
    this.lifeBar_enemy = {}
    this.enemy_hlth = {}
    this.enemy_hlth_changed = {}

    this.enemies = this.physics.add.group();
    this.enemy1 = this.enemies.create(400,500,'enemy').setScale(0.12);
    this.enemies.children.iterate(function(child){
      this.lifeBar_enemy.child = this.add.graphics()
      this.enemy_hlth.child = new Healthbar(this.lifeBar_enemy.child, true)
      this.enemy_hlth.child.health = 1
      this.enemy_hlth.child.changed = false
      child.setGravityY(2500)
      child.setCollideWorldBounds(true)
      child.setBounceX(1)
      child.setVelocityX(50)
    }, this)
    this.physics.add.collider(this.enemies, this.platforms)
    this.physics.add.collider(this.player, this.enemies, this.touchEnemy, null, this)
    this.isDamaged = false;

    //Healthbar
    this.lifeBar = this.add.graphics()
    this.hlth = new Healthbar(this.lifeBar, false)
    this.attack = new Attack(this.enemies, this.hitbox, this.input, this.player.anims, this.enemy_hlth)

    this.dash_is_available = true
    this.dash_is_playing = false
    this.dashOn()
    this.phcs = new Physics(this.input, this.player.anims, this.player)
  }

  update(time, param2) {
    let c = (1000 / param2) / 60
    this.phcs.dash_is_playing = this.dash_is_playing
    this.phcs.enemies = this.enemies
    this.phcs.hitbox = this.hitbox
    this.phcs.is_attack = this.attack.is_attack
    this.phcs.is_left = this.is_left
    this.phcs.isDamaged = this.isDamaged
    this.phcs.physics(c)
    this.text.setText((c * 60).toFixed(0) + ' fps') // show fps
    this.is_left = this.phcs.is_left
    // this.touchEnemy();

    this.enemies.children.iterate(function(child){
      this.lifeBar_enemy.child.x = child.x
      this.lifeBar_enemy.child.y = child.y
      if(this.enemy_hlth.child.changed) 
        this.enemy_hlth.child.enemyRedrawLifebar()
      if(this.enemy_hlth.child.health <= 0) {
        this.enemies.remove(child, true, true)
      }  
    }, this)
  }

  touchEnemy() {
    if (!this.isDamaged) {
      this.isDamaged = true
      if(this.player.x < this.enemy1.x) {
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
    return new Promise(async(resolve) => {
      setTimeout(function(){resolve()}, ms)
    }) 
  }

  dashOn() {
    //dash left
    this.input.keyboard.on('keydown_Z', async function () {
        if(this.dash_is_available) {
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
        if(this.dash_is_available) {
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