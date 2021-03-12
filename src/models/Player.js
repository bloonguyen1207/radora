export default class Player {
    static spawn(scene, playerType) {
        let player = scene.physics.add.sprite(400, 500, playerType);
        player.setCollideWorldBounds(true);
        return player;
    }
}