class RepulsiveAlien {

    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.w = ALIEN_W
        this.h = ALIEN_H

        this.sprite = new Image()
        this.sprite.src = '/assets/images/sprites/aliens/sprite-repulsive-alien.png'

        this.sprite.onload = () => {
            this.sprite.isReady = true
        }
    }

    draw (x, y) {
        if( this.sprite.isReady ) {

            this.ctx.drawImage(
                this.sprite,
                x,
                y
            )
        }
    }

    updatePosition (vx, vy) {
        this.x += vx
        this.y += vy
    }
}