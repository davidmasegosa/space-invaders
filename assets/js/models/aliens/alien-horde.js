class AlienHorde {
    constructor(ctx, hordeDefinition) {
        this.ctx = ctx

        this.hordeDefinition = hordeDefinition

        this.horde = []
        this.createHorde()

        this.vx = 0
        this.vy = 0

        this.moveDirection = 'right'

        this.attackIntervalId = null

        this.hordeAttack()
    }

    createHorde() {

        for (let i = 0; i < this.hordeDefinition.length; i++) {
            let row = this.hordeDefinition[i]
            this.horde[i] = new Array()

            for (let j = 0; j < row.length; j++) {
                let alien = this.hordeDefinition[i][j]

                if(alien === 'U') {
                    this.horde[i][j] = new UglyAlien(
                        this.ctx,
                        DEFAULT_SEPARATION + j * (ALIEN_PLACEHOLDER_W + DEFAULT_SEPARATION*0.75),
                        SCORE_PANEL_H + DEFAULT_SEPARATION + i * (ALIEN_PLACEHOLDER_H + DEFAULT_SEPARATION*0.75)
                    )
                }

                else if (alien === 'H') {
                    this.horde[i][j] = new HorribleAlien(
                        this.ctx,
                        DEFAULT_SEPARATION + j * (ALIEN_PLACEHOLDER_W + DEFAULT_SEPARATION*0.75) + 1,
                        SCORE_PANEL_H + DEFAULT_SEPARATION + i * (ALIEN_PLACEHOLDER_H + DEFAULT_SEPARATION*0.75)
                    )
                }

                else if (alien === 'R') {
                    this.horde[i][j] = new RepulsiveAlien(
                        this.ctx,
                        DEFAULT_SEPARATION + j * (ALIEN_PLACEHOLDER_W + DEFAULT_SEPARATION*0.75) + 4,
                        SCORE_PANEL_H + DEFAULT_SEPARATION + i * (ALIEN_PLACEHOLDER_H + DEFAULT_SEPARATION*0.75)
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
                this.vx = ALIEN_HORDE_RIGHT_SPEED
                this.vy = 0
            }

            else if(this.moveDirection === 'left') {
                this.vx = ALIEN_HORDE_LEFT_SPEED
                this.vy = 0
            }

            else if(this.moveDirection === 'down') {
                this.vx = 0
                this.vy = ALIEN_HORDE_DOWN_SPEED
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
        }, HORDE_ATTACK_INTERVAL_TIME)
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