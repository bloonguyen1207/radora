import logoImg from '../assets/logo.png';
import fontTexture from '../assets/fonts/bitmap/elfboy-classic.png';
import fontData from '../assets/fonts/bitmap/elfboy-classic.xml';
import bgMusic from "../assets/sounds/starway.wav";

import TweenFactory from "../factory/TweenFactory";
import {
    CONTINUE_TEXT,
    SCREEN_HEIGHT,
    SCREEN_WIDTH
} from "../commons/constants";

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

        const title = this.add.bitmapText(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 100, 'elfboy', 'RADORA').setOrigin(0.5);

        this.add.text(SCREEN_WIDTH / 2 - 85, title.y + 70, 'by');
        this.add.image(SCREEN_WIDTH / 2 + 10, title.y + 79, 'logo');

        const startText = this.add.bitmapText(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 100,'elfboy', CONTINUE_TEXT, 32).setOrigin(0.5)
        TweenFactory.flash(this, startText)

        // Touch and mouse input
        this.input.on('pointerdown', (_pointer) => {
            this.scene.start('PlayScene', { bgMusic: bgMusic });
        })

        // Keyboard input
        this.input.keyboard.on('keydown-M', () => {
            this.sound.setMute(!this.sound.mute)
        }, this);
    }
}

export default StartScene