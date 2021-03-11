import fontTexture from "../assets/fonts/bitmap/elfboy-classic.png";
import fontData from "../assets/fonts/bitmap/elfboy-classic.xml";
import waveMini from "../assets/protagonists/WaveMini.svg";
import wavePlus from "../assets/protagonists/WavePlus.svg";
import radon from "../assets/enemies/Radon.svg";

class PlayScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PlayScene'
        });
    }

    preload() {
        this.load.bitmapFont('elfboy', fontTexture, fontData);

        this.load.svg('waveMini', waveMini);
        this.load.svg('wavePlus', wavePlus);

        this.load.svg('radon', radon);
    }

    create() {
        // this.cameras.main.setBackgroundColor('#fff')
        this.add.bitmapText(600, 250, 'elfboy', 'Play Scene');

        // Touch and mouse input
        this.input.on('pointerdown', (_pointer) => {
            this.scene.start('EndGameScene');
        })

        // Keyboard input
        this.input.keyboard.on('keydown', (_event) => {
            this.scene.start('EndGameScene');
        })
    }
}

export default PlayScene