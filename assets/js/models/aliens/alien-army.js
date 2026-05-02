class AlienArmy {
    constructor(ctx) {
        this.ctx = ctx

        this.remainingHordes = 3

        this.firstHordeDefinition = [
            ['U'],
        ]

        this.secondHordeDefinition = [
            ['R']
        ]

        this.finalHordeDefinition = [
            ['R']
        ]

        this.currentHorde = undefined

        this.createHorde()
    }

    createHorde() {
        if(this.remainingHordes === 3) {
            this.currentHorde = new AlienHorde(this.ctx, this.firstHordeDefinition)
        }

        if(this.remainingHordes === 2) {
            this.currentHorde = new AlienHorde(this.ctx, this.secondHordeDefinition)
        }

        else if(this.remainingHordes === 1) {
            this.currentHorde = new AlienHorde(this.ctx, this.finalHordeDefinition)
        }
    }
}