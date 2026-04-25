class LifesPanel {

    constructor(ctx) {
        this.ctx = ctx 
    }

    draw () {
        this.ctx.beginPath()
        this.ctx.lineWidth = LIFES_PANEL_STROKE_WIDTH
        this.ctx.strokeStyle = '#00FC00'
        this.ctx.moveTo(0, CANVAS_H - LIFES_PANEL_H)
        this.ctx.lineTo(LIFES_PANEL_W, CANVAS_H - LIFES_PANEL_H)
        this.ctx.stroke()
    }
}