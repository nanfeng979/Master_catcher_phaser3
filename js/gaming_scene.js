import {canvasWidth, canvasHeight, is_gameOver} from "./index.js"

let limit_space = false // 限制空格连续按键
let cursors // 接收键盘消息对象的变量
let null_
let man
let fish1_obj // 存放指定鱼1对象的变量
let harpoon
let harpoon_init_width
let harpoon_init_height
let extend_forward_speed = 300 // 鱼钩伸出时的速度
let extend_back_speed = 200 // 鱼钩伸回时的速度
let xuxian
let xuxian_is_swinging = true // 表示虚线是否在摆动
let xuxian_angle = 0 // 虚线的角度
let leave_test
let test = false


export let gaming_scene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function gaming_scene() {
        Phaser.Scene.call(this, {key: "gaming_scene"})
    },

    preload: gaming_scene_preload,
    create: gaming_scene_create,
    update: gaming_scene_update,
})

function gaming_scene_preload ()
{
    // preload() 预加载资源
    this.load.image("background", "./images/game_background.png")
    this.load.image("fish1", "./images/fish1.png")
    this.load.image("fish2", "./images/fish2.png")
    this.load.image("fish3", "./images/fish3.png")
    this.load.image("fish4", "./images/fish4.png")
    this.load.image("man", "/images/no_weapon_man.png")
    this.load.image("harpoon", "./images/harpoon2_2.png")
    this.load.image("null_", "./images/null.png") // 引入透明贴图作为鱼叉头虚拟空间
    this.load.image("xuxian", "./images/xuxian.png") // 引入虚线
    this.load.image("bk1", "./images/游戏场景1.png") // 引入游戏背景1
    this.load.image("leave", "./images/游戏场景2-1.png") // 引入“离开关卡”背景
}

function gaming_scene_create ()
{
    // create() 创建资源、绑定各种交互函数
    let _this = this
    xuxian_is_swinging = true // 避免在切换场景之前点击鼠标导致虚线被定住
    this.add.image(canvasWidth / 2, canvasHeight / 2, "bk1") // add.image(x,y,objName) 的x和y的obj的中心点位置
    man = this.physics.add.image(canvasWidth / 2, 120, "man").setScale(0.3)

    harpoon = this.physics.add.image(canvasWidth / 2 - 30, 70, "harpoon")

    harpoon.setOrigin(0.5, 0)
    harpoon_init_width = harpoon.x // 定义钩子的初始x轴位置
    harpoon_init_height = harpoon.y // 定义钩子的初始y轴位置

    xuxian = this.add.image(canvasWidth / 2 - 30, 70, "xuxian").setScale(0.5, 2)
    xuxian.setOrigin(0.5, 0)

    null_ = this.physics.add.image(harpoon.x + harpoon.width / 2, harpoon.y + harpoon.height - 25, "null_") // 加载透明贴图来辅助鱼叉精准捕中鱼

    if(!test) {
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
    } else {
        // 测试需要
        var fish2s, fish3s, fish4s, fish1s
        fish2s = fish3s = fish4s = 0
        fish1s = this.physics.add.image(canvasWidth / 2, 400, "fish1").setScale(0.3)
        leave_test = function() {
            _this.add.text(400, 200, '小鱼已收集完毕，\n3秒后离开关卡', { fontSize: '80px', fill: '#000' });
            setTimeout(function() {
                _this.add.image(canvasWidth / 2, canvasHeight / 2 ,"leave")
            }, 3000)
            setTimeout(function() {
                _this.scene.start("game_chose_level")
            }, 5000)
        }
    }
    

    

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
        xuxian_is_swinging = false // 停止虚线的摆动
        limit_space = true // 打开限制，反之按空格之后响应其它按键操作
        harpoon.rotation = xuxian.rotation
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

    xuxian_swing() // 虚线的摇摆函数

    // 如果钩子的高度小于钩子的初始高度(钩子伸出再缩回时会触发)
    if(harpoon.y < harpoon_init_height) {
        harpoon.setVelocityX(0) // 钩子停止移动
        harpoon.setVelocityY(0) // 钩子停止移动
        harpoon.rotation = 0
        if(fish1_obj){ // 如果指定fish1存在
            // fish1_obj.disableBody(true, true) // 指定fish1消失
            // fish1_obj.setVelocityY(0) // 指定fish1停止移动
            fish1_obj.destroy() // 指定fish1消失
            fish1_obj = null // 指定fish1消失后就变为null
            // TODO: 目前没有分数判断，先把跳到关卡选择功能放到这里
            if(test) {
                leave_test()
            }
        }
        harpoon.x = harpoon_init_width // 钩子x轴恢复到初始x轴
        harpoon.y = harpoon_init_height // 钩子y轴恢复到初始y轴
        limit_space = false // 恢复按下空格后的限制
        xuxian_is_swinging = true // 恢复虚线的摆动
    }

    if(harpoon.y >= canvasHeight - 30) { // 钩子到达底下边界时
        harpoon.setVelocityX(-(extend_back_speed * -Math.sin(harpoon.rotation))) // 钩子以extend_back_speed速度往回移动
        harpoon.setVelocityY(-(extend_back_speed * Math.cos(harpoon.rotation))) // 钩子以extend_back_speed速度往回移动
    }
    

    // 按下空格后将限制以下键盘行为
    if(limit_space) {
        return
    }

    if(cursors.space.isDown) {
        xuxian_is_swinging = false // 停止虚线的摆动
        limit_space = true // 打开限制，反之按空格之后响应其它按键操作
        harpoon.rotation = xuxian.rotation
        harpoon.setVelocityX(extend_forward_speed * -Math.sin(harpoon.rotation)) // 钩子以extend_forward_speed速度往目标方向移动
        harpoon.setVelocityY(extend_forward_speed * Math.cos(harpoon.rotation)) // 钩子以extend_forward_speed速度往目标方向移动
    }
    else {

    }
}

// 将弧度转换成角度
function toAngle(n) {
    return n * Math.PI / 180
}


// 虚线的摆动函数
function xuxian_swing() {
    if(!xuxian_is_swinging) { // 鱼钩被限制摆动时
        return
    }
    xuxian_angle += 1.0
    xuxian.rotation = Math.sin(xuxian_angle * Math.PI / 180) * 1.0
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
