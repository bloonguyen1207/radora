import fontTexture from "../assets/fonts/bitmap/elfboy-classic.png";
import fontData from "../assets/fonts/bitmap/elfboy-classic.xml";
import waveMini from "../assets/protagonists/WaveMini.svg";
import wavePlus from "../assets/protagonists/WavePlus.svg";
import radon from "../assets/enemies/Radon.svg";
import TweenFactory from "../factory/TweenFactory";
import {CONTINUE_TEXT, SCREEN_HEIGHT, SCREEN_WIDTH} from "../commons/constants";

class EndGameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'EndGameScene'
        });
    }

    init(data) {
        this.data.set('level', data.level)
        this.data.set('score', data.score)
    }

    preload() {
        this.load.bitmapFont('elfboy', fontTexture, fontData);

        this.load.svg('waveMini', waveMini);
        this.load.svg('wavePlus', wavePlus);

        this.load.svg('radon', radon);
    }

    create() {
        const gameOverText = this.add.bitmapText(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 150, 'elfboy', 'Game Over').setOrigin(0.5);

        this.add.bitmapText(SCREEN_WIDTH / 2, gameOverText.y + 100, 'elfboy', `Level: ${this.data.get('level')}`, 48).setOrigin(0.5);
        this.add.bitmapText(SCREEN_WIDTH / 2, gameOverText.y + 150, 'elfboy', `Score: ${this.data.get('score')}`, 48).setOrigin(0.5);

        const endText = this.add.bitmapText(SCREEN_WIDTH / 2, gameOverText.y + 300, 'elfboy', CONTINUE_TEXT, 32).setOrigin(0.5)
        TweenFactory.flash(this, endText)

        // Touch and mouse input
        this.input.on('pointerdown', (_pointer) => {
            this.scene.start('StartScene');
        })

        // Keyboard input
        this.input.keyboard.on('keydown', (_event) => {
            this.scene.start('StartScene');
        })
    }
}

export default EndGameScene