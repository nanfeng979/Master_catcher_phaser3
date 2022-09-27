let canvasWidth = 1280 // 屏幕的宽度
let canvasHeight = 720 // 屏幕的高度
let down_zoom_highest = 400 // 底部区域的最高高度，高度在[400 - canvasHeight]
let is_gameOver = false // 判断游戏是否结束
let cursors // 接收键盘消息对象的变量
let limit_space = false // 限制空格连续按键
let stone_obj // 存放指定石头对象的变量
let man_can_move_forward_to_x = true // 判断人是否可以继续向x轴方向移动


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
    this.load.image("background", "./images/level-background-0.jpg")
    this.load.image("man", "./images/man.png", 100, 100) // 忘记这俩参数干嘛的了
    this.load.image("hook", "./images/gouzi.png")
    this.load.image("stone", "./images/stone.png")
}

function create ()
{
    // create() 创建资源、绑定各种交互函数
    this.add.image(canvasWidth / 2, canvasHeight / 2, "background") // add.image(x,y,objName) 的x和y的obj的中心点位置
    man = this.physics.add.image(canvasWidth / 2, 140, "man")
    // man.setCollideWorldBounds(true) // 与屏幕碰撞后停止运动

    hook = this.physics.add.image(canvasWidth / 2, 250, "hook").setScale(0.2)
    hook_init_height = hook.y // 定义钩子的初始高度
    // hook.setCollideWorldBounds(true); // 与屏幕碰撞后停止运动

    // 创建石头组
    stones = this.physics.add.group({
        key: 'stone',
        repeat: 5,
        setXY: { x: 150, y: 450, stepX: 1280/5 }
    });
    // 重新管理石头组的每个对象
    stones.children.iterate(function (child) {
        child.x += Phaser.Math.FloatBetween(-100, 1280/5 - 100 - 50) // 对象在原始的位置上随机向左右偏移 // 待优化
        child.y += Phaser.Math.FloatBetween(-50, 720 - 450 - 50) // 对象在原始的位置上随机向上下偏移 // 待优化
    })
    


    // 碰撞响应事件

    // 添加钩子与石头组的碰撞响应函数 
    this.physics.add.collider(hook, stones, hook_collid_stones, null, this)

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

    // 当人到达边界时的事件
    if(man.x <= 67) { // 当人到达左边界时
        man_can_move_forward_to_x = false // 禁止人向x轴移动
        man.x += 1 // 恢复行动的一种手段，同时具有撞击反弹特效
        hook.x += 1
    } else if(man.x >= 1213) { // 当人到达右边界时
        man_can_move_forward_to_x = false // 禁止人向x轴移动
        man.x -= 1
        hook.x -= 1
    } else {
        man_can_move_forward_to_x = true // 恢复人向x轴移动
    }

    

    // 如果钩子的高度小于钩子的初始高度(钩子伸出再缩回时会触发)
    if(hook.y < hook_init_height) {
        hook.setVelocityY(0) // 钩子停止移动
        if(stone_obj){ // 如果指定石块存在
            stone_obj.disableBody(true, true) // 指定石块消失
            stone_obj.setVelocityY(0) // 指定石块停止移动
            stone_obj = null // 指定石块消失后就变为null
        }
        hook.y += 1 // 钩子到达原位置后有反弹的现象
        limit_space = false // 恢复按下空格后的限制
    }

    if(hook.y >= canvasHeight - 30) { // 钩子到达底下边界时
        hook.setVelocityY(-200) // 钩子以200速度向上移动
    }
    

    // 按下空格后将限制以下键盘行为
    if(limit_space) {
        return
    }

    // 按下键盘后响应指定键盘事件函数
    if(cursors.left.isDown) {
        if(!man_can_move_forward_to_x) return // 人和钩子的左右移动被限制
        man.x -= 5 // 人以5速度向左移动
        hook.x -= 5 // 钩子以5速度向左移动
    } else if(cursors.right.isDown) {
        if(!man_can_move_forward_to_x) return // 人和钩子的左右移动被限制
        man.x += 5 // 人以5速度向右移动
        hook.x += 5 // 钩子以5速度向右移动
    } else if(cursors.space.isDown) {
        limit_space = true // 打开限制，反之按空格之后响应其它按键操作
        hook.setVelocityY(300) // 持续移动的方向与速度
    }
    else {

    }
}


// 自定义函数

// 钩子与石块碰撞后的函数
function hook_collid_stones(hook, stone) {
    hook.setVelocityY(-200) // 钩子以200速度往上移动
    stone.setVelocityY(-200) // 石头以200速度往上移动
    stone_obj = stone // 将特定的石块对象放到全局，供其它函数使用
}