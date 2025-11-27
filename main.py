@namespace
class SpriteKind:
    Background = SpriteKind.create()
def Character_Choosing():
    global Character_Choosing_Sprite, Character, CharacterCharacter_Animations
    music.play(music.create_song(assets.song("""
            Character Select Song 1
            """)),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    music.play(music.create_song(assets.song("""
            Character Select Song 2
            """)),
        music.PlaybackMode.LOOPING_IN_BACKGROUND)
    Character_Choosing_Sprite = sprites.create(assets.image("""
            Mario Character Select
            """),
        SpriteKind.player)
    Character_Choosing_Sprite.set_position(80, 60)
    while not (browserEvents.enter.is_pressed()):
        if browserEvents.arrow_left.is_pressed():
            Character_Choosing_Sprite.set_image(assets.image("""
                Mario Character Select
                """))
            Character = 0
        if browserEvents.arrow_right.is_pressed():
            Character_Choosing_Sprite.set_image(assets.image("""
                Luigi Character Select
                """))
            Character = 1
        pause(25)
    sprites.destroy(Character_Choosing_Sprite)
    if Character == 0:
        CharacterCharacter_Animations = [assets.animation("""
                Mario Idle
                """),
            assets.animation("""
                Mini Mario Idle
                """),
            assets.animation("""
                Mario Left
                """),
            assets.animation("""
                Mario Right
                """),
            assets.animation("""
                Mini Mario Left
                """),
            assets.animation("""
                Mini Mario Right
                """),
            assets.animation("""
                Mario Jump
                """),
            assets.animation("""
                Mini Mario Jump
                """),
            assets.animation("""
                Heli Mario Idle
                """),
            assets.animation("""
                Heli Mario Left
                """),
            assets.animation("""
                Heli Mario Right
                """),
            assets.animation("""
                Heli Mario Jump
                """),
            assets.animation("""
                Helicopter Mario
                """)]
    else:
        CharacterCharacter_Animations = [assets.animation("""
                Luigi Idle
                """),
            assets.animation("""
                Mini Luigi Idle
                """),
            assets.animation("""
                Luigi Left
                """),
            assets.animation("""
                Luigi Right
                """),
            assets.animation("""
                Mini Luigi Left
                """),
            assets.animation("""
                Mini Luigi Right
                """),
            assets.animation("""
                Luigi Jump
                """),
            assets.animation("""
                Mini Luigi Jump
                """),
            assets.animation("""
                Heli Luigi Idle
                """),
            assets.animation("""
                Heli Luigi Left
                """),
            assets.animation("""
                Heli Luigi Right
                """),
            assets.animation("""
                Heli Luigi Jump
                """),
            assets.animation("""
                Helicopter Luigi
                """)]
    music.stop_all_sounds()
def Peach_Cutscene():
    global Cutscene_Sprite
    music.play(music.create_song(assets.song("""
            Peach Cutscene Song 1
            """)),
        music.PlaybackMode.IN_BACKGROUND)
    Cutscene_Sprite = sprites.create(assets.image("""
            Cutscene
            """),
        SpriteKind.Background)
    Cutscene_Sprite.set_position(80, 60)
    animation.run_image_animation(Cutscene_Sprite,
        assets.animation("""
            Peach Cutscene Animation
            """),
        100,
        False)
    pause(14000)
    sprites.destroy(Cutscene_Sprite)
    music.stop_all_sounds()
    music.play(music.create_song(assets.song("""
            Peach Cutscene Song 2
            """)),
        music.PlaybackMode.UNTIL_DONE)
    pause(1000)
Cutscene_Sprite: Sprite = None
Character = 0
Character_Choosing_Sprite: Sprite = None
CharacterCharacter_Animations: List[List[Image]] = []
if False:
    Peach_Cutscene()
Character_Choosing()
pause(1000)
game.splash("1 - 1")
music.play(music.create_song(assets.song("""
        Beginning Level theme
        """)),
    music.PlaybackMode.UNTIL_DONE)
music.play(music.create_song(assets.song("""
        Main Theme
        """)),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)
tiles.set_current_tilemap(tilemap("""
    Level
    """))
MarioLuigi_Player = sprites.create(img("""
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
        """),
    SpriteKind.player)
animation.run_image_animation(MarioLuigi_Player,
    CharacterCharacter_Animations[0],
    100,
    True)
scene.camera_follow_sprite(MarioLuigi_Player)
tiles.place_on_tile(MarioLuigi_Player, tiles.get_tile_location(3, 16))
PlayerX = 3
PlayerY = 16
Player_Mini = 16
while True:
    # Walk Left
    # Need to do: Check if left of character is wall, if not, move left and animate left
    # Walk Right
    # Need to do: Check if right of character is wall, if not, move right and animate right
    # Jump
    # Need to do: Check if below is block, if so, move up, jump animation, check to see if above is a wall or a pipe
    # Into Pipe
    # Need to do: Check if below is pipe, if so, set new tilemap, set character position
    # Use Power Up
    # Need to do: See if heli, then close to the same thing as jump
    if browserEvents.arrow_left.is_pressed():
        if tiles.tile_at_location_is_wall(tiles.get_tile_location(PlayerX, PlayerY)) or Player_Mini == 0 and tiles.tile_at_location_is_wall(tiles.get_tile_location(PlayerX, PlayerY - 1)):
            MarioLuigi_Player.x += -1
    pause(25)