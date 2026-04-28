class ScorePanel {

    constructor(ctx) {
        this.ctx = ctx

        this.textSprite = new Image()
        this.textSprite.src = '/assets/images/sprites/panels/score/sprite-score-text.png'
        this.textSprite.onload = () => {
            this.textSprite.isReady = true
        }

        this.number0Sprite = new Image()
        this.number0Sprite.src = '/assets/images/sprites/panels/score/0.png'
        this.number0Sprite.onload = () => {
            this.number0Sprite.isReady = true
        }

        this.number1Sprite = new Image()
        this.number1Sprite.src = '/assets/images/sprites/panels/score/1.png'
        this.number1Sprite.onload = () => {
            this.number1Sprite.isReady = true
        }

        this.number2Sprite = new Image()
        this.number2Sprite.src = '/assets/images/sprites/panels/score/2.png'
        this.number2Sprite.onload = () => {
            this.number2Sprite.isReady = true
        }

        this.number3Sprite = new Image()
        this.number3Sprite.src = '/assets/images/sprites/panels/score/3.png'
        this.number3Sprite.onload = () => {
            this.number3Sprite.isReady = true
        }

        this.number4Sprite = new Image()
        this.number4Sprite.src = '/assets/images/sprites/panels/score/4.png'
        this.number4Sprite.onload = () => {
            this.number4Sprite.isReady = true
        }

        this.number5Sprite = new Image()
        this.number5Sprite.src = '/assets/images/sprites/panels/score/5.png'
        this.number5Sprite.onload = () => {
            this.number5Sprite.isReady = true
        }

        this.number6Sprite = new Image()
        this.number6Sprite.src = '/assets/images/sprites/panels/score/6.png'
        this.number6Sprite.onload = () => {
            this.number6Sprite.isReady = true
        }

        this.number7Sprite = new Image()
        this.number7Sprite.src = '/assets/images/sprites/panels/score/7.png'
        this.number7Sprite.onload = () => {
            this.number7Sprite.isReady = true
        }

        this.number8Sprite = new Image()
        this.number8Sprite.src = '/assets/images/sprites/panels/score/8.png'
        this.number8Sprite.onload = () => {
            this.number8Sprite.isReady = true
        }

        this.number9Sprite = new Image()
        this.number9Sprite.src = '/assets/images/sprites/panels/score/9.png'
        this.number9Sprite.onload = () => {
            this.number9Sprite.isReady = true
        }
    }

    draw (score) {
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

        if( 
            this.number0Sprite.isReady &&
            this.number1Sprite.isReady &&
            this.number2Sprite.isReady &&
            this.number3Sprite.isReady &&
            this.number4Sprite.isReady &&
            this.number5Sprite.isReady &&
            this.number6Sprite.isReady &&
            this.number7Sprite.isReady &&
            this.number8Sprite.isReady &&
            this.number9Sprite.isReady
         ) {

            let panelScore = score.toString().padStart(6, '0')

            let digits = panelScore.split('')

                digits.forEach((digit, index) => {
                    let sprite = this[`number${digit}Sprite`]

                    this.ctx.drawImage(
                        sprite,
                        25 + ((SCORE_PANEL_NUMBER_W + 5)* index),
                        (SCORE_PANEL_H - SCORE_PANEL_TEXT_H * 3) / 2 + (SCORE_PANEL_TEXT_H * 2)
                    )
                })
        console.log('score!!!')
        }

    }
}