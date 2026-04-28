class LifesPanel {

    constructor(ctx) {
        this.ctx = ctx

        this.sprite = new Image()
        this.sprite.src = '/assets/images/sprites/sprite-spaceship.png'

        this.sprite.onload = () => {
            this.sprite.isReady = true
        }
    }

    draw (lifes) {
        this.ctx.beginPath()
        this.ctx.lineWidth = LIFES_PANEL_STROKE_WIDTH
        this.ctx.strokeStyle = '#00FC00'
        this.ctx.moveTo(0, CANVAS_H - LIFES_PANEL_H)
        this.ctx.lineTo(LIFES_PANEL_W, CANVAS_H - LIFES_PANEL_H)
        this.ctx.stroke()

        if( this.sprite.isReady ) {

            if(lifes > 1) {
                this.ctx.drawImage(
                    this.sprite,
                    DEFAULT_SEPARATION,
                    CANVAS_H - LIFES_PANEL_H / 2 - SPACESHIP_H / 2
                )
            }
            
            if (lifes > 2) {
                this.ctx.drawImage(
                    this.sprite,
                    DEFAULT_SEPARATION + SPACESHIP_W + DEFAULT_SEPARATION,
                    CANVAS_H - LIFES_PANEL_H / 2 - SPACESHIP_H / 2
                )
            }
        }
    }
}