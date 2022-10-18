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

let gaming_scene = {
    preload: gaming_scene_preload,
    create: gaming_scene_create,
    update: gaming_scene_update
}

function gaming_scene_preload ()
{
    // preload() 预加载资源
    this.load.image("game_cover", "./images/game_cover.png")
    this.load.image("background", "./images/game_background.png")
    this.load.image("fish1", "./images/fish1.png")
    this.load.image("fish2", "./images/fish2.png")
    this.load.image("fish3", "./images/fish3.png")
    this.load.image("fish4", "./images/fish4.png")
    this.load.image("man", "/images/no_weapon_man.png")
    this.load.image("harpoon", "./images/harpoon2_2.png")
    this.load.image("null_", "./images/null.png") // 引入透明贴图作为鱼叉头虚拟空间
}

function gaming_scene_create ()
{
    // create() 创建资源、绑定各种交互函数
    this.add.image(canvasWidth / 2, canvasHeight / 2, "background") // add.image(x,y,objName) 的x和y的obj的中心点位置
    man = this.physics.add.image(canvasWidth / 2, 120, "man").setScale(0.3)

    harpoon = this.physics.add.image(canvasWidth / 2 - 30, 70, "harpoon")

    harpoon.setOrigin(0, 0)
    harpoon_init_width = harpoon.x // 定义钩子的初始x轴位置
    harpoon_init_height = harpoon.y // 定义钩子的初始y轴位置

    null_ = this.physics.add.image(harpoon.x + harpoon.width / 2, harpoon.y + harpoon.height - 25, "null_") // 加载透明贴图来辅助鱼叉精准捕中鱼

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

    // 创建鱼2组
    fish2s = this.physics.add.group({
        key: 'fish2',
        repeat: 5,
        setXY: { x: 150, y: 450, stepX: 1280/5 }
    });
    // 重新管理鱼2组的每个对象
    fish2s.children.iterate(function (child) {
        child.x += Phaser.Math.FloatBetween(-100, 1280/5 - 100 - 50) // 对象在原始的位置上随机向左右偏移 // 待优化
        child.y += Phaser.Math.FloatBetween(-50, 720 - 450 - 50) // 对象在原始的位置上随机向上下偏移 // 待优化
        child.setScale(0.3)
    })

    // 创建鱼3组
    fish3s = this.physics.add.group({
        key: 'fish3',
        repeat: 5,
        setXY: { x: 150, y: 450, stepX: 1280/5 }
    });
    // 重新管理鱼3组的每个对象
    fish3s.children.iterate(function (child) {
        child.x += Phaser.Math.FloatBetween(-100, 1280/5 - 100 - 50) // 对象在原始的位置上随机向左右偏移 // 待优化
        child.y += Phaser.Math.FloatBetween(-50, 720 - 450 - 50) // 对象在原始的位置上随机向上下偏移 // 待优化
        child.setScale(0.5)
    })

    // 创建鱼4组
    fish4s = this.physics.add.group({
        key: 'fish4',
        repeat: 5,
        setXY: { x: 150, y: 450, stepX: 1280/5 }
    });
    // 重新管理鱼4组的每个对象
    fish4s.children.iterate(function (child) {
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
    // let b = this.add.image(canvasWidth / 2, canvasHeight / 2, "game_start_loading")
    // setTimeout(function(){
    //     b.destroy()
    // }, 6000)
    // let a = this.add.image(canvasWidth / 2, canvasHeight / 2, "game_cover")
    // setTimeout(function(){
    //     a.destroy()
    // }, 3000)


    // 碰撞响应事件

    // 添加钩子与鱼1组的碰撞响应函数 
    this.physics.add.collider(null_, fish1s, harpoon_collid_fishs, null, this)
    // 添加钩子与鱼1组的碰撞响应函数 
    this.physics.add.collider(null_, fish2s, harpoon_collid_fishs, null, this)
    // 添加钩子与鱼1组的碰撞响应函数 
    this.physics.add.collider(null_, fish3s, harpoon_collid_fishs, null, this)
    // 添加钩子与鱼1组的碰撞响应函数 
    this.physics.add.collider(null_, fish4s, harpoon_collid_fishs, null, this)

    // 键盘响应事件
    cursors = this.input.keyboard.createCursorKeys();
    // 鼠标响应事件 // todo，改成上面那样
    this.input.on('pointerdown', () => {
        harpoon_is_swinging = false // 停止鱼钩的摆动
        limit_space = true // 打开限制，反之按空格之后响应其它按键操作
        harpoon.setVelocityX(extend_forward_speed * -Math.sin(harpoon.rotation)) // 钩子以extend_forward_speed速度往目标方向移动
        harpoon.setVelocityY(extend_forward_speed * Math.cos(harpoon.rotation)) // 钩子以extend_forward_speed速度往目标方向移动
      });

}

function gaming_scene_update ()
{
    // update() 实时监测
    // 判断游戏是否结束
    if(is_gameOver) {
        return
    }

    null_.x = harpoon.x + harpoon.width / 2 + ((extend_back_speed - 60) * -Math.sin(harpoon.rotation)) // 实时更新鱼叉头虚拟空间的x轴
    null_.y = harpoon.y + harpoon.height - null_.height / 2 - Math.abs(((30) * Math.sin(harpoon.rotation))) * 2 // 实时更新鱼叉头虚拟空间的y轴

    harpoon_swing() // 鱼叉的摇摆函数

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
        harpoon.x = harpoon_init_width // 钩子x轴恢复到初始x轴
        harpoon.y = harpoon_init_height // 钩子y轴恢复到初始y轴
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

// 游戏一开始时的场景
let game_first_open = {
    preload : function () {
        this.load.image("game_cover", "./images/game_cover.png") // 引入游戏封面
        this.load.image("game_start_loading", "./images/game_start_loading.png") // 引入游戏加载页面
    },
    create: function () {
        _this = this
        this.add.image(canvasWidth / 2, canvasHeight / 2, "game_start_loading")
        game_cover = this.add.image(canvasWidth / 2, canvasHeight / 2, "game_cover")
        setTimeout(function() {
            game_cover.destroy()
        }, 2000)
        setTimeout(function(){
            _this.scene.add("game_chose_level", game_chose_level, true)
        }, 5000)
    }
}

// 选择关卡页面
let game_chose_level = {
    preload: function () {
        this.load.image("game_chose_level", "./images/game_chose_level.png")
    },
    create: function () {
        this.add.image(canvasWidth / 2, canvasHeight / 2, "game_chose_level")
        // 控制游戏选择关卡点击后该点击事件不会继承到后面场景
        let game_chose_level_input = true // 
        this.input.on("pointerdown", () => {
            if(game_chose_level_input) {
                this.scene.add("gaming_scene", gaming_scene, true)
                game_chose_level_input = false
            }
        })
    }
}

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
    scene: game_first_open
};

var game = new Phaser.Game(config);


// 自定义函数

// 将弧度转换成角度
function toAngle(n) {
    return n * Math.PI / 180
}

// 钩子与fish1碰撞后的函数
function harpoon_collid_fishs(null_, fish) {
    fish.x = null_.x // 鱼叉碰到后会将鱼吸附到鱼叉头处
    fish.y = null_.y
    harpoon.setVelocityX(-(extend_back_speed * -Math.sin(harpoon.rotation))) // 钩子以extend_back_speed速度往回移动
    harpoon.setVelocityY(-(extend_back_speed * Math.cos(harpoon.rotation))) // 钩子以extend_back_speed速度往回移动
    // fish1.setVelocityX(-(extend_back_speed * -Math.sin(harpoon.rotation))) // 鱼1以extend_back_speed速度往回移动
    // fish1.setVelocityY(-(extend_back_speed * Math.cos(harpoon.rotation))) // 鱼1以extend_back_speed速度往回移动
    fish1_obj = fish // 将特定的fish1对象放到全局，供其它函数使用
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
    } else if(harpoon.rotation <= toAngle(-55)) { // 偏移达到-55度时，开始向左偏移
        harpoon_status = "left" // 更改偏移方向向右
    }
}