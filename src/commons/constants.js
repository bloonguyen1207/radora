export const SCREEN_WIDTH =  1200
export const SCREEN_HEIGHT = 600

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
