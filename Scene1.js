class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.spritesheet('sprite1', 'assets/sprite1.png',
      { frameWidth: 160, frameHeight: 113.3 }
    );
    this.load.image('prt1', 'http://labs.phaser.io/assets/particles/green.png');
    this.load.image('ground', 'assets/platform.png')
  }

  create() {
    this.scene.start("playGame");
  }
}
