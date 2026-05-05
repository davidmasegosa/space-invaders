class ScorePanel {

    constructor(ctx) {
        this.ctx = ctx

        this.textSprite = new Image()
        this.textSprite.src = './assets/images/sprites/panels/score/sprite-score-text.png'
        this.textSprite.onload = () => {
            this.textSprite.isReady = true
        }

        this.numbers = new Numbers(ctx)
    }

    draw (score) {
        this.ctx.beginPath()
        this.ctx.lineWidth = SCORE_PANEL_STROKE_WIDTH
        this.ctx.strokeStyle = '#FFFFFF'
        this.ctx.moveTo(0, SCORE_PANEL_H - SCORE_PANEL_STROKE_WIDTH)
        this.ctx.lineTo(600, SCORE_PANEL_H - SCORE_PANEL_STROKE_WIDTH)
        this.ctx.stroke()

        if (
            this.textSprite.isReady &&
            this.numbers.number0Sprite.isReady &&
            this.numbers.number1Sprite.isReady &&
            this.numbers.number2Sprite.isReady &&
            this.numbers.number3Sprite.isReady &&
            this.numbers.number4Sprite.isReady &&
            this.numbers.number5Sprite.isReady &&
            this.numbers.number6Sprite.isReady &&
            this.numbers.number7Sprite.isReady &&
            this.numbers.number8Sprite.isReady &&
            this.numbers.number9Sprite.isReady
        )
        {
            this.ctx.drawImage(
                this.textSprite,
                25,
                (SCORE_PANEL_H - SCORE_PANEL_TEXT_H * 3) / 2,
            )

            const panelScore = score.toString().padStart(6, '0')

            const digits = panelScore.split('')

                digits.forEach((digit, index) => {
                    const sprite = this.numbers[`number${digit}Sprite`]

                    this.ctx.drawImage(
                        sprite,
                        25 + ((SCORE_PANEL_NUMBER_W + 5)* index),
                        (SCORE_PANEL_H - SCORE_PANEL_TEXT_H * 3) / 2 + (SCORE_PANEL_TEXT_H * 2)
                    )
                })
        }

    }
}
