export const SCREEN_WIDTH =  600
export const SCREEN_HEIGHT = 1200

export const MAX_ENEMY_DROP_SPEED = 10

export const MAX_ENEMY_SPAWN_TIME = 1500
export const MIN_ENEMY_SPAWN_TIME = 100

export const PLAYER_IMMORTAL_TIME = 3000

export const CONTINUE_TEXT = 'Click/tap to continue'

export const waveMiniData = {
    name: 'Wave Mini',
    description: 'A small but furious fighter, \ncan move and shoot at high speed',
    moveSpeed: 300,
    shootSpeed: 500
}

export const wavePlusData = {
    name: 'Wave Plus',
    description: 'A tanker machine, \ncan cover more grounds with 2 canons',
    moveSpeed: 150,
    shootSpeed: 300
}

export const toggleContainer = (container1, container2) => {
    if (container1.visible) {
        container1.setVisible(false)
        container2.setVisible(true)
    } else {
        container1.setVisible(true)
        container2.setVisible(false)
    }
}
