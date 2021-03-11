import Phaser from 'phaser';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./commons/constants";
import StartScene from './scenes/start';
import PlayerSelectScene from './scenes/playerSelect';
import PlayScene from './scenes/play';
import EndGameScene from './scenes/endGame';

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'radora',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        pixelArt: true,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    scene: PlayScene,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    }
    // scene: [StartScene, PlayerSelectScene, PlayScene, EndGameScene]
};

const game = new Phaser.Game(config);
