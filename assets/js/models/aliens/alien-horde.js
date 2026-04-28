class AlienHorde {
    constructor(ctx) {
        this.ctx = ctx

        this.horde = []
        this.createHorde()

        this.vx = 0
        this.vy = 0

        this.moveDirection = 'right'
    }

    createHorde() {

        console.log('create horde function called')

        const hordeDefinition = [
            ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
            ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
            ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
            ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
            ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U']
        ]

        console.log( hordeDefinition.length )

        for (let i = 0; i < hordeDefinition.length; i++) {
            let row = hordeDefinition[i]
            this.horde[i] = new Array()

            console.log(row.length)

            for (let j = 0; j < row.length; j++) {
                let alien = hordeDefinition[i][j]

                console.log(alien)

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

        console.log(this.moveDirection)

        if(this.moveDirection === 'right') {
            this.moveRight()
        }

        else if(this.moveDirection === 'left') {
            this.moveLeft()
        }
        else if(this.moveDirection === 'down') {
            this.moveDown()
        }
    }

    moveRight() {
        this.vx = 0.35
        this.vy = 0
        this.updatePosition()
    }

    moveLeft() {
        this.vx = -0.35
        this.vy = 0
        this.updatePosition()
    }

    moveDown() {
        this.vx = 0
        this.vy = 0.35
        this.updatePosition()
    }

    updatePosition() {
        this.horde.forEach(row => {
            row.forEach(alien => {
                alien.updatePosition(this.vx, this.vy)
            })
        })
    }

    stopMovingDown(nextDirection) {
        this.moveDirection = nextDirection
    }

    checkBounds() {

        if(this.moveDirection === 'right') {
            this.horde.forEach(row => {
                row.forEach(alien => {

                    if(alien.x + ALIEN_W > CANVAS_W - DEFAULT_SEPARATION) {
                        this.moveDirection = 'down'
                        console.log('AN ALIEN IS ON THE BOUNDS!!!!!')
                        window.setTimeout(() => {
                            this.stopMovingDown('left')
                        }, 3000)
                    }
                })
            })
        }

        if(this.moveDirection === 'left') {
            this.horde.forEach(row => {
                row.forEach(alien => {

                    if(alien.x < DEFAULT_SEPARATION) {
                        this.moveDirection = 'down'
                        console.log('AN ALIEN IS ON THE BOUNDS!!!!!')
                        window.setTimeout(() => {
                            this.stopMovingDown('right')
                        }, 3000)
                    }
                })
            })
        }
    }
}