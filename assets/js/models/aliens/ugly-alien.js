class UglyAlien {

    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.w = ALIEN_W
        this.h = ALIEN_H
        this.points = ALIEN_POINTS

        this.bullets = []

        this.sprite = new Image()
        this.sprite.src = '/assets/images/sprites/aliens/sprite-ugly-alien.png'

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

    shoot() {
        this.bullets.push(new AlienBullet(
            this.ctx,
            this.x + this.w / 2 - BULLET_W / 2,
            this.y)
        )
    }
}