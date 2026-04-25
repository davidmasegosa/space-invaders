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

        this.aliens = []

        this.createAliens()

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

        this.aliens.forEach(alien => {
            alien.draw()
        })
    }

    checkBounds() {
        if(this.spaceship.x < DEFAULT_SEPARATION) {
            this.spaceship.x = DEFAULT_SEPARATION
        }

        if(this.spaceship.x + this.spaceship.w > this.canvas.width - DEFAULT_SEPARATION) {
            this.spaceship.x = this.canvas.width - this.spaceship.w - DEFAULT_SEPARATION
        }
    }

    createAliens() {
        let alienType
        let alienW
        let alienH
        let alienSeparation

        for(let i = 0; i<11; i++) {
            for(let j = 0; j<5; j++) {
                if(j === 0) {
                    alienType = 'default'
                    alienW = ALIEN_W
                    alienH = ALIEN_H
                    alienSeparation = ALIEN_SEPARATION
                }
                if(j === 1) {
                    alienType = 'bigAlien'
                    alienW = ALIEN_BIG_W
                    alienH = ALIEN_BIG_H
                    alienSeparation = ALIEN_BIG_SEPARATION
                }

                if( j > 1) {
                    alienType = 'hugeAlien'
                    alienW = ALIEN_HUGE_W
                    alienH = ALIEN_HUGE_H
                    alienSeparation = ALIEN_HUGE_SEPARATION
                }

                this.aliens.push(new Alien(
                    this.ctx,
                    DEFAULT_SEPARATION + i*(alienSeparation + alienW),
                    SCORE_PANEL_H + DEFAULT_SEPARATION + j*(DEFAULT_SEPARATION + alienH),
                    alienType))
            }
        }
    }
}