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
        this.levelText;
        this.liveCount;
    }

    preload() {
        this.load.bitmapFont('elfboy', fontTexture, fontData);

        this.load.svg('waveMini', waveMini);
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

        // Level
        this.add.bitmapText(600, 10, 'elfboy', 'Level', 32).setOrigin(0.5, 0)
        this.levelText = this.add.bitmapText(600, 50, 'elfboy', this.data.get('level'), 32).setOrigin(0.5, 0)

        // Lives
        this.add.bitmapText(1055, 10, 'elfboy', 'Lives', 32)
        this.liveCount = this.add.group([{ key: 'waveMiniMini', frame: 0, repeat: this.data.get('lives') - 1, setXY: { x: 1050, y: 80, stepX: 50 } }])

        // Player bullet
        this.bullets = new BulletManager(this);

        // Enemies
        this.generateAirthings()

        // Player
        this.spawnPlayer()

        // Player move
        this.input.on('pointermove', function (pointer) {
            this.player.x = Phaser.Math.Clamp(pointer.x, 50, 1150);
        }, this);

        // Player shoot
        this.input.on('pointerdown', function (pointer) {
            this.bullets.fireBullet(this.player.x, this.player.y, waveMiniData.shootSpeed);
        }, this);
    }

    update(time, delta) {
        super.update(time, delta);

        // this.bullets.fireBullet(this.player.x, this.player.y, waveMiniData.shootSpeed);
    }

    spawnPlayer() {
        this.player = this.physics.add.image(600, 500, 'waveMini').setImmovable().setOrigin(.5);
        this.physics.add.collider(this.player, this.airthings, this.hitPlayer, null, this)
    }

    hitAirthing(bullet, airthing) {
        airthing.disableBody(true, true);
        bullet.deactivate()
        this.data.set('score', this.data.get('score') + 20)
        this.scoreBoard.setText(this.data.get('score'))
        if (this.airthings.countActive() === 0)
        {
            this.newLevel();
        }
    }

    hitPlayer(player, airthing) {
        airthing.disableBody(true, true)
        player.disableBody(true, true)
        this.liveCount.killAndHide(this.liveCount.getFirstAlive())
        this.data.set('lives', this.data.get('lives') - 1)
        if (this.data.get('lives') > 0) {
            this.resetLevel()
        } else {
            this.scene.start('EndGameScene', {
                score: this.data.get('score'),
                level: this.data.get('level')
            });
        }
    }

    generateAirthings() {
        // Enemies
        this.airthings = this.physics.add.group({
            key: 'radon',
            frameQuantity: 15,
            gridAlign: { width: 15, height: 1, cellWidth: 64, cellHeight: 32, x: 100, y: 150 },
            bounceX: 1,
            collideWorldBounds: true
        });

        this.airthings.setVelocityX(10, 5 * this.data.get('level'));
        this.airthings.setVelocityY(1, 1 * this.data.get('level'));

        this.physics.add.collider(this.bullets, this.airthings, this.hitAirthing, null, this)
        this.player && this.physics.add.collider(this.player, this.airthings, this.hitPlayer, null, this)
    }

    newLevel() {
        this.data.set('level', this.data.get('level') + 1)
        this.levelText.setText(this.data.get('level'))
        this.generateAirthings()
    }

    resetLevel() {
        this.airthings.clear(true, true)
        this.generateAirthings()
        this.spawnPlayer()
    }
}

export default PlayScene