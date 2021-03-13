export default class Player {
    static spawn(scene, playerType) {
        return scene.physics.add.sprite(600, 500, playerType)
            .setOrigin(0.5)
            .setBounce(1)
            .setImmovable()
            .setCollideWorldBounds(true);
    }
}