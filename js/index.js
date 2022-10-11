let canvasWidth = 1280 // 屏幕的宽度
let canvasHeight = 720 // 屏幕的高度
let down_zoom_highest = 400 // 底部区域的最高高度，高度在[400 - canvasHeight]
let is_gameOver = false // 判断游戏是否结束
let cursors // 接收键盘消息对象的变量
let limit_space = false // 限制空格连续按键
let fish1_obj // 存放指定鱼1对象的变量
let man_can_move_forward_to_x = true // 判断人是否可以继续向x轴方向移动
let harpoon_status = "left" // ["left", "stop", "right", "extend_out", "extend_back"] // 鱼钩的摇摆状态
let harpoon_is_swinging = true // 表示鱼钩是否在摆动
let extend_forward_speed = 300 // 鱼钩伸出时的速度
let extend_back_speed = 200 // 鱼钩伸回时的速度

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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    // preload() 预加载资源
    this.load.image("game_cover", "./images/game_cover.png")
    this.load.image("background", "./images/game_background.png")
    this.load.image("fish1", "./images/fish1.png")
    this.load.image("man", "/images/no_weapon_man.png")
    this.load.image("harpoon", "./images/harpoon2_2.png")
}

function create ()
{
    // create() 创建资源、绑定各种交互函数
    this.add.image(canvasWidth / 2, canvasHeight / 2, "background") // add.image(x,y,objName) 的x和y的obj的中心点位置
    man = this.physics.add.image(canvasWidth / 2, 120, "man").setScale(0.3)

    harpoon = this.physics.add.image(canvasWidth / 2 - 30, 70, "harpoon")

    harpoon.setOrigin(0, 0)
    harpoon_init_height = harpoon.y // 定义钩子的初始高度

    // 创建鱼1组
    fish1s = this.physics.add.group({
        key: 'fish1',
        repeat: 5,
        setXY: { x: 150, y: 450, stepX: 1280/5 }
    });
    // 重新管理鱼1组的每个对象
    fish1s.children.iterate(function (child) {
        child.x += Phaser.Math.FloatBetween(-100, 1280/5 - 100 - 50) // 对象在原始的位置上随机向左右偏移 // 待优化
        child.y += Phaser.Math.FloatBetween(-50, 720 - 450 - 50) // 对象在原始的位置上随机向上下偏移 // 待优化
        child.setScale(0.5)
    })

    // 作业需要
    // fish1s = this.physics.add.image(150, 400, "fish1").setScale(0.5)
    // this.tweens.add({
    //     targets: fish1s,
    //     props: {
    //         x: { value: 1000, duration: 4000, flipX: true },
    //         y: { value: 600, duration: 8000,  },
    //     },
    //     ease: 'Sine.easeInOut',
    //     yoyo: true,
    //     repeat: -1
    // })

    // let blue = this.add.particles('blue');
    // blue.createEmitter({
    //     x: 200,
    //     y: 120,
    //     angle: { min: 250, max: 290 },
    //     speed: 180,
    //     gravityY: 100,
    //     lifespan: 3000,
    //     quantity: 3,
    //     scale: { start: 0.1, end: 0.2 },
    //     blendMode: 'ADD'
    // });
    
    // 添加封面
    // let a = this.add.image(canvasWidth / 2, canvasHeight / 2, "game_cover")
    // setTimeout(function(){
    //     a.destroy()
    // }, 3000)


    // 碰撞响应事件

    // 添加钩子与鱼1组的碰撞响应函数 
    this.physics.add.collider(harpoon, fish1s, harpoon_collid_fish1s, null, this)

    // 键盘响应事件
    cursors = this.input.keyboard.createCursorKeys();

}

