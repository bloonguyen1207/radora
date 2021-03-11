class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'bullet');
    }

    fire (x, y, velocity) {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-velocity);
    }

    deactivate () {
        this.setActive(false);
        this.setVisible(false);
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        if (this.y <= -16) { this.deactivate() }
    }
}

export default Bullet