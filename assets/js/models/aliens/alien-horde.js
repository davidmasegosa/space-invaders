class AlienHorde {
    constructor(ctx) {
        this.ctx = ctx

        this.horde = []
        this.createHorde()

        this.vx = 0
        this.vy = 0

        this.moveDirection = 'right'

        this.attackIntervalId = null

        this.hordeAttack()
    }

    createHorde() {

        const hordeDefinition = [
            ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
            ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
            ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U']
        ]

        for (let i = 0; i < hordeDefinition.length; i++) {
            let row = hordeDefinition[i]
            this.horde[i] = new Array()

            for (let j = 0; j < row.length; j++) {
                let alien = hordeDefinition[i][j]

                if(alien === 'U') {
                    this.horde[i][j] = new UglyAlien(
                        this.ctx,
                        DEFAULT_SEPARATION + j * (24 + DEFAULT_SEPARATION*0.75),
                        SCORE_PANEL_H + DEFAULT_SEPARATION + i * (16 + DEFAULT_SEPARATION*0.75)
                    )
                }

                else if (alien === 'H') {
                    this.horde[i][j] = new HorribleAlien(
                        this.ctx,
                        DEFAULT_SEPARATION + j * (24 + DEFAULT_SEPARATION*0.75) + 1,
                        SCORE_PANEL_H + DEFAULT_SEPARATION + i * (16 + DEFAULT_SEPARATION*0.75)
                    )
                }

                else if (alien === 'R') {
                    this.horde[i][j] = new RepulsiveAlien(
                        this.ctx,
                        DEFAULT_SEPARATION + j * (24 + DEFAULT_SEPARATION*0.75) + 4,
                        SCORE_PANEL_H + DEFAULT_SEPARATION + i * (16 + DEFAULT_SEPARATION*0.75)
                    )
                }
            }
        }
    }

    draw () {
  
        for (let i = 0; i < this.horde.length; i++) {
        
            for (let j = 0; j < this.horde[i].length; j++) {
                let alien = this.horde[i][j]
                alien.draw(alien.x, alien.y)
            }
        }

    }

    move() {

        if(this.moveDirection) {

            if(this.moveDirection === 'right') {
                this.vx = 0.35
                this.vy = 0
            }

            else if(this.moveDirection === 'left') {
                this.vx = -0.35
                this.vy = 0
            }

            else if(this.moveDirection === 'down') {
                this.vx = 0
                this.vy = 0.35
            }

            this.horde.forEach(row => {
                row.forEach(alien => {
                    alien.updatePosition(this.vx, this.vy)
                })
            })
        }

    }

    stopMovingDownAndMoveDirection(nextDirection) {
        this.moveDirection = nextDirection
    }

    hordeAttack() {
        this.attackIntervalId = window.setInterval(() => {
            this.hordeAlienShoot()
        }, 3000)
    }

    hordeAlienShoot() {
        const randomRowIndex = Math.floor(Math.random() * this.horde.length)
        const randomRow = this.horde[randomRowIndex]
        const randomAlienIndex = Math.floor(Math.random() * randomRow.length)
        const randomAlien = randomRow[randomAlienIndex]

        randomAlien.shoot()
    }

    destroyAlien(alien) { 

        this.horde.forEach((row, i) => {
            this.horde[i] = row.filter((al, j) => alien !== al)
        })
        
    }

}