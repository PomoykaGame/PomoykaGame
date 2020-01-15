const config = {
  width: 1024,
  height: 576,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  parent: 'game',
  backgroundColor: 0x9990,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade:{
        debug: true,
        debugShowVelocity: true
    }
  }
}

const game = new Phaser.Game(config);