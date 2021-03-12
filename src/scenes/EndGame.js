import fontTexture from "../assets/fonts/bitmap/elfboy-classic.png";
import fontData from "../assets/fonts/bitmap/elfboy-classic.xml";
import waveMini from "../assets/protagonists/WaveMini.svg";
import wavePlus from "../assets/protagonists/WavePlus.svg";
import radon from "../assets/enemies/Radon.svg";
import TweenHelper from "../commons/TweenHelper";

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
        // this.cameras.main.setBackgroundColor('#fff')
        this.add.bitmapText(600, 150, 'elfboy', 'Game Over').setOrigin(0.5);

        this.add.bitmapText(600, 250, 'elfboy', `Level: ${this.data.get('level')}`, 48).setOrigin(0.5);
        this.add.bitmapText(600, 300, 'elfboy', `Score: ${this.data.get('score')}`, 48).setOrigin(0.5);

        const endText = this.add.bitmapText(600, 500, 'elfboy', 'Click/tap anywhere to restart', 32).setOrigin(0.5)
        TweenHelper.flashElement(this, endText)

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