import {canvasWidth, canvasHeight, is_gameOver} from "./index.js"

let limit_space = false // 限制空格连续按键
let cursors // 接收键盘消息对象的变量
let null_
let gold
let gold_text
let extend_forward_speed_text
let man
let fish1_obj // 存放指定鱼1对象的变量
let harpoon // 鱼叉的全局变量
let harpoon_init_width // 定义钩子的初始x轴位置的全局变量
let harpoon_init_height // 定义钩子的初始y轴位置的全局变量
let extend_forward_speed = 300 // 鱼钩伸出时的速度
let extend_back_speed = 200 // 鱼钩伸回时的速度
let xuxian // 虚线的全局变量
let xuxian_is_swinging = true // 表示虚线是否在摆动
let xuxian_angle = 0 // 虚线的初始角度
let fish_timer // 用来一直改变捕上来的鱼的xy位置的定时器
let can_catch_fish = true // 用来限制一次只能捕一次鱼
let fishs_number // 确定当前鱼的数量
let current_is_cated // 当前被捕到的鱼

let fish1s, fish2s, fish3s, fish4s, fish5s, fish6s, fish7s, fish8s
// 鱼1
let fish1s_step = 30 // 鱼1的游泳步伐
// 鱼2
let fish2s_step = 10
let fish2s_step_y = 0
// 鱼3
let f3sa = 0, f3sb = 10, f3sangle = 0;
let f3sx = 0, f3sy = 0, f3sOldx, f3sOldy;
let f3sdir = true
// 鱼4
let fish4s_step = 10
let fish4s_step_y = 0
// 鱼5
let fish5s_step = 10
let fish5s_step_y = 0
// 鱼6
let fish6s_step = 10
let fish6s_step_y = 0
// 鱼7
let fish7s_step = 10
let fish7s_step_y = 0
// 鱼8
let fish8s_step = 10
let fish8s_step_y = 0
let swim = 1


let leave_test // 演示时用的测试函数
let test = true // 演示时用的测试开关

// 键盘监听
let key1
let key2
let key4
let key5
let keyEsc

let mummyAnimation
let sprite
let ceshi

export let gaming_scene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function gaming_scene() {
        Phaser.Scene.call(this, {key: "gaming_scene"})
    },

    preload: preload,
    create: create,
    update: update,
})

function preload ()
{
    // preload() 预加载资源
    this.load.spritesheet('m', './images/anim/fishs/2/m.png', { frameWidth: 37, frameHeight: 45 });
    this.load.spritesheet('yu', './images/anim/fishs/11/yu.png', { frameWidth: 163, frameHeight: 74 });
    this.load.spritesheet('a1', './images/anim/fishs/a/鱼1.png', { frameWidth: 100, frameHeight: 118 });
    this.load.spritesheet('a2', './images/anim/fishs/a/鱼2.png', { frameWidth: 141, frameHeight: 83 });
    this.load.spritesheet('a3', './images/anim/fishs/a/鱼3.png', { frameWidth: 85, frameHeight: 67 });
    this.load.spritesheet('a4', './images/anim/fishs/a/鱼4.png', { frameWidth: 128, frameHeight: 91 });
    this.load.spritesheet('a5', './images/anim/fishs/a/鱼5.png', { frameWidth: 148, frameHeight: 61 });
    this.load.spritesheet('a6', './images/anim/fishs/a/鱼6.png', { frameWidth: 97, frameHeight: 72 });
    this.load.spritesheet('a7', './images/anim/fishs/a/鱼7.png', { frameWidth: 164, frameHeight: 159 });
    this.load.spritesheet('a8', './images/anim/fishs/a/鱼8.png', { frameWidth: 100, frameHeight: 60 });
    this.load.spritesheet('a9', './images/anim/fishs/a/鱼9.png', { frameWidth: 168, frameHeight: 74 });
    this.load.spritesheet('a10', './images/anim/fishs/a/鱼10.png', { frameWidth: 64, frameHeight: 88 });
    this.load.spritesheet('a11', './images/anim/fishs/a/鱼11.png', { frameWidth: 71, frameHeight: 92 });
    this.load.spritesheet('a12', './images/anim/fishs/a/鱼12.png', { frameWidth: 100, frameHeight: 60 });

    this.load.image("background", "./images/game_background.png")
    this.load.image("fish1", "./images/fish1.png")
    this.load.image("fish2", "./images/fish2.png")
    this.load.image("fish3", "./images/fish3.png")
    this.load.image("fish4", "./images/fish4.png")
    this.load.image("fish5", "./images/fish5.png")
    this.load.image("fish6", "./images/fish6.png")
    this.load.image("fish7", "./images/fish7.png")
    this.load.image("fish8", "./images/fish8.png")
    this.load.image("man", "/images/no_weapon_man.png")
    this.load.image("harpoon", "./images/harpoon2_2.png")
    this.load.image("null_", "./images/null.png") // 引入透明贴图作为鱼叉头虚拟空间
    this.load.image("xuxian", "./images/xuxian.png") // 引入虚线
    this.load.image("bk1", "./images/游戏场景1.png") // 引入游戏背景1
    this.load.image("leave", "./images/游戏场景2-1.png") // 引入“离开关卡”背景
    this.load.image("back_icon", "./images/back_icon.png") // 引入“返回”图标
    this.load.image("stop_icon", "./images/stop_icon.png") // 引入“暂停”图标
    this.load.image("set_icon", "./images/set_icon1.png") // 引入“设置”图标
    this.load.image("gold", "./images/gold.png") // 引入“显示金币框”
    this.load.audio("bg_audio", "./media/bg.mp3") // 引入背景音乐
    this.load.audio("dianji_audio", "./media/dianji.mp3") // 引入点击音效
}

