class Game {
    constructor(canvasId) {
        console.debug('game called properly')

        this.canvas = document.getElementById(canvasId)
        this.canvas.width = CANVAS_W
        this.canvas.height = CANVAS_H
        this.ctx = this.canvas.getContext('2d')

        this.scorePanel = new ScorePanel(this.ctx)
        this.lifesPanel = new LifesPanel(this.ctx)

        this.spaceship = new Spaceship(this.ctx, (CANVAS_W - SPACESHIP_W) / 2, CANVAS_H - LIFES_PANEL_H - SPACESHIP_H - DEFAULT_SEPARATION)

        this.alienHorde = new AlienHorde(this.ctx)

        this.fps = FPS

        this.drawIntervalId = undefined
    }

    start() {
        console.debug('game start')

        if(!this.drawIntervalId) {

            this.setupListeners()

            this.drawIntervalId = setInterval(() => {
                this.clear()
                this.move()
                this.draw()
            }, this.fps)
        }
    }

    setupListeners() {
        addEventListener('keydown', (event) => this.spaceship.onKeyEvent(event))
        addEventListener('keyup', (event) => this.spaceship.onKeyEvent(event))
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    move() {
        this.spaceship.move()

        this.checkBounds()
    }

    draw() {
        this.scorePanel.draw()
        this.lifesPanel.draw()
        this.spaceship.draw()
        this.alienHorde.draw()
    }

    checkBounds() {
        if(this.spaceship.x < DEFAULT_SEPARATION) {
            this.spaceship.x = DEFAULT_SEPARATION
        }

        if(this.spaceship.x + this.spaceship.w > this.canvas.width - DEFAULT_SEPARATION) {
            this.spaceship.x = this.canvas.width - this.spaceship.w - DEFAULT_SEPARATION
        }
    }
}