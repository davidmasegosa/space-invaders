class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.canvas.width = CANVAS_W
        this.canvas.height = CANVAS_H
        this.ctx = this.canvas.getContext('2d')

        this.scorePanel = new ScorePanel(this.ctx)
        this.lifesPanel = new LifesPanel(this.ctx)

        this.spaceship = new Spaceship(
            this.ctx,
            (CANVAS_W - SPACESHIP_W) / 2,
            CANVAS_H - LIFES_PANEL_H - SPACESHIP_H - DEFAULT_SEPARATION
        )

        this.alienHorde = new AlienHorde(this.ctx)

        this.score = 0

        this.fps = FPS

        this.drawIntervalId = undefined
    }

    start() {
        console.debug('Game started')

        if(!this.drawIntervalId) {

            this.setupListeners()

            this.drawIntervalId = setInterval(() => {
                this.clear()
                this.move()
                this.checkBounds()
                this.checkCollisions() 
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
        this.spaceship.bullets.forEach(bullet => bullet.move())
        this.alienHorde.move()
    }

    draw() {
        this.scorePanel.draw(this.score)
        this.lifesPanel.draw()
        this.spaceship.draw()
        this.spaceship.bullets.forEach(bullet => bullet.draw())
        this.alienHorde.draw()
    }

    checkBounds() {
        /* Spaceship */
        if(this.spaceship.x < DEFAULT_SEPARATION) {
            this.spaceship.x = DEFAULT_SEPARATION
        }

        if(this.spaceship.x + this.spaceship.w > this.canvas.width - DEFAULT_SEPARATION) {
            this.spaceship.x = this.canvas.width - this.spaceship.w - DEFAULT_SEPARATION
        }

        /* Horde */
        this.alienHorde.checkBounds()
    }

    checkCollisions() {
        if(this.spaceship.bullets.length > 0 && this.alienHorde.horde.length > 0) {
            this.spaceship.bullets.forEach(bullet => {
                this.alienHorde.horde.forEach(row => {
                    row.forEach(alien => {
                        if( this.checkCollision(bullet, alien)) {
                            console.debug('Collision detected')
                            this.alienHorde.killAlien(alien)
                            this.score += alien.points
                            this.spaceship.destroyBullet(bullet)
                        }
                    })
                })
            })
        }
    }

    checkCollision(bullet, alien) {
        if( (bullet.x >= alien.x && bullet.x <= alien.x + alien.w) &&
            (bullet.y + BULLET_H <= alien.y + ALIEN_H && bullet.y >= alien.y) )
        {

            console.debug('Collision detected!!!')
            return true
        }
    }
}