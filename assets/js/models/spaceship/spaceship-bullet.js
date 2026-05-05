class SpaceshipBullet {

    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.w = SPACESHIP_BULLET_W
        this.h = SPACESHIP_BULLET_H

        this.vy = SPACESHIP_BULLET_SPEED

        this.sprite = new Image()
        this.sprite.src = './assets/images/sprites/sprite-bullet.png'

        this.sprite.onload = () => {
            this.sprite.isReady = true
        }
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

    move() {
        this.y += this.vy
    }

}
