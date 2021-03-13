import logoImg from '../assets/logo.png';
import fontTexture from '../assets/fonts/bitmap/elfboy-classic.png';
import fontData from '../assets/fonts/bitmap/elfboy-classic.xml';
import bgMusic from "../assets/sounds/starway.wav";

import TweenFactory from "../factory/TweenFactory";

class StartScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartScene'
        });
    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.bitmapFont('elfboy', fontTexture, fontData);

        this.load.audio('bg_music', [bgMusic]);

    }

    create() {
        const bgMusic = this.sound.add('bg_music');
        bgMusic.setLoop(true)
        bgMusic.play()

        this.add.bitmapText(600, 250, 'elfboy', 'RADORA').setOrigin(0.5);

        this.add.text(515, 311, 'by');
        this.add.image(610, 320, 'logo');

        const startText = this.add.bitmapText(600, 500,'elfboy', 'Click/tap anywhere to continue', 32).setOrigin(0.5)
        TweenFactory.flash(this, startText)

        // Touch and mouse input
        this.input.on('pointerdown', (_pointer) => {
            this.scene.start('PlayScene', { bgMusic: bgMusic });
        })

        // Keyboard input
        this.input.keyboard.on('keydown', (_event) => {
            this.scene.start('PlayScene', { bgMusic: bgMusic });
        })
    }
}

export default StartScene