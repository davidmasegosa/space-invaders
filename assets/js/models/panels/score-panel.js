class ScorePanel {

    constructor(ctx) {
        this.ctx = ctx

        this.textSprite = new Image()
        this.textSprite.src = '/assets/images/sprites/panels/score/sprite-score-text.png'
        this.textSprite.onload = () => {
            this.textSprite.isReady = true
        }

        this.numbersSprite = new Image()
        this.numbersSprite.src = '/assets/images/sprites/panels/score/sprite-score-number-0.png'
        this.numbersSprite.onload = () => {
            this.numbersSprite.isReady = true
        }
    }

    draw () {
        this.ctx.beginPath()
        this.ctx.lineWidth = SCORE_PANEL_STROKE_WIDTH
        this.ctx.strokeStyle = '#FFFFFF'
        this.ctx.moveTo(0, SCORE_PANEL_H - SCORE_PANEL_STROKE_WIDTH)
        this.ctx.lineTo(600, SCORE_PANEL_H - SCORE_PANEL_STROKE_WIDTH)
        this.ctx.stroke()

        if( this.textSprite.isReady ) {

            this.ctx.drawImage(
                this.textSprite,
                25,
                (SCORE_PANEL_H - SCORE_PANEL_TEXT_H * 3) / 2,
            )
        }

        if( this.numbersSprite.isReady ) {
            
            this.ctx.drawImage(
                this.numbersSprite,
                25,
                (SCORE_PANEL_H - SCORE_PANEL_TEXT_H * 3) / 2 + (SCORE_PANEL_TEXT_H * 2)
            )
        }

    }
}