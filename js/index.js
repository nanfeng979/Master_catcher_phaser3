export let canvasWidth = 1280 // 屏幕的宽度
export let canvasHeight = 720 // 屏幕的高度
export let is_gameOver = false // 判断游戏是否结束
let down_zoom_highest = 400 // 底部区域的最高高度，高度在[400 - canvasHeight]

// 游戏一开始时的场景
import {game_first_open} from "./game_first_open.js"

// 选择角色页面
import {char_chose} from "./char_chose.js"

// 选择关卡页面
import {game_chose_level} from "./game_chose_level.js"

// 游戏进行时的场景
import {gaming_scene} from "./gaming_scene.js"


// 配置环境
var config = {
    type: Phaser.AUTO,
    width: canvasWidth,
    height: canvasHeight,
    parent: "frame", // 将整个屏幕放在id=frame的DOM节点内
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0,
            debug: false
        }
    }, // 开启物理引擎并配置
    scene: [game_first_open, char_chose, game_chose_level, gaming_scene]
    // scene: gaming_scene
};

var game = new Phaser.Game(config);


