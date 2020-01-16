function Enemy(physics, tweens, index, x, y, jumpX, jumpY, duration) {
    this.enm = physics.add.sprite(x, y, 'enemy')
    this.enm.setScale(-0.14, 0.14)
    this.enm.name = index.toString()
    physics.world.enable(this.enm)
    this.enm.body.immovable = true
    this.enm.body.collideWorldBounds = true
    this.enm.setOffset(440, 0)

    if (jumpX > 0) {
      this.enm_tween = tweens.add({
        targets: this.enm,
        props: {
          x: { value: jumpX.toString(), duration, ease: 'Power2' },
        },
        ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 500,
        repeat: -1,            // -1: infinity
        yoyo: true
      })
    } else if (jumpY > 0) {
      this.enm_tween = tweens.add({
        targets: this.enm,
        props: {
          y: { value: jumpY.toString(), duration, ease: 'Quad.easeOut' }
        },
        ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 500,
        repeat: -1,            // -1: infinity
        yoyo: true
      })
    }

    return this.enm
}