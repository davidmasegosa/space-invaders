class ScorePanel {

    constructor(ctx) {
        this.ctx = ctx

        this.textSprite = new Image()
        this.textSprite.src = './assets/images/sprites/panels/score/sprite-score-text.png'
        this.textSprite.onload = () => {
            this.textSprite.isReady = true
        }

        this.recordSprite = new Image()
        this.recordSprite.src = './assets/images/sprites/panels/score/record.png'
        this.recordSprite.onload = () => {
            this.recordSprite.isReady = true
        }

        this.numbers = new Numbers(ctx)
    }

    draw (score, record = 0) {
        this.ctx.beginPath()
        this.ctx.lineWidth = SCORE_PANEL_STROKE_WIDTH
        this.ctx.strokeStyle = '#FFFFFF'
        this.ctx.moveTo(0, SCORE_PANEL_H - SCORE_PANEL_STROKE_WIDTH)
        this.ctx.lineTo(CANVAS_W, SCORE_PANEL_H - SCORE_PANEL_STROKE_WIDTH)
        this.ctx.stroke()

        if (
            this.textSprite.isReady &&
            this.recordSprite.isReady &&
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
            const panelScore = score.toString().padStart(SCORE_DIGITS, '0')
            const panelRecord = record.toString().padStart(RECORD_DIGITS, '0')
            const scoreTextY = (SCORE_PANEL_H - SCORE_PANEL_TEXT_H * 3) / 2
            const numberY = scoreTextY + (SCORE_PANEL_TEXT_H * 2)
            const recordTextWidth = this.recordSprite.width || SCORE_PANEL_TEXT_W
            const recordNumbersWidth = (SCORE_PANEL_NUMBER_W + SCORE_DIGITS_SEPARATION) * RECORD_DIGITS - SCORE_DIGITS_SEPARATION
            const recordTextX = SCORE_PANEL_W - RECORD_SEPARATION - recordTextWidth
            const recordNumbersX = SCORE_PANEL_W - RECORD_SEPARATION - recordNumbersWidth

            this.ctx.drawImage(
                this.textSprite,
                RECORD_SEPARATION,
                scoreTextY,
            )

            this.ctx.drawImage(
                this.recordSprite,
                recordTextX,
                scoreTextY,
            )

            const scoreDigits = panelScore.split('')
            const recordDigits = panelRecord.split('')

            scoreDigits.forEach((digit, index) => {
                const sprite = this.numbers[`number${digit}Sprite`]

                this.ctx.drawImage(
                    sprite,
                    SCORE_SEPARATION + ((SCORE_PANEL_NUMBER_W + SCORE_DIGITS_SEPARATION) * index),
                    numberY
                )
            })

            recordDigits.forEach((digit, index) => {
                const sprite = this.numbers[`number${digit}Sprite`]

                this.ctx.drawImage(
                    sprite,
                    recordNumbersX + ((SCORE_PANEL_NUMBER_W + RECORD_DIGITS_SEPARATION) * index),
                    numberY
                )
            })
        }

    }
}
