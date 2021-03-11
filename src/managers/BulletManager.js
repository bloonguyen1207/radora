import Bullet from "../models/Bullet";

class BulletManager extends Phaser.Physics.Arcade.Group
{
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 10,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y, velocity) {
        let bullet = this.getFirstDead(false);
        if (bullet) {
            bullet.fire(x, y, velocity);
        }
    }
}

export default BulletManager