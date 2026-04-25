class AlienHorde {
    constructor(ctx) {
        this.ctx = ctx

        this.horde = []
        this.createHorde()
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
                    this.horde[i][j] = new UglyAlien(this.ctx, 100, 100)
                }

                else if (alien === 'H') {
                    this.horde[i][j] = new HorribleAlien(this.ctx, 200, 200)
                }

                else if (alien === 'R') {
                    this.horde[i][j] = new RepulsiveAlien(this.ctx, 300, 300)
                }
            }
        }
    }

    draw () {

        console.log('ALIEN HORDE DRAW CALLED')

        for (let i = this.horde.length-1; i >= 0; i--) {
        
            for (let j = this.horde[i].length-1; j >= 0; j--) {
                let alien = this.horde[i][j]
                    let positionFix = 0

                    if(alien instanceof UglyAlien) {
                        positionFix = 4
                    }

                    else if(alien instanceof HorribleAlien) {
                        positionFix = 1
                    }

                alien.draw(
                    DEFAULT_SEPARATION + j * (24 + DEFAULT_SEPARATION*0.75) + positionFix,
                    SCORE_PANEL_H + DEFAULT_SEPARATION + i * (16 + DEFAULT_SEPARATION*0.75)
                )
            }
        }

    }
}