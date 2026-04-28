class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.canvas.width = CANVAS_W
        this.canvas.height = CANVAS_H
        this.ctx = this.canvas.getContext('2d')

        this.screen = 'welcome'

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
        this.drawWelcomeScreen()
        addEventListener('keydown', (event) => this.onKeyEvent(event))
    }

    drawWelcomeScreen() {
        this.welcomeSprite = new Image()
        this.welcomeSprite.src = '/assets/images/sprites/screens/sprite-welcome.png'

        this.welcomeSprite.onload = () => {
            this.ctx.drawImage(
                this.welcomeSprite, 
                (CANVAS_W - WELCOME_SCREEN_W) / 2,
                (CANVAS_H - WELCOME_SCREEN_H) / 2
            )
        }
    }

    onKeyEvent(event) {
        if(this.screen === 'welcome' && event.type === 'keydown' && event.keyCode === KEY_SPACE) {
            this.startPlaying()
        }
    }

    startPlaying() {
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
        this.alienHorde.horde.forEach(row => {
            row.forEach(alien => {
                alien.bullets.forEach(bullet => bullet.move())
            })
        })
    }

    draw() {
        this.scorePanel.draw(this.score)
        this.lifesPanel.draw()
        this.spaceship.draw()
        this.spaceship.bullets.forEach(bullet => bullet.draw())
        this.alienHorde.draw()
        this.alienHorde.horde.forEach(row => {
            row.forEach(alien => {
                alien.bullets.forEach(bullet => bullet.draw())
            })
        })
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