import Phaser from 'phaser'
import StartScene from './scenes/start'

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'radon-run',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1200,
        height: 800,
    },
    scene: StartScene
};

const game = new Phaser.Game(config);
