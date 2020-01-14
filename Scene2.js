class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
  this.player = this.physics.add.sprite(100, 200, 'dude');
  this.player.body.setGravity(0, 600);
  this.player.setBounce(0);
  this.player.setCollideWorldBounds(true);
  }

  update(){

  }
}