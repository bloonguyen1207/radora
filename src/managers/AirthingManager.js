import Airthing from "../models/Airthing";
import {SCREEN_WIDTH} from "../commons/constants";

class AirthingManager extends Phaser.Physics.Arcade.Group
{
    constructor(scene) {
        super(scene.physics.world, scene);

        this.maxSize = 50
        this.defaultKey = 'radon'
        this.classType = Airthing
    }

    spawnAirthing() {
        const airthing = this.get(Phaser.Math.RND.between(30, SCREEN_WIDTH - 30), 0);

        if(!airthing) return;

        airthing
            .setActive(true)
            .setVisible(true)
            .setTint(Phaser.Display.Color.RandomRGB(50).color)
    }
}

export default AirthingManager