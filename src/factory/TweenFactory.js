// Ref: https://www.stephengarside.co.uk/blog/phaser-3-flashing-text-easy-example/

export default class TweenFactory {
    static flash(scene, element, repeat = true, overAllDuration = 1500, invisibleDuration = 1000, visibleDuration = 1000) {
        const easing = 'Linear';

        scene.tweens.timeline({
            tweens: [
                {
                    targets: element,
                    duration: invisibleDuration,
                    alpha: 0,
                    ease: easing
                },
                {
                    targets: element,
                    duration: visibleDuration,
                    alpha: 1,
                    ease: easing,
                    onComplete: () => {
                        overAllDuration -= invisibleDuration + visibleDuration
                        if (overAllDuration > 0 || repeat) {
                            this.flash(scene, element, repeat, overAllDuration, invisibleDuration, visibleDuration);
                        }
                    }
                }
            ]
        });
    }
}