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
        this.add.bitmapText(600, 250, 'elfboy', 'RADORA', 80);

        this.add.text(510, 391, 'by');
        this.add.image(600, 400, 'logo');

        const startText = this.add.text(450, 500, 'Click anywhere to continue')
        TweenHelper.flashElement(this, startText)

        // Touch and mouse input
        this.input.on('pointerdown', (_pointer) => {
            this.scene.start('PlayerSelectScene');
        })

        // Keyboard input
        this.input.keyboard.on('keydown', (_event) => {
            this.scene.start('PlayerSelectScene');
        })
    }
}

export default StartScene