function create ()
{
    ceshi = "a12"
    // create() 创建资源、绑定各种交互函数
    let _this = this
    xuxian_is_swinging = true // 避免在切换场景之前点击鼠标导致虚线被定住

    // 音频相关
    globalThis.bgaudio =  this.sound.add("bg_audio") // 将音频设为全局变量
    bgaudio.loop = true
    bgaudio.play()
    bgaudio.volume = 3 * 0.6

    globalThis.dianjiAudio = this.sound.add("dianji_audio")
    dianjiAudio.volume = 0.6

    this.add.image(canvasWidth / 2, canvasHeight / 2, "bk1") // add.image(x,y,objName) 的x和y的obj的中心点位置

    // 设置键
    let set_key = this.add.image(1040, 40, "set_icon").setScale(0.4).setInteractive()
    // 设置键的点击事件
    set_key.on("pointerdown", () => {
        document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
        localStorage.setItem("pause", "true")
        this.scene.launch("set_launch")
        this.scene.pause()
    })
    // 设置键的鼠标移入事件
    set_key.on("pointerover", () => {
        document.body.style.cursor = "url(./images/pointer_mouse_icon.ico), auto"
    })
    // 设置键的鼠标移出事件
    set_key.on("pointerout", () => {
        document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
    })

    // 返回键
    let return_key = this.add.image(1240, 40, "back_icon").setScale(0.4).setInteractive()
    // 返回键的点击事件
    return_key.on("pointerdown", () => {
        document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
        clearInterval(set_gold_text)
        this.scene.start("game_chose_level") // 进入关卡选择页面
    })
    // 返回键的鼠标移入事件
    return_key.on("pointerover", () => {
        document.body.style.cursor = "url(./images/pointer_mouse_icon.ico), auto"
    })
    // 返回键的鼠标移出事件
    return_key.on("pointerout", () => {
        document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
    })


    // 暂停键
    let pause_key = this.add.image(1140, 40, "stop_icon").setScale(0.4).setInteractive()
    // 暂停键的点击事件
    pause_key.on("pointerdown", () => {
        document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
        localStorage.setItem("pause", "true")
        this.scene.launch("gaming_scene_launch")
        this.scene.pause()
    }, this)
    // 暂停键的鼠标移入事件
    pause_key.on("pointerover", () => {
        document.body.style.cursor = "url(./images/pointer_mouse_icon.ico), auto"
    })
    // 暂停键的鼠标移出事件
    pause_key.on("pointerout", () => {
        document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
    })

    // 显示金币框
    this.add.image(100, 30, "gold").setScale(0.5)
    // 显示金币数量
    gold = localStorage.getItem("gold") // 获取本地“gold”的数据
    gold_text = this.add.text(70, 20, gold, { fontSize: "24px" })

    //显示鱼叉发射速度
    extend_forward_speed_text = this.add.text(40, 80, "当前鱼叉发射速度为：" + extend_forward_speed, { fontSize: "22px" })

    man = this.physics.add.image(canvasWidth / 2 - 40, 120, "man").setScale(0.2)

    harpoon = this.physics.add.image(canvasWidth / 2 - 30, 70, "harpoon")

    harpoon.setOrigin(0.5, 0)
    harpoon_init_width = harpoon.x // 定义钩子的初始x轴位置
    harpoon_init_height = harpoon.y // 定义钩子的初始y轴位置

    xuxian = this.add.image(canvasWidth / 2 - 30, 70, "xuxian").setScale(0.5, 2)
    xuxian.setOrigin(0.5, 0)

    null_ = this.physics.add.image(harpoon.x + harpoon.width / 2, harpoon.y + harpoon.height - 25, "null_") // 加载透明贴图来辅助鱼叉精准捕中鱼

    if(!test) {

    } else {
        // // 测试需要
        var  fishs
        fish1s = fish2s = fish3s = fish4s = 0

        // 创建鱼1
        // fish1s = this.physics.add.image(canvasWidth / 2, 400, "fish1").setScale(0.3)
        // fish1s.flipX = true
        // 动画控制器
        mummyAnimation = this.anims.create({
            key: 'swim',
            frames: ceshi,
            frameRate: 16,
            repeat: -1
        });
        fish1s = this.physics.add.sprite(canvasWidth / 2, 300, ceshi);
        fish1s.play({ key: 'swim'});
        // fish1s = this.physics.add.image(canvasWidth / 2, 400, "w1").setScale(0.3)
        // fish1s.flipX = true
        
        
        console.log(fish1s)
        // 创建鱼2
        fish2s = this.physics.add.image(canvasWidth / 2, 350, "fish2").setScale(0.3)
        fish2s.flipX = true
        // 创建鱼3
        fish3s = this.physics.add.image(canvasWidth / 2, 300, "fish3").setScale(0.3)
        fish3s.flipX = true

        fish4s = this.physics.add.image(canvasWidth / 2 - 100, 350 - 100, "fish4").setScale(0.3)
        fish4s.flipX = true
        fish5s = this.physics.add.image(canvasWidth / 2 - 200, 350 - 50, "fish5").setScale(0.3)
        fish5s.flipX = true
        fish6s = this.physics.add.image(canvasWidth / 2 + 100, 350, "fish6").setScale(0.3)
        fish6s.flipX = true
        fish7s = this.physics.add.image(canvasWidth / 2 + 200, 350, "fish7").setScale(0.3)
        fish7s.flipX = true
        fish8s = this.physics.add.image(canvasWidth / 2 - 200, 350 - 50, "fish8").setScale(0.3)
        fish8s.flipX = true

        fishs_number = 8

        leave_test = function() {
            _this.add.text(400, 200, '小鱼已收集完毕，\n3秒后离开关卡', { fontSize: '80px', fill: '#000' });
            setTimeout(function() {
                _this.add.image(canvasWidth / 2, canvasHeight / 2 ,"leave")
            }, 3000)
            setTimeout(function() {
                clearInterval(set_gold_text)
                _this.scene.start("game_chose_level")
                globalThis.bgaudio.destroy()
            }, 5000)
        }
    }
    
    // 碰撞响应事件
    // 添加钩子与鱼组的碰撞响应函数 
    this.physics.add.collider(null_, fishs, harpoon_collid_fishs, null, this)
    // 添加钩子与鱼1组的碰撞响应函数 
    this.physics.add.collider(null_, fish1s, harpoon_collid_fishs, null, this)
    // 添加钩子与鱼2组的碰撞响应函数 
    this.physics.add.collider(null_, fish2s, harpoon_collid_fishs, null, this)
    // 添加钩子与鱼3组的碰撞响应函数 
    this.physics.add.collider(null_, fish3s, harpoon_collid_fishs, null, this)
    // 添加钩子与鱼4组的碰撞响应函数 
    this.physics.add.collider(null_, fish4s, harpoon_collid_fishs, null, this)
    // 添加钩子与鱼5组的碰撞响应函数 
    this.physics.add.collider(null_, fish5s, harpoon_collid_fishs, null, this)
    // 添加钩子与鱼6组的碰撞响应函数 
    this.physics.add.collider(null_, fish6s, harpoon_collid_fishs, null, this)
    // 添加钩子与鱼7组的碰撞响应函数 
    this.physics.add.collider(null_, fish7s, harpoon_collid_fishs, null, this)
    // 添加钩子与鱼8组的碰撞响应函数 
    this.physics.add.collider(null_, fish8s, harpoon_collid_fishs, null, this)

    
    // 键盘响应事件
    cursors = this.input.keyboard.createCursorKeys();
    //键盘操作
    key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
    key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
    key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR)
    key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
    // 按ESC退出到首页
    this.input.keyboard.on('keydown-ESC', function (event) {
        _this.scene.start("game_first_open")
    });
    
    // 鼠标响应事件 // todo，改成上面那样
    this.input.on('pointerdown', (pointer) => {
        if(limit_space)
        {
            return
        }
        if(pointer.x < canvasWidth/2)
        {
            man.flipX = false;
        }
        else {
            man.flipX = true;
        }

        if(localStorage.getItem("pause") == "false") {
            harpoon_fire()
        }
      });

    let set_gold_text = setInterval(() => {
        gold_text.setText(localStorage.getItem("gold"))
    }, 1000)
}

