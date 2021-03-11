import logoImg from '../assets/logo.png';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../commons/constants.js'

class Start extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.svg('expand-icon', expandIcon);
        this.load.svg('compress-icon', compressIcon);
    }

    create() {
        this.add.text(10, 10, SCREEN_HEIGHT)
        const logo = this.add.image(1100, 750, 'logo');
    }
}

export default Start