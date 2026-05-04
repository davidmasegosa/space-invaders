class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.canvas.width = CANVAS_W
        this.canvas.height = CANVAS_H
        
        this.ctx = this.canvas.getContext('2d')

        this.backgroundMusic = document.getElementById('background-music')
        
        this.score = 0
        this.lifes = 3

        this.fps = FPS

        this.screen = 'not-started'

        this.scorePanel = new ScorePanel(this.ctx)
        this.lifesPanel = new LifesPanel(this.ctx)

        this.spaceship = new Spaceship(
            this.ctx,
            (CANVAS_W - SPACESHIP_W) / 2,
            CANVAS_H - LIFES_PANEL_H - SPACESHIP_H - DEFAULT_SEPARATION
        )

        this.alienArmy = new AlienArmy(this.ctx)
        this.alienHorde = this.alienArmy.currentHorde

        this.drawIntervalId = undefined
        
        addEventListener('keydown', (event) => this.onKeyEvent(event))
        addEventListener('keyup', (event) => this.onKeyEvent(event))
    }

    start() {
        this.screen = 'welcome'
        this.drawWelcomeScreen()
    }

    onKeyEvent(event) {
        if(this.screen === 'game') {
            this.spaceship.onKeyEvent(event)
        }

        else if(this.screen === 'welcome' && event.type === 'keydown' && event.keyCode === KEY_SPACE) {
            this.startPlaying()
        }

        else if(this.screen === 'game-over' && event.type === 'keydown' && event.keyCode === KEY_SPACE) {
            this.backgroundMusic.stop()
            this.startPlaying()
        }

        else if(this.screen === 'congratulations' && event.type === 'keydown' && event.keyCode === KEY_SPACE) {
            this.backgroundMusic.stop()
            this.startPlaying()
        }
    }

    drawWelcomeScreen() {
        this.welcomeSprite = new Image()
        this.welcomeSprite.src = './assets/images/sprites/screens/sprite-welcome.png'

        this.welcomeSprite.onload = () => {
            this.ctx.drawImage(
                this.welcomeSprite, 
                (CANVAS_W - WELCOME_SCREEN_W) / 2,
                (CANVAS_H - WELCOME_SCREEN_H) / 2
            )
        }
    }
    
    startPlaying() {
        console.debug('Game started')

        this.screen = 'game'

        this.backgroundMusic.currentTime = 0
        this.backgroundMusic.play()

        if(!this.drawIntervalId) {

            this.drawIntervalId = setInterval(() => {
                this.clear()
                this.move()
                this.checkBounds()
                this.checkSpaceshipBulletsCollisions()
                this.checkAlienBulletsCollisions()
                this.draw()
                this.checkOverLifes()
                this.checkAllAliensDead()
                this.checkAlienSpaceshipCollision()
                this.checkAlienTouchesGround()
            }, this.fps)
        }
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

        if(this.alienHorde.moveDirection === 'right') {
            this.alienHorde.horde.forEach(row => {
                row.forEach(alien => {

                    if(alien.x + ALIEN_W > CANVAS_W - DEFAULT_SEPARATION) {
                        this.alienHorde.moveDirection = 'down'
                        window.setTimeout(() => {
                            this.alienHorde.stopMovingDownAndMoveDirection('left')
                        }, 3000)
                    }
                })
            })
        }

        if(this.alienHorde.moveDirection === 'left') {
            this.alienHorde.horde.forEach(row => {
                row.forEach(alien => {

                    if(alien.x < DEFAULT_SEPARATION) {
                        this.alienHorde.moveDirection = 'down'
                        window.setTimeout(() => {
                            this.alienHorde.stopMovingDownAndMoveDirection('right')
                        }, 3000)
                    }
                })
            })
        }

        /* Spaceship bullets */

        this.spaceship.bullets.forEach(bullet => {
            if(bullet.y + bullet.h < SCORE_PANEL_H + BULLET_H) {
                this.spaceship.destroyBullet(bullet)
            }
        })

        /* Alien bullets */

        this.alienHorde.horde.forEach(row => {
            row.forEach(alien => {
                alien.bullets.forEach(bullet => {
                    if(bullet.y > CANVAS_H - LIFES_PANEL_H - BULLET_H) {
                        alien.destroyBullet(bullet)
                    }
                })
            })
        })
    }

    checkSpaceshipBulletsCollisions() {
        if(this.spaceship.bullets.length > 0 && this.alienHorde.horde.length > 0) {
            this.spaceship.bullets.forEach(bullet => {
                this.alienHorde.horde.forEach(row => {
                    row.forEach(alien => {
                        if( this.checkSpaceshipBulletsCollision(bullet, alien)) {
                            console.debug('Collision detected')
                            this.alienHorde.destroyAlien(alien)
                            this.score += alien.points
                            this.spaceship.destroyBullet(bullet)
                        }
                    })
                })
            })
        }
    }

    checkSpaceshipBulletsCollision(bullet, alien) {
        const bulletRight = bullet.x + BULLET_W;
        const bulletBottom = bullet.y + BULLET_H;
        const alienRight = alien.x + alien.w;
        const alienBottom = alien.y + alien.h;

        if (bullet.x < alienRight && bulletRight > alien.x &&
            bullet.y < alienBottom && bulletBottom > alien.y) {
            return true;
        }
        return false;
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

    checkAlienSpaceshipCollision() {
        this.alienHorde.horde.forEach(row => {
            row.forEach(alien => {
                if (this.alienSpaceshipCollisionDetection(alien, this.spaceship)) {
                    window.clearInterval(this.drawIntervalId)
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    this.screen = 'game-over'
                    this.gameOver()
                }
            })
        })
    }

    alienSpaceshipCollisionDetection(alien, spaceship) {
        const alienRight = alien.x + alien.w;
        const alienBottom = alien.y + alien.h;
        const spaceshipRight = spaceship.x + spaceship.w;
        const spaceshipBottom = spaceship.y + spaceship.h;

        if( alien.x < spaceshipRight && alienRight > spaceship.x &&
            alien.y < spaceshipBottom && alienBottom > spaceship.y) {
            return true;
        }
        return false;
    }

    checkAlienTouchesGround(){
        this.alienHorde.horde.forEach(row => {
            row.forEach(alien => {
                if (alien.y + alien.h >= CANVAS_H - LIFES_PANEL_H) {
                    window.clearInterval(this.drawIntervalId)
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    this.screen = 'game-over'
                    this.gameOver()
                }
            })
        })
    }

    checkAlienBulletCollision(bullet, spaceship) {
        const bulletRight = bullet.x + BULLET_W;
        const bulletBottom = bullet.y + BULLET_H;
        const spaceshipRight = spaceship.x + spaceship.w;
        const spaceshipBottom = spaceship.y + spaceship.h;

        if (bullet.x < spaceshipRight && bulletRight > spaceship.x &&
            bullet.y < spaceshipBottom && bulletBottom > spaceship.y) {
            return true;
        }
        return false;
    }

    checkOverLifes () {
        if(this.lifes <= 0) {
            window.clearInterval(this.drawIntervalId)
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.screen = 'game-over'
            this.gameOver()
        }
    }

    gameOver () {
        this.resetGameValues()
        this.screen = 'game-over'
        this.drawGameOverScreen()
    }

    drawGameOverScreen() {
        this.gameOverSprite = new Image()
        this.gameOverSprite.src = './assets/images/sprites/screens/sprite-game-over.png'

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

        this.score = 0
        this.lifes = 3

        this.drawIntervalId = undefined
        
        this.alienArmy = new AlienArmy(this.ctx)
        this.alienHorde = this.alienArmy.currentHorde
    }

    checkAllAliensDead() {
        let remainingAliensCount = 0

        this.alienHorde.horde.forEach(row => row.forEach( al => remainingAliensCount++))

        console.log('remainingAliensCount')
        console.log(remainingAliensCount)

        if(remainingAliensCount <= 0) {
            this.checkRemainingHordes()
        }
    }

    checkRemainingHordes() {
        if(this.alienArmy.remainingHordes <= 1) {
            this.playerWins()
            
        }
        else {
            this.alienArmy.remainingHordes -= 1
            this.alienArmy.createHorde()
            this.alienHorde = this.alienArmy.currentHorde
        }
    }

    playerWins () {
        window.clearInterval(this.drawIntervalId)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.resetGameValues()
        this.screen = 'congratulations'
        this.drawCongratulationsScreen()
    }

    drawCongratulationsScreen() {
        this.CongratulationsSprite = new Image()
        this.CongratulationsSprite.src = './assets/images/sprites/screens/sprite-congratulations.png'

        this.CongratulationsSprite.onload = () => {
            this.ctx.drawImage(
                this.CongratulationsSprite, 
                (CANVAS_W - CONGRATS_SCREEN_W) / 2,
                (CANVAS_H - CONGRATS_SCREEN_H) / 2
            )
        }
    }
}