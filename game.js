const config = {
  width: 1024,
  height: 576,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade:{
        debug: false,
        debugShowVelocity: true
    }
  }
}

const game = new Phaser.Game(config);