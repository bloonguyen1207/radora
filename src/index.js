import Phaser from 'phaser';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./commons/constants";
import StartScene from './scenes/Start';
import PlayerSelectScene from './scenes/PlayerSelect';
import PlayScene from './scenes/Play';
import EndGameScene from './scenes/EndGame';

const config = {
    type: Phaser.AUTO,
    scale: {
        // mode: Phaser.Scale.FIT,
        parent: 'radora',
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        pixelArt: true,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: [StartScene, PlayScene, EndGameScene]
};

const game = new Phaser.Game(config);
