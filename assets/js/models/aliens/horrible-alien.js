class HorribleAlien {

    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.w = ALIEN_W
        this.h = ALIEN_H

        this.points = ALIEN_HORRIBLE_POINTS

        this.sprite = new Image()
        this.sprite.src = '/assets/images/sprites/aliens/sprite-horrible-alien.png'

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