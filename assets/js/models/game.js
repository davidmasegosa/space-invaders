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

        this.lifes = 3

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

        else if(this.screen === 'game-over' && event.type === 'keydown' && event.keyCode === KEY_SPACE) {
            this.startPlaying()
        }

        else if(this.screen === 'congratulations' && event.type === 'keydown' && event.keyCode === KEY_SPACE) {
            this.startPlaying()
        }
    }

    startPlaying() {
        console.debug('Game started')

        this.screen = 'game'

        if(!this.drawIntervalId) {

            this.setupListeners()

            this.drawIntervalId = setInterval(() => {
                this.clear()
                this.move()
                this.checkBounds()
                this.checkCollisions()
                this.checkAlienBulletsCollisions()
                this.draw()
                this.checkGameOver()
                this.checkPlayerWins()
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
        this.lifesPanel.draw(this.lifes)
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

    checkAlienBulletsCollisions() {
        this.alienHorde.horde.forEach(row => {
            row.forEach(alien => {
                alien.bullets.forEach(bullet => {
                    if (this.checkAlienBulletCollision(bullet, this.spaceship)) {
                        //
                        console.debug('Collision detected')
                        this.lifes -= 1
                        alien.destroyBullet(bullet)
                    }
                });
            });
        });
    }

    checkAlienBulletCollision(bullet, spaceship) {
        if( (bullet.x >= spaceship.x && bullet.x <= spaceship.x + spaceship.w) &&
            (bullet.y + BULLET_H <= spaceship.y + SPACESHIP_H && bullet.y >= spaceship.y) )
        {

            console.debug('Collision detected!!!')
            return true
        }
    }

    checkGameOver () {
        if(this.lifes <= 0) {
            window.clearInterval(this.drawIntervalId)
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.screen = 'game-over'
            this.gameOver()
        }
    }

    gameOver () {
        this.resetGameValues()
        this.drawGameOverScreen()
        addEventListener('keydown', (event) => this.onKeyEvent(event))
    }

    drawGameOverScreen() {
        this.gameOverSprite = new Image()
        this.gameOverSprite.src = '/assets/images/sprites/screens/sprite-game-over.png'

        this.gameOverSprite.onload = () => {
            this.ctx.drawImage(
                this.gameOverSprite, 
                (CANVAS_W - GAME_OVER_SCREEN_W) / 2,
                (CANVAS_H - GAME_OVER_SCREEN_H) / 2
            )
        }
    }

    resetGameValues() {
        this.spaceship = new Spaceship(
            this.ctx,
            (CANVAS_W - SPACESHIP_W) / 2,
            CANVAS_H - LIFES_PANEL_H - SPACESHIP_H - DEFAULT_SEPARATION
        )

        this.alienHorde = new AlienHorde(this.ctx)

        this.score = 0

        this.lifes = 3

        this.drawIntervalId = undefined
    }

    checkPlayerWins() {
        let remainingAliensCount = 0

        this.alienHorde.horde.forEach(row => row.forEach( al => remainingAliensCount++))

        console.log('remainingAliensCount')
        console.log(remainingAliensCount)

        if(remainingAliensCount <= 0) {
            window.clearInterval(this.drawIntervalId)
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.screen = 'congratulations'
            this.playerWins()
        }
    }

    playerWins () {
        this.resetGameValues()
        this.drawCongratulationsScreen()
        addEventListener('keydown', (event) => this.onKeyEvent(event))
    }

    drawCongratulationsScreen() {
        this.CongratulationsSprite = new Image()
        this.CongratulationsSprite.src = '/assets/images/sprites/screens/sprite-congratulations.png'

        this.CongratulationsSprite.onload = () => {
            this.ctx.drawImage(
                this.CongratulationsSprite, 
                (CANVAS_W - GAME_OVER_SCREEN_W) / 2,
                (CANVAS_H - GAME_OVER_SCREEN_H) / 2
            )
        }
    }
}