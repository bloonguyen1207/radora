import fontTexture from "../assets/fonts/bitmap/elfboy-classic.png";
import fontData from "../assets/fonts/bitmap/elfboy-classic.xml";
import waveMini from "../assets/protagonists/WaveMini.svg";
import wavePlus from "../assets/protagonists/WavePlus.svg";
import radon from "../assets/enemies/Radon.svg";
import bullet from "../assets/bullet.png"
import BulletManager from "../managers/BulletManager";
import {waveMiniData} from "../commons/constants";

class PlayScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PlayScene'
        });

        // TODO: get data from prev state
        this.player;
        this.bullets;
        this.airthings;
        this.scoreBoard;
    }

    preload() {
        this.load.bitmapFont('elfboy', fontTexture, fontData);

        this.load.svg('waveMini', waveMini, { scale: 1.5 });
        this.load.svg('waveMiniMini', waveMini, { scale: .5 });
        this.load.svg('wavePlus', wavePlus);

        this.load.svg('radon', radon);

        this.load.image('bullet', bullet)
    }

    create() {

        this.data.set('lives', 3);
        this.data.set('level', 1);
        this.data.set('score', 0);

        this.physics.world.setBoundsCollision(true, true, true, false);

        // Score
        this.add.bitmapText(30, 10, 'elfboy', 'Score', 32)
        this.scoreBoard = this.add.bitmapText(30, 50, 'elfboy', this.data.get('score'), 32)
        // score.setText(this.data.get(score))

        // Lives
        this.add.bitmapText(1055, 10, 'elfboy', 'Lives', 32)
        this.lives = this.add.group([{ key: 'waveMiniMini', frame: 0, repeat: 2, setXY: { x: 1050, y: 80, stepX: 50 } }])

        // Player bullet
        this.bullets = new BulletManager(this);

        // Enemies
        this.airthings = this.physics.add.staticGroup({
            key: 'radon',
            frame: {},
            frameQuantity: 10,
            gridAlign: { width: 10, height: 6, cellWidth: 64, cellHeight: 32, x: 112, y: 100 }
        });

        // Player
        this.player = this.physics.add.image(600, 500, 'waveMini').setImmovable().setOrigin(.5);

        // Player move
        this.input.on('pointermove', function (pointer) {
            this.player.x = Phaser.Math.Clamp(pointer.x, 50, 1150);
        }, this);

        // Player shoot
        this.input.on('pointerdown', function (pointer) {
            this.bullets.fireBullet(this.player.x, this.player.y, waveMiniData.shootSpeed);
        }, this);

        this.physics.add.collider(this.bullets, this.airthings, this.hitAirthing, null, this)
    }

    update(time, delta) {
        super.update(time, delta);

        // Phaser.Actions.IncX(this.airthings.getChildren(), );
        // Phaser.Actions.IncY(this.airthings.getChildren(), Math.sin(delta));
    }

    hitAirthing(bullet, airthing) {
        airthing.disableBody(true, true);
        bullet.deactivate()
        this.data.set('score', this.data.get('score') + 20)
        this.scoreBoard.setText(this.data.get('score'))
        if (this.airthings.countActive() === 0)
        {
            // this.resetLevel();
        }
    }
}

export default PlayScene