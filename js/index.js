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

// “设置”页面
import {set_launch} from "./set_launch.js"

// 游戏进行时的场景
import {gaming_scene} from "./gaming_scene.js"


window.init_gold_data = function() { // 本地金币系统初始化
    localStorage.setItem("gold", "1000")
    localStorage.setItem("gold_timestamp", (new Date()).getTime())
}

// 每次打开浏览器时，检查上次关闭时的时间戳与现在打开时的时间戳，减少对应的金币数量
function leave_browser() {
    let old_gold_timestamp = localStorage.getItem("gold_timestamp")
    let new_gold_timestamp = (new Date()).getTime()
    let diff_gold_timestamp = new_gold_timestamp - old_gold_timestamp
    let diff_gold = Math.floor(diff_gold_timestamp / 1000 / 3) // 每1秒减少1个金币
    // console.log(diff_gold)
    let old_gold = localStorage.getItem("gold")
    localStorage.setItem("gold", old_gold - diff_gold)
}
leave_browser()

// 设置决定游戏是否暂停的本地数据
localStorage.setItem("pause", "false")

// 每隔一定时间减少一定的金币
setInterval(() => {
    let gold = localStorage.getItem("gold")
    localStorage.setItem("gold", gold - 1)
}, 3000)

// 时刻更新时间戳
setInterval(() => {
    localStorage.setItem("gold_timestamp", (new Date()).getTime())
})

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
    // scene: [gaming_scene, gaming_scene_launch,  char_chose, game_first_open, game_chose_level]
    scene: [game_first_open, gaming_scene, char_chose, game_chose_level, gaming_scene_launch, set_launch]
    // scene: gaming_scene
};

var game = new Phaser.Game(config);


