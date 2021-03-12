import fontTexture from "../assets/fonts/bitmap/elfboy-classic.png";
import fontData from "../assets/fonts/bitmap/elfboy-classic.xml";
import waveMini from "../assets/protagonists/WaveMini.svg";
import wavePlus from "../assets/protagonists/WavePlus.svg";
import startBtn from "../assets/start_btn.png";

import { waveMiniData, wavePlusData, toggleContainer } from "../commons/constants";

let waveMiniContainer, wavePlusContainer;

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

        this.load.image('start_btn', startBtn);
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

        const waveMiniName = this.add.bitmapText(
            600,
            220,
            'elfboy',
            waveMini.data.get('name'),
            24
        ).setOrigin(0.5)

        const waveMiniDescription = this.add.bitmapText(
            600,
            450,
            'elfboy',
            waveMini.data.get('description'),
            24,
            1
        ).setOrigin(0.5)

        waveMiniContainer = this.add.container(0, 0, [waveMini, waveMiniName, waveMiniDescription])

        const wavePlus = this.add.image(600, 330, 'wavePlus').setOrigin(0.5);
        wavePlus.setDataEnabled();

        wavePlus.data.set('name', wavePlusData.name);
        wavePlus.data.set('description', wavePlusData.description);
        wavePlus.data.set('moveSpeed', wavePlusData.moveSpeed);
        wavePlus.data.set('shootSpeed', wavePlusData.shootSpeed);

        const wavePlusName = this.add.bitmapText(
            600,
            220,
            'elfboy',
            wavePlus.data.get('name'),
            24
        ).setOrigin(0.5)
        const wavePlusDescription = this.add.bitmapText(
            600,
            450,
            'elfboy',
            wavePlus.data.get('description'),
            24,
            1
        ).setOrigin(0.5)

        wavePlusContainer = this.add.container(0, 0, [wavePlus, wavePlusName, wavePlusDescription]).setVisible(false)


        const start_btn = this.add.image(600, 550, 'start_btn').setOrigin(0.5).setScale(0.3).setInteractive()
        // TODO: Add arrow
        this.input.on('pointerdown', (_pointer) => {
            toggleContainer(waveMiniContainer, wavePlusContainer);
        })

        // Keyboard input
        start_btn.on('pointerdown', (_pointer) => {
            this.scene.start('PlayScene');
        })
    }
}

export default PlayerSelectScene