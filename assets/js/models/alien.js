class Alien {

    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.w = ALIEN_W
        this.h = ALIEN_H

        this.sprite = new Image()
        this.sprite.src = '/assets/images/sprites/sprite-alien.png'
        this.sprite.onload = () => {
            this.sprite.isReady = true
        }
    }

    draw () {
        if( this.sprite.isReady ) {

            console.debug('alien sprite is ready')

            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y
            )
        }
    }
}