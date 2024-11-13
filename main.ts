namespace SpriteKind {
    export const Cannon = SpriteKind.create()
    export const enemybullet = SpriteKind.create()
}
function spawnCannon () {
    CannonX = [
    25,
    60,
    95,
    130
    ]
    for (let index = 0; index <= 3; index++) {
        starShip = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . 7 7 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 . . 7 7 7 7 7 7 . 
            . 7 7 7 7 7 7 . . 7 7 7 7 7 7 . 
            . 7 7 7 7 7 . . . . 7 7 7 7 7 . 
            `, SpriteKind.Cannon)
        starShip.setPosition(CannonX[index], 95)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    info.changeScoreBy(250)
    hero.startEffect(effects.confetti)
})
sprites.onOverlap(SpriteKind.enemybullet, SpriteKind.Cannon, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    CannonHealth += -1
    if (CannonHealth == 0) {
        game.gameOver(false)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    boulet = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 2 2 2 . . . . . . 
        . . . . . . 2 3 1 3 2 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 3 1 1 1 3 . . . . . 
        . . . . . . 2 1 1 1 3 . . . . . 
        . . . . . . 2 1 1 1 2 . . . . . 
        . . . . . . 2 3 1 3 2 . . . . . 
        . . . . . . . 3 1 3 . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . 2 1 2 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, hero, 0, -200)
    boulet.setScale(0.4, ScaleAnchor.Middle)
})
sprites.onOverlap(SpriteKind.enemybullet, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
})
function setDifficulty () {
    Difficulty = game.askForNumber("Set Difficulty!", 1)
    if (Difficulty == 1) {
        Xvel = Xvel * 0.5
        CannonHealth = 50
    }
    if (Difficulty == 2) {
        Xvel = Xvel
        CannonHealth = 25
    }
    if (Difficulty == 3) {
        Xvel = Xvel * 1.5
        CannonHealth = 10
    }
    if (Difficulty >= 4) {
        game.splash("Invalid number. Try again!")
        setDifficulty()
    }
    if (Difficulty <= 0) {
        game.splash("Invalid number. Try again!")
        setDifficulty()
    }
}
function enemyBullet () {
    bizarro = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . 8 1 8 . . . . . . 
        . . . . . . . 8 1 8 . . . . . . 
        . . . . . . . 8 1 8 . . . . . . 
        . . . . . . . 9 1 9 . . . . . . 
        . . . . . . 8 9 1 9 8 . . . . . 
        . . . . . . 8 1 1 1 8 . . . . . 
        . . . . . . 8 1 1 1 9 . . . . . 
        . . . . . . 9 1 1 1 9 . . . . . 
        . . . . . . 9 1 1 1 9 . . . . . 
        . . . . . . 9 1 1 1 9 . . . . . 
        . . . . . . 8 9 1 9 8 . . . . . 
        . . . . . . . 8 8 8 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.enemybullet)
    bizarro.setPosition(randint(1, 151), 5)
    bizarro.setVelocity(0, 50)
}
function spawnHero () {
    hero = sprites.create(img`
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . 
        . . . . . . . . 7 . . . . . . . . 
        . . . . . . . 7 7 7 . . . . . . . 
        . . . . . 7 7 7 7 7 7 7 . . . . . 
        . . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        `, SpriteKind.Player)
    hero.setStayInScreen(true)
    controller.moveSprite(hero, 100, 0)
    hero.setScale(0.5, ScaleAnchor.Middle)
    hero.setPosition(79, 105)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Cannon, function (sprite, otherSprite) {
    CannonHealth += -1
    if (CannonHealth == 0) {
        game.gameOver(false)
    }
})
function spawnEnemy (Xpo: number, Ypo: number) {
    Xposition = Xpo
    Yposition = Ypo
    for (let index = 0; index < 4; index++) {
        for (let index3 = 0; index3 <= 8; index3++) {
            enemySprite = sprites.create(img`
                . . . . . . . . . . . 
                . . 7 . . . . . 7 . . 
                . . . 7 . . . 7 . . . 
                . . 7 7 7 7 7 7 7 . . 
                . 7 7 . 7 7 7 . 7 7 . 
                7 7 7 7 7 7 7 7 7 7 7 
                7 . 7 7 7 7 7 7 7 . 7 
                7 . 7 . . . . . 7 . 7 
                . . . 7 7 . 7 7 . . . 
                `, SpriteKind.Enemy)
            enemySprite.setPosition(Xposition, Yposition)
            enemySprite.setBounceOnWall(true)
            Xposition += 15
            animation.runImageAnimation(
            enemySprite,
            [img`
                . . . . . . . . . . . 
                . . 7 . . . . . 7 . . 
                . . . 7 . . . 7 . . . 
                . . 7 7 7 7 7 7 7 . . 
                . 7 7 . 7 7 7 . 7 7 . 
                7 7 7 7 7 7 7 7 7 7 7 
                7 . 7 7 7 7 7 7 7 . 7 
                7 . 7 . . . . . 7 . 7 
                . . . 7 7 . 7 7 . . . 
                `,img`
                . . . . . . . . . . . 
                . . 7 . . . . . 7 . . 
                . . . 7 . . . 7 . . . 
                7 . 7 7 7 7 7 7 7 . 7 
                7 7 7 . 7 7 7 . 7 7 7 
                7 7 7 7 7 7 7 7 7 7 7 
                . . 7 7 7 7 7 7 7 . . 
                . . 7 . . . . . 7 . . 
                . . . 7 7 . 7 7 . . . 
                `,img`
                . . . . . . . . . . . 
                . . 7 . . . . . 7 . . 
                . . . 7 . . . 7 . . . 
                7 . 7 7 7 7 7 7 7 . . 
                7 7 7 . 7 7 7 . 7 7 . 
                7 7 7 7 7 7 7 7 7 7 7 
                . . 7 7 7 7 7 7 7 . 7 
                . . 7 . . . . . 7 . 7 
                . . . 7 7 . 7 7 . . . 
                `,img`
                . . . . . . . . . . . 
                . . 7 . . . . . 7 . . 
                . . . 7 . . . 7 . . . 
                . . 7 7 7 7 7 7 7 . 7 
                . 7 7 . 7 7 7 . 7 7 7 
                7 7 7 7 7 7 7 7 7 7 7 
                7 . 7 7 7 7 7 7 7 . . 
                7 . 7 . . . . . 7 . . 
                . . . 7 7 . 7 7 . . . 
                `,img`
                . . . . . . . . . . . 
                . . 7 . . . . . 7 . . 
                . . . 7 . . . 7 . . . 
                7 . 7 7 7 7 7 7 7 . . 
                7 7 7 . 7 7 7 . 7 7 . 
                7 7 7 7 7 7 7 7 7 7 7 
                . . 7 7 7 7 7 7 7 . 7 
                . . 7 . . . . . 7 . 7 
                . . . 7 7 . 7 7 . . . 
                `,img`
                . . . . . . . . . . . 
                . . 7 . . . . . 7 . . 
                . . . 7 . . . 7 . . . 
                . . 7 7 7 7 7 7 7 . 7 
                . 7 7 . 7 7 7 . 7 7 7 
                7 7 7 7 7 7 7 7 7 7 7 
                7 . 7 7 7 7 7 7 7 . . 
                7 . 7 . . . . . 7 . . 
                . . . 7 7 . 7 7 . . . 
                `,img`
                . . . . . . . . . . . 
                . . 7 . . . . . 7 . . 
                . . . 7 . . . 7 . . . 
                . . 7 7 7 7 7 7 7 . . 
                . 7 7 . 7 7 7 . 7 7 . 
                7 7 7 7 7 7 7 7 7 7 7 
                7 . 7 7 7 7 7 7 7 . 7 
                7 . 7 . . . . . 7 . 7 
                . . . 7 7 . 7 7 . . . 
                `],
            500,
            true
            )
        }
        Yposition += 15
        Xposition = Xpo
    }
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.setVelocity(Xvel, 0)
    }
}
sprites.onOverlap(SpriteKind.enemybullet, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    hero.startEffect(effects.spray)
})
function spawnUFO () {
    spawnTime = game.runtime()
    UFO = sprites.create(img`
        . . . . . 7 7 7 7 7 7 . . . . . 
        . . . 7 7 7 7 7 7 7 7 7 7 . . . 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . 7 7 . 7 7 . 7 7 . 7 7 . 7 7 . 
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        . . 7 7 7 . . 7 7 . . 7 7 7 . . 
        . . . 7 . . . . . . . . 7 . . . 
        `, SpriteKind.Food)
    UFO.setVelocity(Xvel * 3, 0)
    UFO.setPosition(0, 60)
    UFO.setBounceOnWall(true)
}
let UFO: Sprite = null
let spawnTime = 0
let enemySprite: Sprite = null
let Yposition = 0
let Xposition = 0
let bizarro: Sprite = null
let Difficulty = 0
let boulet: Sprite = null
let CannonHealth = 0
let hero: Sprite = null
let starShip: Sprite = null
let CannonX: number[] = []
let Xvel = 0
Xvel = 50
setDifficulty()
scene.setBackgroundImage(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.ffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.ffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.ffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.ffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff99d99bbbbbffffffffffffffffffffffffffffffffffffff.ffffffffff.ffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff99ddbdd66168bffffff9fffffffffffffffffffffffffffffff.fffffffff..f.fffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff999ddbbbd66fff111ffffffb99fffffffffffffffffffffffffff.ffffffff..ff.ffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9966ddbbbb66fff11f1fffffffbbf99fffffffffffffffffffffffff.ffffff..fff.fffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdd69dddbbb6661fff1ffff1ff1ffffffbefffffffffffffffffffffff.fffff..ffff.ffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffddd9fddfb6dbd6ffffffffffffffffffffff99fffffffffffffffffff.ffff..ffffff.ffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffdbbd9ffff.fdbb66fff6ffffffffffffffffffff9fffffffffffffffff.ffff.fffffff.fffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffdbbb99fff..fdfff66ffffffffffffffffffffffff69ffffffffffffff.ffff.fffffff.ffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..ffffffffffffffffffffffffffffffffffffffffffffff.fff..ffffffff.ffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffdbbb999ffff.f.fffffffffffcbbfbefbbbcbfffffbbfffb9ffffffffff.fff.fffffffff.fffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffff9bbb999ffff..f.ffffffffffbccbffffffbbbbbfffffbfffffffffffff.fff.fffffffff.ffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffdbbb999ff9f..ff.8ffffff6fbbbbbfffffffcccffffffbbf8ffffffffff.ff.fff.ffffff.ffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff..f.ffffffffffbbcbfffffffffbcffffccfbf886f9fffff.ff.fff.ffffff.fffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffbbbbbddd9f..ff.88fffffffffffffffb.ffffffffffccffff886c9fff.ff.fff.ffffff.ffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffdfbbbbbddf9f.ff.ffff6ffffffffffbbd.bebbffffffffffbf..c86c9f.f..ff..ffffff.fffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff9bfdbdddffff..ff.ffff6fff6ffffdddd.dd..effffffffff...bbcccc.f.fff.f.ffffff.fffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffff9dbffddffffff.fff.ffffffffff.dddd.....fddfffffdffb...ffbbbb.9.fff.f.ffffff.ffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffddfffff..fff..ff.ffffffffff.bddd.d...ffdfffffffff..bbbfff8fb.9ff.f.ffffff.fffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffddfffff..f9f.fff.ffffffffb..ddd.d...ddfffffffff...f...ffbbffbcf.f.ffffff.ffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffdfffffff.f9.fff.ff8fff..f..fdd.f.f.ffffffffff....f.f.bbffff8.c.f.ffffff.fffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffff9ffffffffff99.f9f.f88fff.f.b.fd.d...dffffffff..f.fb.f.ffbfffff8.6.fffffff.fffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffff9fffff6.fff9fff9.fd88ff6..b.df.f..ffdfffffff.ff.ff.f.fffffffff.8.9ffffff.ffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffff99fffff6.9fffffff.fdffff..fb.d.f..fffffffff..ff.ff.ff.fff.ffffff.66fffff.fffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffff9dfffff.9fffffff.ffffff...f.d.f..ffffffff..fff.ff.ff.ffffffffffff669fff.ffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffff99fffff.9fffffff.ffffff..6.b.d..fdffffff.fff..ff.ff.ffffffffffffff69fff.ffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff999fffffdfffffff.ffffff..f6..d.f.ffffff..fff.fff.ff.fffffffffffffff66ff.fffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff999ffffffffffff9.fffff6..f.ff.f.ffffff.ffff.fff.fff.ffffffffffffffff69.ffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff999fff6ffffffff9.fffff..f.ff.f.fffff..ffff.fff.fffffbfffffffffffffff6.fffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff999bfffffffffdff.fffff..f.6..f.fffff.fffff.fff.ffffffffffffffffffffff.9fffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff99fbffffffffffff.fffff........fffff.fffff.fff.ffffffffffffffffffffff.f6fffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff99fbffffffff9ff.fffff.......fffff..fffff.fff.ffffffffffff.ffffffffff.f69ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff99fbffffffff9ff.ffff..f....f6fff.ffffef.fff.ffffffffffff.f.ffffffff.ff69ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff99fbffffff9f9f.fffff......fffff.ffffff.fff.ffffffffffff.f.ffffffff.fff69ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff9bffffffffff9f.ffff...f.f.f6f..ffffff.fdf.feffffff.fff...fffffbbf.ffff69ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff9bffffffffcf9.9fff...86..ff6.fffffdd.fdb.df.fffff.ff....ffffffeb.fffff69ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff9bfffffffccf9.99f...88..ff..fffffdd.dbb.b..fffff.ff.f..ffffffff.ffffff69ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff9effffffffff.fff....f..f..fffffff..fff...ffffff.ff.f..ffffffff.fffffff69ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff9bffbfffffcf.cc...f.....f66fffff.fffd..ddbffff.ffff..ffffffff.fffffffbb9ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffbbfbfffffff.cc.c.f....fffffffff.ffff..dffffff.ffff..ffffffff.ffffffffbb9ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff9dffffffffc.c.c...ff.fff6ffff..fff..fffffffffffff..fffffffff.fffffffffb9ffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffff9dfffffffffc.c.b.fffffffffff.fff...fffffffffffff..fffffffff.ffffffffff69ffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffff.f.ffffffffffff.f..f.fffffffffffff..fffffffff.fffffffffff69ffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffbffbffffc.c.bfffffffffff...ff.ffffffffffffff.fffffffff.ffffffffffff6fffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffbfffffc..fffffffffffffffff.ffffffffff.ff.ffffbffff.fffffffffffff6fffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffff..fffffffffffffffff.ffffffffff.ff.fffffffff.fffffffccfffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff9fdffffffcccccffffffffff6ffff.ffffffffff.ff.fffffffff.ffffffffccfffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff9f9ffbfffcccbcffffffffff6fff.ffffffffff.ff.fffffffff.fffffffffddfffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.ffffffffff.ff.fffffffff.fffffffffbdffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffbfffcccf9fbbffffffff.f6ffffffff.ff..fffffffff.ffffffffbbdffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff.9ffffbfffcc9fffdbbbfffff.fffffffffffff..ffffccfff.fffffffffbcfffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff..6f9fbfffcc9ff9ffbbbfff.fffffffffffff..fffffffff.ffffffffffbccffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff..9fffbfffccffffffdbbdd.fffffffff.fff..fffffffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff.f969fdfffccffffffffbb.dffffffff.fff..fffffffff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffff.ff96f6ffbccffffffffd.bdfffff.f.fff.f.ffffffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffff99..bbcccfffffff.fdffff6.f.f6f.f.ffffffff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffff96..cbccff99ffff.ffffffff.fff.f.ffffffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffff96.cccc9ff9fffffffffbffff6f.f.ffffffff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffff9fccbc99ffffffffffdffffff.6.fffffffff.ffffffffffffffffff6ffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffff9f9ccb9ffff.fffffffffbff.f6.ffffffff.ffffffffffffffffff69ffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffff69cccff9ffffffffffddf.ff.6fffffff.ffffffffffffffffff66fffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffff969cc9ffffffffffffdd.ff.f6ffffff.ffffffffffffbbffff669fffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffff96cccf.ffffffffdd..ff.ffffffff.ffffffffffffffffff669ffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffff96cfffff9fffffd.fff.6f6666ff.ffffffffffffffdfff66ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffff969ffff9fffdd.ffff.6f6ffff.ffffffffffffffdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffff9ffffffffff.ffff.f6f6fff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9f.ffff.ffffffff.fffffffff6ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9fff99.fffffffffffff.ffffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff69.9ffffffffffff.1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff9.6999f.ffffff1.1fffffffff1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.ff996.1f11f6f.ff111ffff61fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffff.91f1111.11118111666699fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffff.ffff999.f61166669999ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffffff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.ffffff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.ffffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.ffffff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.fffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffff.fffffffffffffffff.fff..fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffff...fffffffffffffff.fff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffff...fffffffffffffff.fff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffff...ffffffffffffffff.ff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffff...ffff.fffffffffff.ff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffff...ffff.ffffffffffff.f.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffff...ffff.ffffffffffff.f.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffff...ffff.ffffffffffff.f.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffff...ffff.fffffffffffff..ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffff...ffff.ffffffffffffff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffff..f.fff.ff.fffffffffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffff..f.fff.ff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffff..f.ff..ff..fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffff..f.ff.fff..ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffff..f.ff.ffff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffff..ff.f.ffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffff..ff.f.ffff..ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffff.fff.f.ffff..fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffff.f.fffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffff..fffff..ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffff..fffff..fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffff..ffffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffff.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff.fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
spawnHero()
spawnEnemy(1, 1)
spawnCannon()
info.setLife(3)
game.onUpdateInterval(15000, function () {
    spawnUFO()
})
game.onUpdateInterval(2000, function () {
    enemyBullet()
})
