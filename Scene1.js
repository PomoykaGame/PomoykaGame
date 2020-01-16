class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.spritesheet('walk', 'assets/sprite1.png',
      { frameWidth: 160, frameHeight: 113.3 }
    )
    this.load.spritesheet('idle', 'assets/idle.png',
      { frameWidth: 160, frameHeight: 113 }
    )
    this.load.spritesheet('if_fly', 'assets/in_fly.png',
      { frameWidth: 160, frameHeight: 113 }
    )
    this.load.spritesheet('attack', 'assets/attack.png',
      { frameWidth: 160, frameHeight: 113 }
    )
    this.load.image('prt1', 'http://labs.phaser.io/assets/particles/green.png');
    this.load.image('ground', 'assets/platform.png')
    this.load.image('enemy', 'assets/enemy1.png')
    this.load.image('background1', 'assets/background1.png')
  }

  create() {
    this.scene.start("playGame");

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 17 }),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('idle', { start: 1, end: 11 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'if_fly',
      frames: this.anims.generateFrameNumbers('if_fly', { start: 0, end: 5 }),
      frameRate: 20,
      repeat: -1
    })

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('attack', { start: 5, end: 11 }),
      frameRate: 20,
      repeat: -1
    })
  }
  
  

}
