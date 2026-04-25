class Alien {

    constructor(ctx, x, y, type = 'default') {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.w = ALIEN_W
        this.h = ALIEN_H

        this.sprite = new Image()

        if(type === 'bigAlien') {
            this.sprite.src = '/assets/images/sprites/alien/sprite-big-alien.png'
        }

        else if(type === 'hugeAlien') {
            this.sprite.src = '/assets/images/sprites/alien/sprite-huge-alien.png'
        }

        else {
            this.sprite.src = '/assets/images/sprites/alien/sprite-alien.png'
        }

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