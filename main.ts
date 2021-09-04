namespace SpriteKind {
    export const Lava = SpriteKind.create()
    export const Rock = SpriteKind.create()
    export const Orb = SpriteKind.create()
    export const Statue = SpriteKind.create()
    export const Magic = SpriteKind.create()
    export const Skeleton = SpriteKind.create()
    export const MapWipe = SpriteKind.create()
    export const Tree = SpriteKind.create()
    export const Eyes = SpriteKind.create()
}
namespace StatusBarKind {
    export const RockHealth = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Orb, function (sprite, otherSprite) {
    game.over(true)
})
function skeletonFollow (skelly: Sprite) {
    sprites.setDataNumber(skelly, "distance", Math.sqrt((princess.x - skelly.x) ** 2 + (princess.y - skelly.y) ** 2))
    if (sprites.readDataNumber(skelly, "distance") < 90) {
        skelly.follow(princess, 27)
    }
    if (sprites.readDataNumber(skelly, "distance") < 8) {
        scene.cameraShake(3, 100)
        skelly.setVelocity(skelly.vx * -1 * 5, skelly.vy * -1 * 5)
        info.changeLifeBy(-1)
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(princess, "falling"))) {
        princess.setImage(sprites.castle.princess2Back)
        sprites.setDataString(princess, "direction", "UP")
        for (let value of canMoveTiles) {
            if (princess.tileKindAt(TileDirection.Top, value) && floorTest) {
                floorTest = 0
                princess.y += step * -1
            }
        }
        floorTest = 1
    }
})
function createMap () {
    princess = sprites.create(img`
        . . . . . f f 4 4 f f . . . . . 
        . . . . f 5 4 5 5 4 5 f . . . . 
        . . . f e 3 3 3 3 3 3 e f . . . 
        . . f b 3 3 3 3 3 3 3 3 b f . . 
        . . f 3 3 3 3 3 3 3 3 3 3 f . . 
        . f 3 3 3 3 3 3 3 3 3 3 3 3 f . 
        . f b 3 3 3 3 3 3 3 3 3 3 b f . 
        . f b b 3 3 3 3 3 3 3 3 b b f . 
        . f b b b b b b b b b b b b f . 
        f c b b b b b b b b b b b b c f 
        f b b b b b b b b b b b b b b f 
        . f c c b b b b b b b b c c f . 
        . . e 4 c f f f f f f c 4 e . . 
        . . e f b d b d b d b b f e . . 
        . . . f f 1 d 1 d 1 d f f . . . 
        . . . . . f f b b f f . . . . . 
        `, SpriteKind.Player)
    princess.setFlag(SpriteFlag.Ghost, false)
    princess.z = 100
    sprites.setDataBoolean(princess, "falling", false)
    scene.cameraFollowSprite(princess)
    if (level == 1) {
        tiles.setTilemap(tilemap`level1`)
        tiles.placeOnRandomTile(princess, sprites.builtin.forestTiles0)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level2`)
        tiles.placeOnRandomTile(princess, sprites.dungeon.stairNorth)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level3`)
        tiles.placeOnRandomTile(princess, sprites.dungeon.stairEast)
        princess.setImage(img`
            . . . f 4 4 f f f f . . . . . . 
            . . f 4 5 5 4 5 f b f f . . . . 
            . . f 5 5 5 5 4 e 3 3 b f . . . 
            . . f e 4 4 4 e 3 3 3 3 b f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 e e 3 b e 3 3 3 3 f . . 
            . f 3 3 e e e f f 3 3 3 3 f . . 
            . f 3 e e e f b f b b b b f . . 
            . . f e 4 4 f 1 e b b b b f . . 
            . . . f 4 4 4 4 f b b b b f f . 
            . . . f e e e f f f b b b b f . 
            . . . f d d d e 4 4 f b b f . . 
            . . . f d d d e 4 4 e f f . . . 
            . . f b d b d b e e b f . . . . 
            . . f f 1 d 1 d 1 d f f . . . . 
            . . . . f f b b f f . . . . . . 
            `)
        victoryOrb = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . 4 4 4 5 5 4 4 4 . . . . 
            . . . 3 3 3 3 4 4 4 4 4 4 . . . 
            . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
            . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
            . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
            . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
            . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
            . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
            . . . 4 2 2 2 2 2 2 2 2 4 . . . 
            . . . . 4 4 2 2 2 2 4 4 . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Orb)
        victoryOrb.startEffect(effects.hearts)
        victoryOrb.startEffect(effects.halo)
        tiles.placeOnRandomTile(victoryOrb, sprites.dungeon.floorDarkDiamond)
    }
    shrine = sprites.create(img`
        ................
        .......ddd......
        ......dbbb......
        ......dbdd......
        ......bddd......
        ......bcdbd.....
        ......cbcbdd....
        ......bdbdbd....
        .....cbdbdcd....
        .....cbbbddb....
        .....cfbdbdd....
        ....bcfbddbd....
        ....bcfdddd.....
        ....bfbdddd.....
        ...bbfdddddb....
        ...dcbdddddd....
        .....bdddddd....
        .....bddbddd....
        .2...bddbdddb...
        .6cccbddbddddcc.
        c677bbdbbddddb7c
        b77bdbdbbddbdb7b
        b772dddbbddbbb7b
        b576bddbbddbb72b
        b7767bbbbbbbb76b
        b77777bbbbb7756b
        c77757777777777c
        bcc7777777577ccb
        dbbbbbbbbbbbbbbd
        dbbbbccccccbbbbd
        cbbbbbbbbbbbbbbc
        fccccccccccccccf
        `, SpriteKind.Statue)
    sprites.setDataBoolean(shrine, "activated", false)
    tiles.placeOnRandomTile(shrine, sprites.castle.tileDarkGrass2)
    shrine.y += -10
    for (let value of tiles.getTilesByType(assets.tile`tile10`)) {
        skeleton = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Skeleton)
        skeleton.z = 100
        tiles.placeOnTile(skeleton, value)
        skeleton.setFlag(SpriteFlag.Ghost, true)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile6`)) {
        if (Math.percentChance(15)) {
            tiles.setTileAt(value, assets.tile`tile6`)
        } else {
            tiles.setTileAt(value, outsideTiles[randint(0, outsideTiles.length - 1)])
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`tile11`)) {
        if (Math.percentChance(50)) {
            tiles.setTileAt(value, img`
                d d d d d d d d d d d d d d d d 
                d d d d d d d d c c c d d d d d 
                d d b c c d d c b b b c c d d d 
                d c c b b c d c b d b b b c d d 
                c b b b b b c c d d d d b c d d 
                c b d d b b c b b d d b b c d d 
                c b d d d b c b b b d d b c c d 
                c c b d c c c c b b b b b b d c 
                c b c b c d d b c b b d d b d c 
                c c b c b b d d d b b b b b d c 
                d c c c c b b d d d d b d d c c 
                d d d c b c c c b b b d b c c b 
                d d d c c b b c c c c c b b b b 
                d d d d c c c c c c c b b b c d 
                d d d d d c c c c c b b c c d d 
                d d d d d d d d c c c c d d d d 
                `)
        } else {
            tiles.setTileAt(value, img`
                d d d d d d d c c c c d d d d d 
                d d d d d d c c b b b c d d d d 
                d d d d d c c b b d d b c d d d 
                d d d d c b b d b d d b b c d d 
                d d d c b b b d b b d d b c c d 
                d d d c b b b d d b d b b c d c 
                d d c b c b b b d d b b c c d c 
                d c c b c c b b b b b c c c d b 
                c d c b b c c c c c c c c c b c 
                b d c c b b b b b b b b b b c b 
                b b c c c c c c c c b d d d c c 
                c b c c c c c c c b d d d d b d 
                d c c b b b c c c b b d d c b d 
                d d c c b b b c c b c c b b c d 
                d d c c c c c c c c b b b c c d 
                d d d c c c c c c c c c c c d d 
                `)
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`tile9`)) {
        treeTop = sprites.create(sprites.builtin.forestTree1, SpriteKind.Tree)
        tiles.placeOnTile(treeTop, value)
        treeTop.y += randint(-12, -16)
        treeTop.z = 120
    }
    for (let value of tiles.getTilesByType(assets.tile`tile1`)) {
        if (Math.percentChance(60)) {
            tiles.setTileAt(value, sprites.dungeon.floorLight0)
        } else {
            tiles.setTileAt(value, dungeonUpperTiles[randint(0, dungeonUpperTiles.length - 1)])
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`tile12`)) {
        if (Math.percentChance(60)) {
            tiles.setTileAt(value, sprites.dungeon.floorDark0)
        } else {
            tiles.setTileAt(value, dungeonLowerTiles[randint(0, dungeonLowerTiles.length - 1)])
        }
    }
    for (let value of tiles.getTilesByType(sprites.dungeon.darkGroundCenter)) {
        rockLedge = sprites.create(sprites.castle.rock0, SpriteKind.Rock)
        sprites.setDataNumber(rockLedge, "d", 100)
        rockLedge.z = 0
        sprites.setDataBoolean(rockLedge, "crumbling", false)
        tiles.placeOnTile(rockLedge, value)
    }
}
function organiseTiles () {
    outsideTiles = [sprites.castle.tileGrass1, sprites.castle.tileGrass3, sprites.castle.tileGrass2]
    dungeonUpperTiles = [
    sprites.dungeon.floorLight0,
    sprites.dungeon.floorLight1,
    sprites.dungeon.floorLightMoss,
    sprites.dungeon.floorLight4,
    sprites.dungeon.floorMixed
    ]
    dungeonLowerTiles = [sprites.dungeon.floorDark0, sprites.dungeon.floorDark1, sprites.dungeon.floorDark4]
    canMoveTiles = [
    sprites.dungeon.floorLight0,
    sprites.dungeon.floorLight1,
    sprites.dungeon.floorLightMoss,
    sprites.dungeon.floorLight4,
    sprites.dungeon.floorMixed,
    sprites.dungeon.hazardLava0,
    sprites.dungeon.hazardLava1,
    sprites.dungeon.floorDarkDiamond,
    sprites.dungeon.stairNorth,
    sprites.castle.tileGrass1,
    sprites.castle.tileGrass3,
    sprites.castle.tileGrass2,
    sprites.castle.tilePath5,
    sprites.castle.tilePath2,
    assets.tile`tile6`,
    sprites.castle.tileDarkGrass3,
    sprites.castle.tileDarkGrass1,
    assets.tile`tile7`,
    sprites.dungeon.doorClosedNorth,
    sprites.dungeon.darkGroundCenter,
    sprites.dungeon.floorDark0,
    sprites.dungeon.floorDark1,
    sprites.dungeon.floorDark4,
    sprites.dungeon.doorOpenWest
    ]
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(shrine, "activated"))) {
        if (sprites.readDataString(princess, "direction") == "UP") {
            if (princess.tileKindAt(TileDirection.Top, sprites.castle.tileDarkGrass2)) {
                activateShrine()
            }
        } else if (sprites.readDataString(princess, "direction") == "DOWN") {
            if (princess.tileKindAt(TileDirection.Bottom, sprites.castle.tileDarkGrass2)) {
                activateShrine()
            }
        } else if (sprites.readDataString(princess, "direction") == "LEFT") {
            if (princess.tileKindAt(TileDirection.Left, sprites.castle.tileDarkGrass2)) {
                activateShrine()
            }
        } else if (sprites.readDataString(princess, "direction") == "RIGHT") {
            if (princess.tileKindAt(TileDirection.Right, sprites.castle.tileDarkGrass2)) {
                activateShrine()
            }
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(princess, "falling"))) {
        princess.setImage(sprites.castle.princess2Left1)
        sprites.setDataString(princess, "direction", "LEFT")
        for (let value of canMoveTiles) {
            if (princess.tileKindAt(TileDirection.Left, value) && floorTest) {
                floorTest = 0
                princess.x += 0 - step
            }
        }
        floorTest = 1
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.doorClosedNorth, function (sprite, location) {
    sprite.destroy()
    clearMap()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.darkGroundCenter, function (sprite, location) {
    rockCheck = 0
    for (let value of rockList) {
        if (princess.overlapsWith(value)) {
            rockCheck += 1
        }
    }
    if (rockCheck > 0) {
        sprites.setDataBoolean(princess, "falling", false)
    } else {
        sprites.setDataBoolean(princess, "falling", true)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(princess, "falling"))) {
        princess.setImage(sprites.castle.princess2Right1)
        sprites.setDataString(princess, "direction", "RIGHT")
        for (let value of canMoveTiles) {
            if (princess.tileKindAt(TileDirection.Right, value) && floorTest) {
                floorTest = 0
                princess.x += step
            }
        }
        floorTest = 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Rock, function (sprite, otherSprite) {
    if (!(sprites.readDataBoolean(otherSprite, "crumbling"))) {
        pause(500)
        sprites.setDataBoolean(otherSprite, "crumbling", true)
        otherSprite.startEffect(effects.disintegrate, 1000)
        otherSprite.lifespan = 1000
        rockHealth = statusbars.create(20, 2, StatusBarKind.RockHealth)
        rockHealth.setColor(9, 12)
        rockHealth.max = 1000
        rockHealth.attachToSprite(otherSprite)
    }
})
function activateShrine () {
    music.setVolume(100)
    music.magicWand.play()
    for (let value of skeletonList) {
        sprites.setDataSprite(value, "shrine", sprites.create(img`
            . a . . 
            a . a . 
            . a . . 
            . . . . 
            `, SpriteKind.Magic))
        sprites.readDataSprite(value, "shrine").setFlag(SpriteFlag.Ghost, true)
        sprites.readDataSprite(value, "shrine").setPosition(shrine.x, shrine.y)
        sprites.setDataBoolean(shrine, "activated", true)
        sprites.readDataSprite(value, "shrine").follow(value, 80)
        sprites.readDataSprite(value, "shrine").startEffect(effects.hearts)
        sprites.readDataSprite(value, "shrine").startEffect(effects.fire)
        sprites.readDataSprite(value, "shrine").startEffect(effects.starField)
        animation.runImageAnimation(
        sprites.readDataSprite(value, "shrine"),
        [img`
            . a . . 
            a . a . 
            . a . . 
            . . . . 
            `,img`
            1 a 1 . 
            a 5 a . 
            1 a 1 . 
            . . . . 
            `,img`
            . 5 a 5 
            . a 2 a 
            . 5 a 5 
            . . . . 
            `,img`
            . . . . 
            . a . . 
            a . a . 
            . a . . 
            `],
        100,
        true
        )
    }
}
function summonSkulls () {
    for (let value of tiles.getTilesByType(sprites.dungeon.doorLockedSouth)) {
        if (Math.percentChance(75)) {
            skull = sprites.create(img`
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff5555ff........
                .......f25555552f.......
                .......f55555555f.......
                ......f4555555554f......
                ......f4555555554f......
                ......f4455555544f......
                ......f2455555542f......
                ......f2444554442f......
                .......f24444442f.......
                ........f244444f........
                .........f2f2f2.........
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                `, SpriteKind.Enemy)
            skull.startEffect(effects.fire)
            skull.setFlag(SpriteFlag.DestroyOnWall, true)
            tiles.placeOnTile(skull, value)
            skull.setVelocity(0, skullSpeed * -1)
        }
    }
    for (let value of tiles.getTilesByType(sprites.dungeon.doorLockedNorth)) {
        if (Math.percentChance(75)) {
            skull = sprites.create(img`
                ........................
                ........................
                ........................
                ........................
                ..........ffff..........
                ........ff5555ff........
                .......f25555552f.......
                .......f55555555f.......
                ......f4555555554f......
                ......f4555555554f......
                ......f4445555444f......
                ......f242a44a242f......
                ......f242a55a242f......
                .......f25555552f.......
                ........f242524f........
                .........22f2f2.........
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                `, SpriteKind.Enemy)
            skull.startEffect(effects.fire)
            skull.setFlag(SpriteFlag.DestroyOnWall, true)
            tiles.placeOnTile(skull, value)
            skull.setVelocity(0, skullSpeed)
        }
    }
    for (let value of tiles.getTilesByType(sprites.dungeon.doorLockedWest)) {
        if (Math.percentChance(75)) {
            skull = sprites.create(skullFlip, SpriteKind.Enemy)
            skull.startEffect(effects.fire)
            skull.setFlag(SpriteFlag.DestroyOnWall, true)
            tiles.placeOnTile(skull, value)
            skull.setVelocity(skullSpeed, 0)
        }
    }
    for (let value of tiles.getTilesByType(sprites.dungeon.doorLockedEast)) {
        if (Math.percentChance(75)) {
            skull = sprites.create(img`
                ........................
                ........................
                ........................
                ........................
                .........fffff..........
                ........f55555ff........
                .......f25555552f.......
                .......f555555542f......
                ......f4555555444f......
                ......f4555554444f......
                ......f4554444444f......
                ......f5554444444f......
                ......f55f2444444f......
                .....f2555524442f.......
                .....f52524f2fff........
                .....f2f2ff.f...........
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                ........................
                `, SpriteKind.Enemy)
            skull.startEffect(effects.fire)
            skull.setFlag(SpriteFlag.DestroyOnWall, true)
            tiles.placeOnTile(skull, value)
            skull.setVelocity(skullSpeed * -1, 0)
        }
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(sprites.readDataBoolean(princess, "falling"))) {
        princess.setImage(sprites.castle.princess2Front)
        sprites.setDataString(princess, "direction", "DOWN")
        for (let value of canMoveTiles) {
            if (princess.tileKindAt(TileDirection.Bottom, value) && floorTest) {
                floorTest = 0
                princess.y += step
            }
        }
        floorTest = 1
    }
})
sprites.onDestroyed(SpriteKind.Skeleton, function (sprite) {
    music.setVolume(35)
    music.baDing.play()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.doorOpenWest, function (sprite, location) {
    sprite.destroy()
    clearMap()
})
function clearMap () {
    level += 1
    info.changeLifeBy(1)
    game.splash("LEVEL ", convertToText(level))
    for (let value of sprites.allOfKind(SpriteKind.Player)) {
        value.setKind(SpriteKind.MapWipe)
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.setKind(SpriteKind.MapWipe)
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Skeleton)) {
        value.setKind(SpriteKind.MapWipe)
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Rock)) {
        value.setKind(SpriteKind.MapWipe)
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Statue)) {
        value.setKind(SpriteKind.MapWipe)
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Orb)) {
        value.setKind(SpriteKind.MapWipe)
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Tree)) {
        value.setKind(SpriteKind.MapWipe)
        value.destroy()
    }
    createMap()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(3, 100)
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
let eyes: Sprite = null
let skull: Sprite = null
let skeletonList: Sprite[] = []
let rockHealth: StatusBarSprite = null
let rockList: Sprite[] = []
let rockCheck = 0
let rockLedge: Sprite = null
let dungeonLowerTiles: Image[] = []
let dungeonUpperTiles: Image[] = []
let treeTop: Sprite = null
let outsideTiles: Image[] = []
let skeleton: Sprite = null
let shrine: Sprite = null
let victoryOrb: Sprite = null
let canMoveTiles: Image[] = []
let princess: Sprite = null
let floorTest = 0
let step = 0
let level = 0
let skullSpeed = 0
let skullFlip: Image = null
game.setDialogFrame(img`
    ...cc......................cc....
    ..c55c..bbbb...bbbbb......c55c...
    .cb55bcbdddbbbbbdddbbbbbbcb55bc..
    b555555bbdddb111bdddb11db555555b.
    bb5555bbdbdb11111bdb1111bb5555bb.
    cb5555bcddd11111ddd11111cb5555bc.
    .c5bb5c1111d111d111d111ddc5bb5c..
    .cbbbbc111111111111111111cbbbbc..
    ..b11111111111111111111111d111bb.
    ..b111111111111111111111111d1bdb.
    ..bb11111111111111111111111dbddb.
    .bbdb1d11111111111111111111ddddb.
    .bdddd11111111111111111111d1bdbb.
    .bddbd11111111111111111111111bb..
    .bdb1d111111111111111111111111b..
    .bb111d11111111111111111111111b..
    ..b11111111111111111111111d111bb.
    ..b111111111111111111111111d1bdb.
    ..bb11111111111111111111111dbddb.
    .bbdb1d11111111111111111111ddddb.
    .bdddd11111111111111111111d1bdbb.
    .bddbd11111111111111111111111bb..
    .bdbb1111111111111111111111111b..
    .bbbd1111111111111111111111111b..
    ..bcc111111111111111111111dccdb..
    ..c55c111d111d111d111d1111c55cb..
    .cb55bcdd11111ddd11111dddcb55bc..
    b555555b11111bdb11111bdbb555555b.
    bb5555bbb111bdddb111bdddbb5555bb.
    cb5555bcdbbbbbdddbbbbbddcb5555bc.
    .c5bb5c.bb...bbbbb...bbbbc5bb5c..
    .cbbbbc..................cbbbbc..
    .................................
    `)
game.showLongText("Dodge the enemies and activate the Magic Shrine to vanquish the ghosts", DialogLayout.Full)
organiseTiles()
info.setLife(2)
skullFlip = img`
    ........................
    ........................
    ........................
    ........................
    .........fffff..........
    ........f55555ff........
    .......f25555552f.......
    .......f555555542f......
    ......f4555555444f......
    ......f4555554444f......
    ......f4554444444f......
    ......f5554444444f......
    ......f55f2444444f......
    .....f2555524442f.......
    .....f52524f2fff........
    .....f2f2ff.f...........
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    ........................
    `
skullFlip.flipX()
skullSpeed = 75
level = 0
clearMap()
step = 16
floorTest = 1
let skelFlip = sprites.castle.skellyAttackLeft2
skelFlip.flipX()
game.onUpdate(function () {
    for (let value of statusbars.allOfKind(StatusBarKind.RockHealth)) {
        value.value = value.spriteAttachedTo().lifespan
        scene.cameraShake(2, 100)
    }
})
game.onUpdateInterval(1000, function () {
    summonSkulls()
    for (let value of tiles.getTilesByType(sprites.dungeon.hazardLava0)) {
        tiles.setTileAt(value, assets.tile`tile5`)
    }
    for (let value of tiles.getTilesByType(sprites.dungeon.hazardLava1)) {
        tiles.setTileAt(value, sprites.dungeon.hazardLava0)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile5`)) {
        tiles.setTileAt(value, sprites.dungeon.hazardLava1)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile2`)) {
        if (Math.percentChance(1)) {
            eyes = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Eyes)
            tiles.placeOnTile(eyes, value)
            eyes.lifespan = 4000
            if (Math.percentChance(50)) {
                animation.runImageAnimation(
                eyes,
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 2 . . . . . . . . . . . 2 . . 
                    . 2 2 . . . . . . . . . 2 2 . . 
                    . . 2 2 . . . . . . . 2 2 . . . 
                    . . . 2 2 2 . . . 2 2 2 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 2 2 . . . . . . . . . 2 2 . . 
                    . 2 2 2 . . . . . . . 2 2 2 . . 
                    . . 2 2 f . . . . . f 2 2 . . . 
                    . . . 2 2 2 . . . 2 2 2 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . 2 . . . . . . . . . 2 . . . 
                    . 2 2 2 2 . . . . . 2 2 2 2 . . 
                    . 2 2 2 2 2 . . . 2 2 2 2 2 . . 
                    . . 2 2 f 2 2 . 2 2 f 2 2 . . . 
                    . . . 2 2 2 . . . 2 2 2 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . 2 . . . . . . . . . 2 . . . 
                    . 2 2 2 2 . . . . . 2 2 2 2 . . 
                    . 2 2 2 2 2 . . . 2 2 2 2 2 . . 
                    . . 2 2 f 2 2 . 2 2 f 2 2 . . . 
                    . . . 2 2 2 . . . 2 2 2 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . 2 . . . . . . . . . 2 . . . 
                    . 2 2 2 2 . . . . . 2 2 2 2 . . 
                    . 2 2 2 2 2 . . . 2 2 2 2 2 . . 
                    . . 2 2 f 2 2 . 2 2 f 2 2 . . . 
                    . . . 2 2 2 . . . 2 2 2 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . 2 . . . . . . . . . 2 . . . 
                    . 2 2 2 2 . . . . . 2 2 2 2 . . 
                    . 2 2 2 2 2 . . . 2 2 2 2 2 . . 
                    . . 2 2 f 2 2 . 2 2 f 2 2 . . . 
                    . . . 2 2 2 . . . 2 2 2 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . 2 . . . . . . . . . 2 . . . 
                    . 2 2 2 2 . . . . . 2 2 2 2 . . 
                    . 2 2 2 2 2 . . . 2 2 2 2 2 . . 
                    . . 2 2 f 2 2 . 2 2 f 2 2 . . . 
                    . . . 2 2 2 . . . 2 2 2 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . 2 . . . . . . . . . 2 . . . 
                    . 2 2 2 2 . . . . . 2 2 2 2 . . 
                    . 2 2 2 2 2 . . . 2 2 2 2 2 . . 
                    . . 2 2 f 2 2 . 2 2 f 2 2 . . . 
                    . . . 2 2 2 . . . 2 2 2 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . 2 . . . . . . . . . 2 . . . 
                    . 2 2 2 2 . . . . . 2 2 2 2 . . 
                    . 2 2 2 2 2 . . . 2 2 2 2 2 . . 
                    . . 2 2 f 2 2 . 2 2 f 2 2 . . . 
                    . . . 2 2 2 . . . 2 2 2 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . 2 . . . . . . . . . 2 . . . 
                    . 2 2 2 2 . . . . . 2 2 2 2 . . 
                    . 2 2 2 2 2 . . . 2 2 2 2 2 . . 
                    . . 2 2 f 2 2 . 2 2 f 2 2 . . . 
                    . . . 2 2 2 . . . 2 2 2 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 2 . . . . . . . . . . . 2 . . 
                    . 2 2 . . . . . . . . . 2 2 . . 
                    . . 2 2 . . . . . . . 2 2 . . . 
                    . . . 2 2 2 . . . 2 2 2 . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `],
                200,
                false
                )
            } else {
                animation.runImageAnimation(
                eyes,
                [img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 1 1 1 . . 1 1 1 . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 1 1 1 . . 1 1 1 . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 1 1 1 . . 1 1 1 . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 1 1 1 . . 1 1 1 . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 1 1 1 . . 1 1 1 . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 1 1 1 . . 1 1 1 . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 1 1 1 . . 1 1 1 . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 1 1 1 . . 1 1 1 . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 1 1 1 . . 1 1 1 . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . 1 1 1 . . 1 1 1 . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . 1 1 . . 1 1 . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `,img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . 1 1 . . . 1 1 . 
                    . . . . . . . . . 1 1 . 1 1 . . 
                    . . . . . . . . . . . . . . . . 
                    `],
                200,
                false
                )
            }
        }
    }
})
forever(function () {
    if (princess.tileKindAt(TileDirection.Center, sprites.dungeon.hazardLava0) || princess.tileKindAt(TileDirection.Center, sprites.dungeon.hazardLava1)) {
        scene.cameraShake(2, 100)
        pause(200)
        info.changeLifeBy(-1)
    }
    if (sprites.readDataBoolean(shrine, "activated")) {
        shrine.startEffect(effects.starField, 100)
    }
    skeletonList = sprites.allOfKind(SpriteKind.Skeleton)
    for (let value of skeletonList) {
        skeletonFollow(value)
        if (sprites.allOfKind(SpriteKind.Magic).length > 0) {
            sprites.setDataNumber(sprites.readDataSprite(value, "shrine"), "distance", Math.sqrt((sprites.readDataSprite(value, "shrine").x - value.x) ** 2 + (sprites.readDataSprite(value, "shrine").y - value.y) ** 2))
            if (sprites.readDataNumber(sprites.readDataSprite(value, "shrine"), "distance") < 8) {
                value.destroy(effects.disintegrate, 200)
                sprites.readDataSprite(value, "shrine").destroy(effects.hearts, 500)
            }
        }
    }
    rockList = sprites.allOfKind(SpriteKind.Rock)
    for (let value of rockList) {
        sprites.setDataNumber(value, "d", Math.sqrt((princess.x - value.x) ** 2 + (princess.y - value.y) ** 2))
    }
    if (sprites.readDataBoolean(princess, "falling")) {
        princess.startEffect(effects.disintegrate, 500)
        scene.cameraShake(10, 500)
        pause(500)
        game.over(false)
    }
})
