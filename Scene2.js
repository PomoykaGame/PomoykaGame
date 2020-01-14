class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.player = this.physics.add.sprite(100, 200, 'dude');
    this.player.body.setGravityY(1000);
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);

    this.playerJumped = false;
    this.i = 0;

  }


  update() {
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.i = 0;
      this.playerJumped = true;
      this.player.setVelocityY(-530);
    }

    else if (this.cursors.up.isDown && this.playerJumped === true) {
      this.i++;
      if (this.i > 40) {
        this.playerJumped = false;
      }
      this.player.body.setGravityY(1000);
    }

    else {
      this.playerJumped = false;
      this.player.body.setGravityY(2000);
    }
     
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    }

    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    }

    else {
      this.player.setVelocityX(0);
    }
  
  }
}