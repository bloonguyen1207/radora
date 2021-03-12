import logoImg from '../assets/logo.png';
import fontTexture from '../assets/fonts/bitmap/elfboy-classic.png';
import fontData from '../assets/fonts/bitmap/elfboy-classic.xml';
import TweenHelper from "../commons/TweenHelper";

class StartScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartScene'
        });
    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.bitmapFont('elfboy', fontTexture, fontData);
    }

    create() {
        // this.cameras.main.setBackgroundColor('#fff')
        this.add.bitmapText(600, 250, 'elfboy', 'RADORA').setOrigin(0.5);

        this.add.text(515, 311, 'by');
        this.add.image(610, 320, 'logo');

        const startText = this.add.bitmapText(600, 500,'elfboy', 'Click/tap anywhere to continue', 32).setOrigin(0.5)
        TweenHelper.flashElement(this, startText)

        // Touch and mouse input
        this.input.on('pointerdown', (_pointer) => {
            this.scene.start('PlayScene');
        })

        // Keyboard input
        this.input.keyboard.on('keydown', (_event) => {
            this.scene.start('PlayScene');
        })
    }
}

export default StartScene