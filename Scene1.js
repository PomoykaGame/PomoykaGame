class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.spritesheet('dude', 'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
    this.load.image('prt1', 'http://labs.phaser.io/assets/particles/green.png');
  }

  create() {
    this.scene.start("playGame");
  }
}