function update ()
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
        can_catch_fish = true // 允许再次捕鱼
        harpoon.setVelocityX(0) // 钩子停止移动
        harpoon.setVelocityY(0) // 钩子停止移动
        harpoon.rotation = 0
        if(fish1_obj){ // 如果指定fish1存在
            let gold_num // 表示当前捕到的鱼的价格
            switch(fish1_obj.frame.texture.key) {
                case 'fish1':
                case 'fish5':
                    gold_num = 3;break;
                case 'fish2':
                case 'fish6':
                    gold_num = 4;break;
                case 'fish3':
                case 'fish7':
                    gold_num = 2;break;
                case 'fish4':
                case 'fish8':
                    gold_num = 1;break;
            }
            // fish1_obj.disableBody(true, true) // 指定fish1消失
            // fish1_obj.setVelocityY(0) // 指定fish1停止移动
            fish1_obj.destroy() // 指定fish1消失
            fish1_obj = null // 指定fish1消失后就变为null
            let gold = Number(localStorage.getItem("gold"))
            localStorage.setItem("gold", gold + gold_num)
            gold_text.setText(gold + 1) // 输出最新的分数
            // fish_tween.resume()
            fishs_number--
            // TODO: 目前没有分数判断，先把跳到关卡选择功能放到这里
            if(test && !fishs_number) {
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

    if(swim == 1)
    {

    

    // 鱼1的自由游泳
    fish1s.x += fish1s_step * 0.2
    if(fish1s.x > canvasWidth || fish1s.x < 0) {
        fish1s_step = -fish1s_step
        fish1s.flipX = !fish1s.flipX
    }

    // 鱼2的自由游泳
    fish2s.x += fish2s_step * 0.2
    fish2s.y += Math.sin(toAngle(fish2s_step_y)) * 3
    fish2s_step_y += 1
    if(fish2s.x > canvasWidth || fish2s.x < 0) {
        fish2s_step = -fish2s_step
        fish2s.flipX = !fish2s.flipX
    }

    // 鱼3的自由游泳
    const acceleration = 0.06, circleNum = 3;
    
    // 上一次坐标
    f3sOldx = fish3s.x
    f3sOldy = fish3s.y

    // 计算坐标
    if(f3sangle <= circleNum  * 2 * Math.PI && f3sdir)
    {
        f3sx = (f3sa + f3sb * f3sangle) * Math.cos(f3sangle);
        f3sy = (f3sa + f3sb * f3sangle) * Math.sin(f3sangle);
        f3sangle = f3sangle + acceleration;
    } else {
        f3sdir = false
        f3sx = (f3sa + f3sb * f3sangle) * Math.cos(f3sangle);
        f3sy = (f3sa - f3sb * f3sangle) * Math.sin(f3sangle);
        f3sangle = f3sangle - acceleration;
        if(f3sangle <= 0) f3sdir = true
    }

    // f3s更新位置
    fish3s.x = canvasWidth / 2 + f3sx
    fish3s.y = canvasHeight / 2 + 100 + f3sy

    // f3s转身
    if(fish3s.x > f3sOldx)
    {
        fish3s.flipX = true
    } else {
        fish3s.flipX = false
    }

    // 鱼4的自由游泳
    fish4s.x += fish4s_step * 0.2
    fish4s.y += Math.sin(toAngle(fish4s_step_y)) * 3
    fish4s_step_y += 1
    if(fish4s.x > canvasWidth || fish4s.x < 0) {
        fish4s_step = -fish4s_step
        fish4s.flipX = !fish4s.flipX
    }

    // 鱼5的自由游泳
    fish5s.x += fish5s_step * 0.2
    fish5s.y += Math.sin(toAngle(fish5s_step_y)) * 3
    fish5s_step_y += 1
    if(fish5s.x > canvasWidth || fish5s.x < 0) {
        fish5s_step = -fish5s_step
        fish5s.flipX = !fish5s.flipX
    }

    // 鱼6的自由游泳
    fish6s.x += fish6s_step * 0.2
    fish6s.y += Math.sin(toAngle(fish6s_step_y)) * 3
    fish6s_step_y += 1
    if(fish6s.x > canvasWidth || fish6s.x < 0) {
        fish6s_step = -fish6s_step
        fish6s.flipX = !fish6s.flipX
    }

    // 鱼7的自由游泳
    fish7s.x += fish7s_step * 0.2
    fish7s.y += Math.sin(toAngle(fish7s_step_y)) * 3
    fish7s_step_y += 1
    if(fish7s.x > canvasWidth || fish7s.x < 0) {
        fish7s_step = -fish7s_step
        fish7s.flipX = !fish7s.flipX
    }

    // 鱼8的自由游泳
    fish8s.x += fish8s_step * 0.2
    fish8s.y += Math.sin(toAngle(fish8s_step_y)) * 3
    fish8s_step_y += 1
    if(fish8s.x > canvasWidth || fish8s.x < 0) {
        fish8s_step = -fish8s_step
        fish8s.flipX = !fish8s.flipX
    }
    }


    // 按下空格后将限制以下键盘行为
    if(limit_space) {
        return
    }

    if(cursors.space.isDown) {
        harpoon_fire()
    }
    else{
        // console.log(1)
    }  
    
    // 按数字1时增加鱼叉发射速度
    if(key1.isDown)
    {
        extend_forward_speed += 1
    }
    // 按数字2时减少鱼叉发射速度
    if(key2.isDown)
    {
         extend_forward_speed -= 1
        //leave_test()
    }
    // 按数字4时停止鱼的游泳
    if(key4.isDown)
    {
        swim = 0
    }
    // 按数字5时继续鱼的游泳
    if(key5.isDown)
    {
        swim = 1
    }
    extend_forward_speed_text.setText("当前鱼叉发射速度为：" + extend_forward_speed)
    
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

// 鱼叉发射函数
function harpoon_fire() {
    dianjiAudio.play()
    xuxian_is_swinging = false // 停止虚线的摆动
    limit_space = true // 打开限制，反之按空格之后响应其它按键操作
    harpoon.rotation = xuxian.rotation
    harpoon.setVelocityX(extend_forward_speed * -Math.sin(harpoon.rotation)) // 钩子以extend_forward_speed速度往目标方向移动
    harpoon.setVelocityY(extend_forward_speed * Math.cos(harpoon.rotation)) // 钩子以extend_forward_speed速度往目标方向移动
}

// 钩子与fish1碰撞后的函数
function harpoon_collid_fishs(null_, fish) {
    if(can_catch_fish) {
        current_is_cated = fish
        can_catch_fish = false // 不允许再次捕鱼
    }
    if(current_is_cated != fish) return 
    fish.x = null_.x // 鱼叉碰到后会将鱼吸附到鱼叉头处
    fish.y = null_.y
    harpoon.setVelocityX(-(extend_back_speed * -Math.sin(harpoon.rotation))) // 钩子以extend_back_speed速度往回移动
    harpoon.setVelocityY(-(extend_back_speed * Math.cos(harpoon.rotation))) // 钩子以extend_back_speed速度往回移动
    fish1_obj = fish // 将特定的fish1对象放到全局，供其它函数使用
}
