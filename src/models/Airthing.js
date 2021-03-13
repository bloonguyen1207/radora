import {SCREEN_HEIGHT} from "../commons/constants";

class Airthing extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'radon');
    }

    deactivate () {
        this.setActive(false);
        this.setVisible(false);
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        if (this.y >= SCREEN_HEIGHT) { this.deactivate() }
    }
}

export default Airthing