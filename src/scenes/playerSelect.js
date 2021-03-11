import fontTexture from "../assets/fonts/bitmap/elfboy-classic.png";
import fontData from "../assets/fonts/bitmap/elfboy-classic.xml";
import waveMini from "../assets/protagonists/WaveMini.svg";
import wavePlus from "../assets/protagonists/WavePlus.svg";

class PlayerSelectScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PlayerSelectScene'
        });
    }

    preload() {
        this.load.bitmapFont('elfboy', fontTexture, fontData);

        this.load.svg('waveMini', waveMini);
        this.load.svg('wavePlus', wavePlus);
    }

    create() {
        // this.cameras.main.setBackgroundColor('#fff')
        this.add.bitmapText(420, 150, 'elfboy', 'Select a player');

        this.add.image(200, 300, waveMini);
        this.add.image(300, 300, wavePlus);

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

export default PlayerSelectScene