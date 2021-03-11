import fontTexture from "../assets/fonts/bitmap/elfboy-classic.png";
import fontData from "../assets/fonts/bitmap/elfboy-classic.xml";
import waveMini from "../assets/protagonists/WaveMini.svg";
import wavePlus from "../assets/protagonists/WavePlus.svg";

import { waveMiniData, wavePlusData } from "../commons/constants";

class PlayerSelectScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PlayerSelectScene'
        });
    }

    preload() {
        this.load.bitmapFont('elfboy', fontTexture, fontData);

        this.load.svg('waveMini', waveMini, { scale: 1.5 });
        this.load.svg('wavePlus', wavePlus, { scale: 1.5 });
    }

    create() {
        // this.cameras.main.setBackgroundColor('#fff')
        this.add.bitmapText(600, 120, 'elfboy', 'Select a player', 48).setOrigin(0.5);

        const waveMini = this.add.image(600, 330, 'waveMini').setOrigin(0.5);
        waveMini.setDataEnabled();

        waveMini.data.set('name', waveMiniData.name);
        waveMini.data.set('description', waveMiniData.description);
        waveMini.data.set('moveSpeed', waveMiniData.moveSpeed);
        waveMini.data.set('shootSpeed', waveMiniData.shootSpeed);

        this.add.bitmapText(
            600,
            220,
            'elfboy',
            waveMini.data.get('name'),
            24
        ).setOrigin(0.5)

        // this.add.image(800, 300, 'wavePlus');
        this.add.bitmapText(
            600,
            450,
            'elfboy',
            waveMini.data.get('description'),
            24,
            1
        ).setOrigin(0.5)

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