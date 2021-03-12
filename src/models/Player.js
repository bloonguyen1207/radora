export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, playerType) {
        super(scene, x, y, playerType);
    }

    kill() {
        this.setActive(false);
        this.setVisible(false);
    }
}