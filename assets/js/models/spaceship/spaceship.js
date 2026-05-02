class Spaceship {

    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.w = SPACESHIP_W
        this.h = SPACESHIP_H

        this.vx = 0

        this.sprite = new Image()
        this.sprite.src = '/assets/images/sprites/sprite-spaceship.png'
        this.sprite.onload = () => {
            this.sprite.isReady = true
        }

        this.bulletWaitActive = false

        this.bullets = []
    }

    onKeyEvent(event) {
        const isPressed = event.type === 'keydown'

        switch(event.keyCode) {
            case KEY_RIGHT:
                if(isPressed) {
                    this.vx = SPACESHIP_VX
                } else {
                    this.vx = 0
                }
                break
            case KEY_LEFT:
                if(isPressed) {
                    this.vx = -SPACESHIP_VX
                } else {
                    this.vx = 0
                }
                break
            case KEY_SPACE:
                if(isPressed && !this.bulletWaitActive) {
                    this.bulletWaitActive = true
                    
                    window.setTimeout(() => {
                        this.bulletWaitActive = false
                    }, 250)
                    
                    this.shoot()
                }
                break
        }
    }

    move() {
        this.x += this.vx
    }

    draw () {
        if( this.sprite.isReady ) {

            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y
            )
        }
    }

    shoot() {
        this.bullets.push(new SpaceshipBullet(
            this.ctx,
            this.x + this.w / 2 - BULLET_W / 2,
            this.y)
        )
    }

    destroyBullet(bullet) {
        this.bullets = this.bullets.filter((b, index) => {
           return b !== bullet
        })  
    }
}