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


// 游戏进行时的暂停
import {gaming_scene_launch} from "./gaming_scene_launch.js"

// 游戏进行时的场景
import {gaming_scene} from "./gaming_scene.js"


window.init_gold_data = function() { // 本地金币系统初始化
    localStorage.setItem("gold", "200")
    localStorage.setItem("gold_timestamp", (new Date()).getTime())
}

// 设置决定游戏是否暂停的本地数据
localStorage.setItem("pause", "false")

setInterval(() => {
    let gold = localStorage.getItem("gold")
    localStorage.setItem("gold", gold - 1)
}, 3000)

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
            debug: true
        }
    }, // 开启物理引擎并配置
    // scene: [gaming_scene, gaming_scene_launch,  char_chose, game_first_open, game_chose_level]
    scene: [gaming_scene, game_first_open, char_chose, game_chose_level, gaming_scene_launch]
    // scene: gaming_scene
};

var game = new Phaser.Game(config);


