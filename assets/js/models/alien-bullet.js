class AlienBullet {

    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.w = BULLET_W
        this.h = BULLET_H

        this.vy = 2

        this.sprite = new Image()
        this.sprite.src = '/assets/images/sprites/sprite-alien-bullet.png'

        this.sprite.onload = () => {
            this.sprite.isReady = true
        }

        console.log('Alien bullet created')
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

    updatePosition (vx, vy) {
        this.x += vx
        this.y += vy
    }
}