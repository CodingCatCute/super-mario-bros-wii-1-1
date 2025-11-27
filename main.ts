namespace SpriteKind {
    export const Background = SpriteKind.create()
    export const Goomba = SpriteKind.create()
    export const Koopa = SpriteKind.create()
}
function Level_SetupStart () {
    game.splash("1 - 1")
    music.play(music.createSong(assets.song`Beginning Level theme`), music.PlaybackMode.UntilDone)
    music.play(music.createSong(assets.song`Main Theme`), music.PlaybackMode.LoopingInBackground)
    tiles.setCurrentTilemap(tilemap`Level`)
    MarioLuigi_Player = sprites.create(img`
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
        `, SpriteKind.Player)
    animation.runImageAnimation(
    MarioLuigi_Player,
    CharacterCharacter_Animations[0],
    200,
    true
    )
    scene.cameraFollowSprite(MarioLuigi_Player)
    tiles.placeOnTile(MarioLuigi_Player, tiles.getTileLocation(3, 16))
    MarioLuigi_Player.ay = 40
    Animation = 0
}
function Check_For_Brick_Up () {
    if (tiles.tileAtLocationEquals(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Top).getNeighboringLocation(CollisionDirection.Top), assets.tile`Breakable Brick`)) {
        tiles.setTileAt(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Top).getNeighboringLocation(CollisionDirection.Top), assets.tile`Sky`)
        tiles.setWallAt(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Top).getNeighboringLocation(CollisionDirection.Top), false)
    }
    if (tiles.tileAtLocationEquals(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Top).getNeighboringLocation(CollisionDirection.Top), assets.tile`PSwitch Brick`)) {
        tiles.setTileAt(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Top).getNeighboringLocation(CollisionDirection.Top), assets.tile`Underground Sky`)
        tiles.setWallAt(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Top).getNeighboringLocation(CollisionDirection.Top), false)
    }
}
function Check_For_Pipe_Up () {
    if (Where_the_player_is == 1) {
        if (MarioLuigi_Player.tilemapLocation().column == 22 && MarioLuigi_Player.tilemapLocation().row == 14 || MarioLuigi_Player.tilemapLocation().column == 23 && MarioLuigi_Player.tilemapLocation().row == 14) {
            tiles.setCurrentTilemap(tilemap`Level`)
            tiles.placeOnTile(MarioLuigi_Player, tiles.getTileLocation(82, 15))
        }
    }
    if (Where_the_player_is == 2) {
        if (MarioLuigi_Player.tilemapLocation().column == 10 && MarioLuigi_Player.tilemapLocation().row == 13 || MarioLuigi_Player.tilemapLocation().column == 11 && MarioLuigi_Player.tilemapLocation().row == 13) {
            tiles.setCurrentTilemap(tilemap`Level`)
            tiles.placeOnTile(MarioLuigi_Player, tiles.getTileLocation(189, 17))
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Koopa, function (sprite, otherSprite) {
    if (Invincibility == 0) {
        if (Player_Heli == 1) {
            music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
            Player_Heli = 0
            Invincibility = 1
            pause(3000)
            Invincibility = 0
            MarioLuigi_Player.ay = 40
        } else {
            music.stopAllSounds()
            music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
            game.gameOver(false)
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`PSwitch`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`Underground Sky`)
    for (let value of tiles.getTilesByType(assets.tile`Coin Underground`)) {
        tiles.setTileAt(value, assets.tile`Sky`)
        tiles.setWallAt(value, true)
    }
    for (let value of tiles.getTilesByType(assets.tile`PSwitch Brick`)) {
        tiles.setTileAt(value, assets.tile`Coin Underground`)
        tiles.setWallAt(value, false)
    }
    for (let value of tiles.getTilesByType(assets.tile`Sky`)) {
        tiles.setTileAt(value, assets.tile`PSwitch Brick`)
    }
    timer.after(15000, function () {
        for (let value of tiles.getTilesByType(assets.tile`Coin Underground`)) {
            tiles.setTileAt(value, assets.tile`Sky`)
            tiles.setWallAt(value, true)
        }
        for (let value of tiles.getTilesByType(assets.tile`PSwitch Brick`)) {
            tiles.setTileAt(value, assets.tile`Coin Underground`)
            tiles.setWallAt(value, false)
        }
        for (let value of tiles.getTilesByType(assets.tile`Sky`)) {
            tiles.setTileAt(value, assets.tile`PSwitch Brick`)
        }
    })
})
function Character_Choosing () {
    music.play(music.createSong(assets.song`Character Select Song 1`), music.PlaybackMode.LoopingInBackground)
    music.play(music.createSong(assets.song`Character Select Song 2`), music.PlaybackMode.LoopingInBackground)
    Character_Choosing_Sprite = sprites.create(assets.image`Mario Character Select`, SpriteKind.Player)
    Character_Choosing_Sprite.setPosition(80, 60)
    while (!(browserEvents.Enter.isPressed())) {
        if (browserEvents.ArrowLeft.isPressed()) {
            Character_Choosing_Sprite.setImage(assets.image`Mario Character Select`)
            Character = 0
        }
        if (browserEvents.ArrowRight.isPressed()) {
            Character_Choosing_Sprite.setImage(assets.image`Luigi Character Select`)
            Character = 1
        }
        pause(25)
    }
    sprites.destroy(Character_Choosing_Sprite)
    if (Character == 0) {
        CharacterCharacter_Animations = [
        assets.animation`Mario Idle`,
        assets.animation`Mario Left`,
        assets.animation`Mario Right`,
        assets.animation`Mario Jump`,
        assets.animation`Heli Mario Idle`,
        assets.animation`Heli Mario Left`,
        assets.animation`Heli Mario Right`,
        assets.animation`Heli Mario Jump`,
        assets.animation`Helicopter Mario`
        ]
    } else {
        CharacterCharacter_Animations = [
        assets.animation`Luigi Idle`,
        assets.animation`Luigi Left`,
        assets.animation`Luigi Right`,
        assets.animation`Luigi Jump`,
        assets.animation`Heli Luigi Idle`,
        assets.animation`Heli Luigi Left`,
        assets.animation`Heli Luigi Right`,
        assets.animation`Heli Luigi Jump`,
        assets.animation`Helicopter Luigi`
        ]
    }
    music.stopAllSounds()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Goomba, function (sprite, otherSprite) {
    if (Invincibility == 0) {
        if (Player_Heli == 1) {
            music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
            Player_Heli = 0
            Invincibility = 1
            pause(3000)
            Invincibility = 0
            MarioLuigi_Player.ay = 40
        } else {
            music.stopAllSounds()
            music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
            game.gameOver(false)
        }
    }
})
sprites.onCreated(SpriteKind.Koopa, function (sprite) {
    tiles.placeOnTile(sprite, tiles.getTilesByType(assets.tile`Grass`)[randint(0, tiles.getTilesByType(assets.tile`Grass`).length - 1)].getNeighboringLocation(CollisionDirection.Top))
})
function Enemy_Spawning () {
    for (let index = 0; index < 10; index++) {
        Goomba = sprites.create(assets.image`Goomba`, SpriteKind.Goomba)
    }
    for (let index = 0; index < 5; index++) {
        Koopa_Troopa = sprites.create(assets.image`Koopa Troopa`, SpriteKind.Koopa)
    }
}
function Check_for_Question_Block () {
    if (tiles.tileAtLocationEquals(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Top).getNeighboringLocation(CollisionDirection.Top), assets.tile`Question Block`)) {
        tiles.setTileAt(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Top).getNeighboringLocation(CollisionDirection.Top), assets.tile`Unbreakable Block`)
        if (randint(0, 3) == 0) {
            if (Player_Heli == 0) {
                Player_Heli = 1
            } else {
                info.changeScoreBy(10)
            }
        } else {
            info.changeScoreBy(10)
        }
    }
}
function Peach_Cutscene () {
    music.play(music.createSong(assets.song`Peach Cutscene Song 1`), music.PlaybackMode.InBackground)
    Cutscene_Sprite = sprites.create(assets.image`Cutscene`, SpriteKind.Background)
    Cutscene_Sprite.setPosition(80, 60)
    animation.runImageAnimation(
    Cutscene_Sprite,
    assets.animation`Peach Cutscene Animation`,
    100,
    false
    )
    pause(14000)
    sprites.destroy(Cutscene_Sprite)
    music.stopAllSounds()
    music.play(music.createSong(assets.song`Peach Cutscene Song 2`), music.PlaybackMode.UntilDone)
    pause(1000)
}
function Below_is_wall () {
    return tiles.tileAtLocationIsWall(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom))
}
function Variable_Falling () {
    if (MarioLuigi_Player.vy > 0) {
        for (let value of tiles.getTilesByType(assets.tile`Platform`)) {
            tiles.setWallAt(value, true)
        }
    } else {
        for (let value of tiles.getTilesByType(assets.tile`Platform`)) {
            tiles.setWallAt(value, false)
        }
    }
}
function Animate_Item (Index: number) {
    if (Animation != Index) {
        animation.runImageAnimation(
        MarioLuigi_Player,
        CharacterCharacter_Animations[Index],
        200,
        true
        )
        Animation = Index
    }
}
sprites.onCreated(SpriteKind.Goomba, function (sprite) {
    tiles.placeOnTile(sprite, tiles.getTilesByType(assets.tile`Grass`)[randint(0, tiles.getTilesByType(assets.tile`Grass`).length - 1)].getNeighboringLocation(CollisionDirection.Top))
})
let Cutscene_Sprite: Sprite = null
let Koopa_Troopa: Sprite = null
let Goomba: Sprite = null
let Character = 0
let Character_Choosing_Sprite: Sprite = null
let Invincibility = 0
let Animation = 0
let CharacterCharacter_Animations: Image[][] = []
let MarioLuigi_Player: Sprite = null
let Where_the_player_is = 0
let Player_Heli = 0
if (true) {
    Peach_Cutscene()
}
Character_Choosing()
pause(1000)
Level_SetupStart()
Enemy_Spawning()
Player_Heli = 0
Where_the_player_is = 0
info.setScore(0)
while (true) {
    if (Player_Heli == 0) {
        // Walk Left
        // Need to do: Check if left of character is wall, if not, move left and animate left
        // Walk Right
        // Need to do: Check if right of character is wall, if not, move right and animate right
        // Jump
        // Need to do: Check if below is block, if so, move up, jump animation, check to see if above is a wall or a pipe
        // Into Pipe
        // Need to do: Check if below is pipe, if so, set new tilemap, set character position
        // Use Power Up
        // Need to do: See if heli, then close to the same thing as jump
        if (browserEvents.ArrowLeft.isPressed()) {
            if (Below_is_wall()) {
                Animate_Item(1)
            }
            MarioLuigi_Player.x += -1
        }
        // Walk Left
        // Need to do: Check if left of character is wall, if not, move left and animate left
        // Walk Right
        // Need to do: Check if right of character is wall, if not, move right and animate right
        // Jump
        // Need to do: Check if below is block, if so, move up, jump animation, check to see if above is a wall or a pipe
        // Into Pipe
        // Need to do: Check if below is pipe, if so, set new tilemap, set character position
        // Use Power Up
        // Need to do: See if heli, then close to the same thing as jump
        if (browserEvents.ArrowRight.isPressed()) {
            if (Below_is_wall()) {
                Animate_Item(2)
            }
            MarioLuigi_Player.x += 1
        }
        if (browserEvents.ArrowUp.isPressed() && Below_is_wall()) {
            Animate_Item(3)
            MarioLuigi_Player.vy = -64
            Check_for_Question_Block()
            Check_For_Pipe_Up()
            Check_For_Brick_Up()
        }
    } else {
        // Walk Left
        // Need to do: Check if left of character is wall, if not, move left and animate left
        // Walk Right
        // Need to do: Check if right of character is wall, if not, move right and animate right
        // Jump
        // Need to do: Check if below is block, if so, move up, jump animation, check to see if above is a wall or a pipe
        // Into Pipe
        // Need to do: Check if below is pipe, if so, set new tilemap, set character position
        // Use Power Up
        // Need to do: See if heli, then close to the same thing as jump
        if (browserEvents.ArrowLeft.isPressed()) {
            if (Below_is_wall()) {
                Animate_Item(5)
            }
            MarioLuigi_Player.x += -1
        }
        // Walk Left
        // Need to do: Check if left of character is wall, if not, move left and animate left
        // Walk Right
        // Need to do: Check if right of character is wall, if not, move right and animate right
        // Jump
        // Need to do: Check if below is block, if so, move up, jump animation, check to see if above is a wall or a pipe
        // Into Pipe
        // Need to do: Check if below is pipe, if so, set new tilemap, set character position
        // Use Power Up
        // Need to do: See if heli, then close to the same thing as jump
        if (browserEvents.ArrowRight.isPressed()) {
            if (Below_is_wall()) {
                Animate_Item(6)
            }
            MarioLuigi_Player.x += 1
        }
        if (browserEvents.ArrowUp.isPressed() && Below_is_wall()) {
            MarioLuigi_Player.vy = -64
            Check_for_Question_Block()
            Check_For_Pipe_Up()
            Check_For_Brick_Up()
            Animate_Item(7)
        }
        if (browserEvents.Z.isPressed() && Below_is_wall()) {
            MarioLuigi_Player.ay = 30
            Animate_Item(8)
            MarioLuigi_Player.vy = -100
            Check_for_Question_Block()
            Check_For_Pipe_Up()
            Check_For_Brick_Up()
        }
        if (!(Below_is_wall())) {
            Check_For_Brick_Up()
        }
    }
    if (browserEvents.ArrowDown.isPressed() && (MarioLuigi_Player.tilemapLocation().column == 61 && MarioLuigi_Player.tilemapLocation().row == 15 || MarioLuigi_Player.tilemapLocation().column == 62 && MarioLuigi_Player.tilemapLocation().row == 15)) {
        tiles.setCurrentTilemap(tilemap`Underground P1`)
        tiles.placeOnTile(MarioLuigi_Player, tiles.getTileLocation(3, 13))
        Where_the_player_is = 1
    }
    if (browserEvents.ArrowDown.isPressed() && (MarioLuigi_Player.tilemapLocation().column == 196 && MarioLuigi_Player.tilemapLocation().row == 18 || MarioLuigi_Player.tilemapLocation().column == 197 && MarioLuigi_Player.tilemapLocation().row == 18)) {
        tiles.setCurrentTilemap(tilemap`Underground P2`)
        tiles.placeOnTile(MarioLuigi_Player, tiles.getTileLocation(4, 12))
        Where_the_player_is = 2
    }
    if (MarioLuigi_Player.tileKindAt(TileDirection.Top, assets.tile`Coin`)) {
        tiles.setTileAt(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Top), assets.tile`Sky`)
        info.changeScoreBy(1)
    } else if (MarioLuigi_Player.tileKindAt(TileDirection.Center, assets.tile`Coin`)) {
        tiles.setTileAt(MarioLuigi_Player.tilemapLocation(), assets.tile`Sky`)
        info.changeScoreBy(1)
    } else if (MarioLuigi_Player.tileKindAt(TileDirection.Top, assets.tile`Coin Underground`)) {
        tiles.setTileAt(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Top), assets.tile`Underground Sky`)
        info.changeScoreBy(1)
    } else if (MarioLuigi_Player.tileKindAt(TileDirection.Center, assets.tile`Coin Underground`)) {
        tiles.setTileAt(MarioLuigi_Player.tilemapLocation(), assets.tile`Underground Sky`)
        info.changeScoreBy(1)
    } else if (MarioLuigi_Player.tileKindAt(TileDirection.Bottom, assets.tile`Coin`)) {
        tiles.setTileAt(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom), assets.tile`Sky`)
        info.changeScoreBy(1)
    } else if (MarioLuigi_Player.tileKindAt(TileDirection.Bottom, assets.tile`Coin Underground`)) {
        tiles.setTileAt(MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom), assets.tile`Underground Sky`)
        info.changeScoreBy(1)
    }
    Variable_Falling()
    if (MarioLuigi_Player.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom).row == 20) {
        music.stopAllSounds()
        game.gameOver(false)
    }
    pause(25)
}
