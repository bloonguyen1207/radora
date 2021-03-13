import fontTexture from "../assets/fonts/bitmap/elfboy-classic.png";
import fontData from "../assets/fonts/bitmap/elfboy-classic.xml";
import waveMini from "../assets/protagonists/WaveMini.svg";
import wavePlus from "../assets/protagonists/WavePlus.svg";
import radon from "../assets/enemies/Radon.svg";
import bullet from "../assets/bullet.png"

import {
    MAX_ENEMY_SPAWN_TIME,
    MIN_ENEMY_SPAWN_TIME,
    PLAYER_IMMORTAL_TIME,
    waveMiniData
} from "../commons/constants";
import Player from "../models/Player";
import BulletManager from "../managers/BulletManager";
import AirthingManager from "../managers/AirthingManager";
import TweenFactory from "../factory/TweenFactory";

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
        this.liveCount;
        this.bulletTimer;
        this.immortalTimer;
        this.enemyTimer;
    }

    preload() {
        this.load.bitmapFont('elfboy', fontTexture, fontData);

        this.load.svg('waveMini', waveMini);
        this.load.svg('waveMiniMini', waveMini, {scale: .5});
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
        this.liveCount = this.add.group([{
            key: 'waveMiniMini',
            frame: 0,
            repeat: this.data.get('lives') - 1,
            setXY: {x: 1050, y: 80, stepX: 50}
        }])

        // Enemies
        this.airthings = new AirthingManager(this)

        // Spawn enemy timer
        this.enemyTimer = this.time.addEvent({
            delay: MAX_ENEMY_SPAWN_TIME,
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
            callback: () => {
                this.bullets.fireBullet(this.player.x, this.player.y, waveMiniData.shootSpeed)
            }
        })

        // Player
        this.addPlayerToWorld()

        // Player move
        this.input.on('pointermove', (pointer) => {
            this.player.x = Phaser.Math.Clamp(pointer.x, 50, 1150);
        }, this);

        this.physics.add.collider(this.bullets, this.airthings, this.hitAirthing, null, this)
        this.physics.add.collider(this.player, this.airthings, this.hitPlayer, null, this)
    }

    update(time, delta) {
        super.update(time, delta);

        Phaser.Actions.IncY(this.airthings.getChildren(), 1);
    }

    hitAirthing(bullet, airthing) {
        this.airthings.remove(airthing, true, true)
        this.bullets.killAndHide(bullet)

        this.data.set('score', this.data.get('score') + 100)
        this.scoreBoard.setText(this.data.get('score'))

        if (this.data.get('score') >= this.data.get('level') * 1000) {
            this.enemyTimer.reset(
                {
                    delay: Math.max(this.enemyTimer.delay - MIN_ENEMY_SPAWN_TIME, MIN_ENEMY_SPAWN_TIME),
                    loop: true,
                    callback: () => {
                        this.airthings.spawnAirthing(this.player)
                    }
                }
            )
            this.data.set('level', this.data.get('level') + 1)
            this.levelText.setText(this.data.get('level'))
        }
    }

    hitPlayer(player, airthing) {
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
        TweenFactory.flash(this, this.player, false, PLAYER_IMMORTAL_TIME, 200, 200)

        this.immortalTimer = this.time.addEvent({
            delay: PLAYER_IMMORTAL_TIME,
            callback: () => {
                this.physics.add.collider(this.player, this.airthings, this.hitPlayer, null, this)
            }
        })
    }
}

export default PlayScene