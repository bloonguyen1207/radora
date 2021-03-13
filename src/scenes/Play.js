import fontTexture from "../assets/fonts/bitmap/elfboy-classic.png";
import fontData from "../assets/fonts/bitmap/elfboy-classic.xml";
import waveMini from "../assets/protagonists/WaveMini.svg";
import wavePlus from "../assets/protagonists/WavePlus.svg";
import radon from "../assets/enemies/Radon.svg";
import bullet from "../assets/bullet.png"

import Player from "../models/Player";
import BulletManager from "../managers/BulletManager";
import {SCREEN_WIDTH, waveMiniData} from "../commons/constants";
import AirthingManager from "../managers/AirthingManager";
import TweenFactory from "../factory/TweenFactory";

var caption;

var captionStyle = {
    fill: '#7fdbff',
    fontFamily: 'monospace',
    lineSpacing: 4
};

var captionTextFormat = (
    'Total:    %1\n' +
    'Max:      %2\n' +
    'Active:   %3\n' +
    'Inactive: %4\n' +
    'Used:     %5\n' +
    'Free:     %6\n' +
    'Full:     %7\n'
);

class PlayScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PlayScene'
        });

        // TODO: get data from prev state
        this.player;
        this.airthings;
        this.bullets;
        this.scoreBoard;
        this.levelText;
        this.liveCount;
        this.bulletTimer;
        this.immortalTimer;
        this.enemyTimer;
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

        caption = this.add.text(30, 100, '', captionStyle);

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

        // Enemies
        this.airthings = new AirthingManager(this)

        // Spawn enemy timer
        this.time.addEvent({
            delay: 1500,
            loop: true,
            callback: () => {
                this.airthings.spawnAirthing(this.player)
            }
        });

        // Player bullet
        this.bullets = new BulletManager(this);

        // Auto shoot timer
        this.bulletTimer = this.time.addEvent({
            delay: waveMiniData.shootSpeed,
            loop: true,
            callback: () => { this.bullets.fireBullet(this.player.x, this.player.y, waveMiniData.shootSpeed) }
        })

        // Player
        this.addPlayerToWorld()

        // Player move
        this.input.on('pointermove',  (pointer) => {
            this.player.x = Phaser.Math.Clamp(pointer.x, 50, 1150);
        }, this);

        this.physics.add.collider(this.bullets, this.airthings, this.hitAirthing, null, this)
        this.physics.add.collider(this.player, this.airthings, this.hitPlayer, null, this)

        // // Player shoot
        // this.input.on('pointerdown', function (_pointer) {
        //     this.bullets.fireBullet(this.player.x, this.player.y, waveMiniData.shootSpeed);
        // }, this);
    }

    update(time, delta) {
        super.update(time, delta);

        Phaser.Actions.IncY(this.airthings.getChildren(), 1);

        caption.setText(Phaser.Utils.String.Format(captionTextFormat, [
            this.airthings.getLength(),
            this.airthings.maxSize,
            this.airthings.countActive(true),
            this.airthings.countActive(false),
            this.airthings.getTotalUsed(),
            this.airthings.getTotalFree(),
            this.airthings.isFull()
        ]));
    }

    hitAirthing(bullet, airthing) {
        this.airthings.remove(airthing, true, true)
        this.bullets.killAndHide(bullet)

        this.data.set('score', this.data.get('score') + 50)
        this.scoreBoard.setText(this.data.get('score'))
        if (this.data.get('score') / this.data.get('level') === 1000)
        {
            this.data.set('level', this.data.get('level') + 1)
        }
    }

    hitPlayer(player, airthing) {
        console.log('player hit')
        this.airthings.remove(airthing, true, true)
        player.destroy()

        this.liveCount.killAndHide(this.liveCount.getFirstAlive())
        this.data.set('lives', this.data.get('lives') - 1)
        if (this.data.get('lives') <= 0) {
            this.scene.start('EndGameScene', {
                score: this.data.get('score'),
                level: this.data.get('level')
            });
        } else {
            this.addPlayerToWorld()
        }
    }

    addPlayerToWorld() {
        this.player = Player.spawn(this, 'waveMini');
        TweenFactory.flash(this, this.player, false, 3000, 200, 200)

        // Auto shoot timer
        this.immortalTimer = this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.physics.add.collider(this.player, this.airthings, this.hitPlayer, null, this)
            }
        })
    }
    //
    // newLevel() {
    //     this.data.set('level', this.data.get('level') + 1)
    //     this.levelText.setText(this.data.get('level'))
    //     this.generateAirthings()
    // }
    //
    // resetLevel() {
    //     this.airthings.clear(true, true)
    //     this.generateAirthings()
    //     this.spawnPlayer()
    // }
}

export default PlayScene