function update ()
{
    // update() 实时监测
    // 判断游戏是否结束
    if(is_gameOver) {
        return
    }

    harpoon_swing()

    // 当人到达边界时的事件
    if(man.x <= 67) { // 当人到达左边界时
        man_can_move_forward_to_x = false // 禁止人向x轴移动
        man.x += 1 // 恢复行动的一种手段，同时具有撞击反弹特效
        harpoon.x += 1
    } else if(man.x >= 1213) { // 当人到达右边界时
        man_can_move_forward_to_x = false // 禁止人向x轴移动
        man.x -= 1
        harpoon.x -= 1
    } else {
        man_can_move_forward_to_x = true // 恢复人向x轴移动
    }

    

    // 如果钩子的高度小于钩子的初始高度(钩子伸出再缩回时会触发)
    if(harpoon.y < harpoon_init_height) {
        harpoon.setVelocityX(0) // 钩子停止移动
        harpoon.setVelocityY(0) // 钩子停止移动
        if(fish1_obj){ // 如果指定fish1存在
            fish1_obj.disableBody(true, true) // 指定fish1消失
            fish1_obj.setVelocityY(0) // 指定fish1停止移动
            fish1_obj = null // 指定fish1消失后就变为null
        }
        harpoon.y += 1 // 钩子到达原位置后有反弹的现象
        limit_space = false // 恢复按下空格后的限制
        harpoon_is_swinging = true // 恢复鱼钩的摆动
    }

    if(harpoon.y >= canvasHeight - 30) { // 钩子到达底下边界时
        harpoon.setVelocityX(-(extend_back_speed * -Math.sin(harpoon.rotation))) // 钩子以extend_back_speed速度往回移动
        harpoon.setVelocityY(-(extend_back_speed * Math.cos(harpoon.rotation))) // 钩子以extend_back_speed速度往回移动
    }
    

    // 按下空格后将限制以下键盘行为
    if(limit_space) {
        return
    }

    // 按下键盘后响应指定键盘事件函数
    // if(cursors.left.isDown) {
    //     if(!man_can_move_forward_to_x) return // 人和钩子的左右移动被限制
    //     man.x -= 5 // 人以5速度向左移动
    //     harpoon.x -= 5 // 钩子以5速度向左移动
    // } else if(cursors.right.isDown) {
    //     if(!man_can_move_forward_to_x) return // 人和钩子的左右移动被限制
    //     man.x += 5 // 人以5速度向右移动
    //     harpoon.x += 5 // 钩子以5速度向右移动
    // } else 
    if(cursors.space.isDown) {
        harpoon_is_swinging = false // 停止鱼钩的摆动
        limit_space = true // 打开限制，反之按空格之后响应其它按键操作
        harpoon.setVelocityX(extend_forward_speed * -Math.sin(harpoon.rotation)) // 钩子以extend_forward_speed速度往目标方向移动
        harpoon.setVelocityY(extend_forward_speed * Math.cos(harpoon.rotation)) // 钩子以extend_forward_speed速度往目标方向移动
    }
    else {

    }
}


// 自定义函数

// 将弧度转换成角度
function toAngle(n) {
    return n * Math.PI / 180
}

// 钩子与fish1碰撞后的函数
function harpoon_collid_fish1s(harpoon, fish1) {
    harpoon.setVelocityX(-(extend_back_speed * -Math.sin(harpoon.rotation))) // 钩子以extend_back_speed速度往回移动
    harpoon.setVelocityY(-(extend_back_speed * Math.cos(harpoon.rotation))) // 钩子以extend_back_speed速度往回移动
    fish1.setVelocityX(-(extend_back_speed * -Math.sin(harpoon.rotation))) // 鱼1以extend_back_speed速度往回移动
    fish1.setVelocityY(-(extend_back_speed * Math.cos(harpoon.rotation))) // 鱼1以extend_back_speed速度往回移动
    fish1_obj = fish1 // 将特定的fish1对象放到全局，供其它函数使用
}

// 鱼钩的摆动函数
function harpoon_swing() {
    if(!harpoon_is_swinging) { // 鱼钩被限制摆动时
        return
    }
    if(harpoon_status == "left") { // 鱼钩状态是向左摆动
        harpoon.rotation += toAngle(1) // 每帧向左偏移一度
    } else if(harpoon_status == "right") { // 鱼钩状态是向右摆动
        harpoon.rotation -= toAngle(1) // 每帧向右偏移一度
    }
    if(harpoon.rotation >= toAngle(60)) { // 偏移达到60度时，开始向左偏移
        harpoon_status = "right" // 更改偏移方向向左
    } else if(harpoon.rotation <= toAngle(-45)) { // 偏移达到-45度时，开始向左偏移
        harpoon_status = "left" // 更改偏移方向向右
    }
}