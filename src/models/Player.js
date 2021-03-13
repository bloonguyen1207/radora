import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../commons/constants";

export default class Player {
    static spawn(scene, playerType) {
        return scene.physics.add.sprite(SCREEN_WIDTH / 2, SCREEN_HEIGHT - 100, playerType)
            .setOrigin(0.5)
            .setBounce(1)
            .setImmovable()
            .setCollideWorldBounds(true);
    }
}