class Scene2 extends Phaser.Scene {

  constructor() {
    super("playGame");
  }

  create() {
    this.add.image(0, 0, 'background1').setOrigin(0).setScale(0.54);
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(90, 560, 'ground').setScale(0.5).refreshBody()
    this.platforms.create(270, 560, 'ground').setScale(0.5).refreshBody()
    this.platforms.create(450, 560, 'ground').setScale(0.5).refreshBody()
    this.platforms.create(630, 560, 'ground').setScale(0.5).refreshBody()
    this.platforms.create(810, 560, 'ground').setScale(0.5).refreshBody()
    this.platforms.create(990, 560, 'ground').setScale(0.5).refreshBody()
    this.platforms.create(630, 410, 'ground').setScale(0.5).refreshBody()
    this.platforms.create(810, 410, 'ground').setScale(0.5).refreshBody()

    this.player = this.physics.add.sprite(100, 0, 'idle')
    this.player.body.setGravityY(2500)
    this.player.setCollideWorldBounds(true)
    this.player.setSize(45, 90)

    this.hitbox = this.physics.add.sprite(120, 500)
    this.hitbox.body.setSize(10, 30)

    this.physics.add.collider(this.platforms, this.player)

    this.text = this.add.text(972, 0, "0", { fontFamily: '"Roboto Condensed"' })

    this.text2 = this.add.text(10, 15, "Health : 100", { fontFamily: '"Roboto Condensed"' })
    this.text2.setFontSize(25);

    this.input.keyboard.on('keydown_P', function () {
      this.scale.toggleFullscreen()
    }, this)

    this.lifeBar_enemy = []
    this.enemy_hlth = []
    this.enemy_hlth_changed = []

    this.enemies = this.physics.add.group();
    this.enemy1 = this.enemies.create(400, 485, 'enemy').setScale(0.12);
    this.enemy2 = this.enemies.create(600, 500, 'enemy').setScale(0.12);
    this.enemies.children.iterate(function (child, i) {
      this.lifeBar_enemy[i] = this.add.graphics()
      this.enemy_hlth[i] = new Healthbar(this.lifeBar_enemy[i], true)
      this.enemy_hlth[i].health = 1
      this.enemy_hlth[i].changed = false
      child.setGravityY(2500)
      child.setCollideWorldBounds(true)
      child.setBounceX(1)
      child.setVelocityX(50)
      child.setSize(250, 310)
      child.setOffset(100, 70)
    }, this)
    this.physics.add.collider(this.enemies, this.platforms)
    this.isDamaged = false;

    //Healthbar
    this.lifeBar = this.add.graphics()
    this.hlth = new Healthbar(this.lifeBar, false)
    this.attack = new Attack(this.enemies, this.hitbox, this.input, this.player.anims, this.enemy_hlth, this.player)

    this.phcs = new Physics(this.input, this.player.anims, this.player)
    this.physics.add.overlap(this.player, this.enemies, this.phcs.touchEnemy, null, this)
  }

  update(time, param2) {
    let c = (1000 / param2) / 60
    this.phcs.enemies = this.enemies
    this.phcs.hitbox = this.hitbox
    this.phcs.is_attack = this.attack.is_attack
    this.phcs.isDamaged = this.isDamaged
    this.phcs.physics(c)
    this.text.setText((c * 60).toFixed(0) + ' fps') // show fps

    this.enemies.children.iterate(function (child, i) {
      if (child === undefined) {
        console.log("asd")
      } else {
        this.lifeBar_enemy[i].x = child.x
        this.lifeBar_enemy[i].y = child.y
        if (this.enemy_hlth[i].changed)
          this.enemy_hlth[i].enemyRedrawLifebar()
        if (this.enemy_hlth[i].health <= 0.05) {
          child.disableBody(true, true)
        }
      }
    }, this)
  }
}