class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.spritesheet('dude', 'assets/dude.png',
    { frameWidth: 32, frameHeight: 48 }
  );
  }

  create() {
    this.scene.start("playGame");
  }
}
