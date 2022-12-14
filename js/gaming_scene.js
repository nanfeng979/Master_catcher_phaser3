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

let extend_back_speed = 200 // 鱼钩伸回时的速度
let xuxian // 虚线的全局变量
let xuxian_is_swinging = true // 表示虚线是否在摆动
let xuxian_angle = 0 // 虚线的初始角度
let fish_timer // 用来一直改变捕上来的鱼的xy位置的定时器
let can_catch_fish = true // 用来限制一次只能捕一次鱼
let fishs_number // 确定当前鱼的数量
let current_is_cated // 当前被捕到的鱼

let fish1s, fish2s, fish3s, fish4s, fish5s, fish6s, fish7s, fish8s
let fishf1s, fishf2s, fishf3s, fishf4s, fishf5s, fishf6s, fishf7s, fishf8s
// 鱼1
let fish1s_step = 30 // 鱼1的游泳步伐
// 鱼2
let fish2s_step = 10
let fish2s_step_y = 0
// 鱼3
let fish3s_step = 10
let fish3s_step_y = 0
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

// 鱼f1
let fishf1s_step = 10
let fishf1s_step_y = 0
// 鱼f2
let fishf2s_step = 10
let fishf2s_step_y = 0
// 鱼f3
let fishf3s_step = 10
let fishf3s_step_y = 0
// 鱼f4
let fishf4s_step = 10
let fishf4s_step_y = 0
// 鱼f5
let fishf5s_step = 10
let fishf5s_step_y = 0
// 鱼f6
let fishf6s_step = 10
let fishf6s_step_y = 0
// 鱼f7
let fishf7s_step = 10
let fishf7s_step_y = 0
// 鱼f8
let fishf8s_step = 10
let fishf8s_step_y = 0

let swim = 1


let leave_test // 演示时用的测试函数
let test = true // 演示时用的测试开关

// 键盘监听
let key1
let key2
let key4
let key5
let keyEsc

let a1Animation
let a2Animation
let a3Animation
let a4Animation
let a5Animation
let a6Animation
let a7Animation
let a8Animation
let f1Animation
let f2Animation
let f3Animation
let f4Animation
let f5Animation
let f6Animation
let f7Animation
let f8Animation
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


    this.load.spritesheet('f1', './images/anim/fishs/b/鱼21.png', { frameWidth: 125, frameHeight: 135 });
    this.load.spritesheet('f2', './images/anim/fishs/b/鱼22.png', { frameWidth: 109, frameHeight: 67 });
    this.load.spritesheet('f3', './images/anim/fishs/b/鱼23.png', { frameWidth: 49, frameHeight: 68 });
    this.load.spritesheet('f4', './images/anim/fishs/b/鱼24.png', { frameWidth: 73, frameHeight: 36 });
    this.load.spritesheet('f5', './images/anim/fishs/b/鱼25.png', { frameWidth: 106, frameHeight: 62 });
    this.load.spritesheet('f6', './images/anim/fishs/b/鱼26.png', { frameWidth: 197, frameHeight: 117 });
    this.load.spritesheet('f7', './images/anim/fishs/b/鱼27.png', { frameWidth: 100, frameHeight: 50 });
    this.load.spritesheet('f8', './images/anim/fishs/b/鱼28.png', { frameWidth: 168, frameHeight: 85 });


    for(var i = 0; i < 61; i++) {
        if(i < 10) {
            this.load.image("man" + i, "./images/anim/fishs/c/人物动态_0000" + i + ".png")
        } else if(i < 100) {
            this.load.image("man" + i, "./images/anim/fishs/c/人物动态_000" + i + ".png")
        } else if(i < 1000) {
            this.load.image("man" + i, "./images/anim/fishs/c/人物动态_00" + i + ".png")
        }
    }

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
    this.load.image("xuxian_new", "./images/new/箭头.png") // 引入虚线
    this.load.image("bk1", "./images/游戏场景1_1.png") // 引入游戏背景1
    // this.load.image("leave", "./images/游戏场景2-1.png") // 引入“离开关卡”背景
    this.load.image("leave", "./images/new/游戏胜利.png") // 引入“离开关卡”背景
    // this.load.image("back_icon_old", "./images/back_icon.png") // 引入“返回”图标
    this.load.image("back_icon_", "./images/new/2.png") // 引入“返回”图标
    this.load.image("stop_icon_old", "./images/stop_icon.png") // 引入“暂停”图标
    this.load.image("stop_icon", "./images/new/3.png") // 引入“暂停”图标
    this.load.image("set_icon_old", "./images/set_icon1.png") // 引入“设置”图标
    this.load.image("set_icon", "./images/new/1.png") // 引入“设置”图标
    this.load.image("gold", "./images/gold.png") // 引入“显示金币框”
    this.load.audio("bg_audio", "./media/bg.mp3") // 引入背景音乐
    this.load.audio("dianji_audio", "./media/dianji.mp3") // 引入点击音效
}

function create ()
{
    // 初始化
    init_gold_data()
    if(mp4) {
        let loadParent = mp4.parentElement
        loadParent.removeChild(mp4)
    }
    
    video.play();
    globalThis.extend_forward_speed = 300// 鱼钩伸出时的速度
    // extend_forward_speed = 300

    fish1s_step = 30 // 鱼1的游泳步伐
    // 鱼2
    fish2s_step = 10
    fish2s_step_y = 0
    // 鱼3
    fish3s_step = 10
    fish3s_step_y = 0
    // 鱼4
    fish4s_step = 10
    fish4s_step_y = 0
    // 鱼5
    fish5s_step = 10
    fish5s_step_y = 0
    // 鱼6
    fish6s_step = 10
    fish6s_step_y = 0
    // 鱼7
    fish7s_step = 10
    fish7s_step_y = 0
    // 鱼8
    fish8s_step = 10
    fish8s_step_y = 0

    // 鱼f1
    fishf1s_step = 10
    fishf1s_step_y = 0
    // 鱼f2
    fishf2s_step = 10
    fishf2s_step_y = 0
    // 鱼f3
    fishf3s_step = 10
    fishf3s_step_y = 0
    // 鱼f4
    fishf4s_step = 10
    fishf4s_step_y = 0
    // 鱼f5
    fishf5s_step = 10
    fishf5s_step_y = 0
    // 鱼f6
    fishf6s_step = 10
    fishf6s_step_y = 0
    // 鱼f7
    fishf7s_step = 10
    fishf7s_step_y = 0
    // 鱼f8
    fishf8s_step = 10
    fishf8s_step_y = 0

    swim = 1

    limit_space = false
    can_catch_fish = true

    // create() 创建资源、绑定各种交互函数
    let _this = this
    xuxian_is_swinging = true // 避免在切换场景之前点击鼠标导致虚线被定住

    // 音频相关
    //globalThis.bgaudio =  this.sound.add("bg_audio") // 将音频设为全局变量
    //bgaudio.loop = true
    //bgaudio.play()
    //bgaudio.volume = 3 * 0.6 * 0

    globalThis.dianjiAudio = this.sound.add("dianji_audio")
    dianjiAudio.volume = 0.6

    // this.add.image(canvasWidth / 2, canvasHeight / 2, "bk1") // add.image(x,y,objName) 的x和y的obj的中心点位置

    // 设置键
    let set_key = this.add.image(1040, 40, "set_icon").setScale(0.35).setInteractive()
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
    let return_key = this.add.image(1240, 40, "back_icon_").setScale(0.35).setInteractive()
    // 返回键的点击事件
    return_key.on("pointerdown", () => {
        document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
        clearInterval(set_gold_text)
        //globalThis.bgaudio.stop()  // 关闭音乐
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
    let pause_key = this.add.image(1140, 40, "stop_icon").setScale(0.35).setInteractive()
    // 暂停键的点击事件
    pause_key.on("pointerdown", () => {
        document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
        localStorage.setItem("pause", "true")
        this.scene.launch("shop_lanch")
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
    // extend_forward_speed_text = this.add.text(40, 80, "当前鱼叉发射速度为：" + extend_forward_speed, { fontSize: "22px" })

    man = this.physics.add.image(canvasWidth / 2 - 40, 120, "man1").setScale(0.2)

    harpoon = this.physics.add.image(canvasWidth / 2 - 30, 70, "harpoon")

    harpoon.setOrigin(0.5, 0)
    harpoon_init_width = harpoon.x // 定义钩子的初始x轴位置
    harpoon_init_height = harpoon.y // 定义钩子的初始y轴位置

    xuxian = this.add.image(canvasWidth / 2 - 30, 200, "xuxian_new").setScale(0.08).setAlpha(0.8)
    xuxian.setOrigin(0.5, 0)
    // .setScale(0.01, 0.158)

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
        a1Animation = this.anims.create({
            key: 'swim1',
            frames: 'a1',
            frameRate: 16,
            repeat: -1
        });
        a2Animation = this.anims.create({
            key: 'swim2',
            frames: 'a9',
            frameRate: 16,
            repeat: -1
        });
        a3Animation = this.anims.create({
            key: 'swim3',
            frames: 'a3',
            frameRate: 16,
            repeat: -1
        });
        a4Animation = this.anims.create({
            key: 'swim4',
            frames: 'a11',
            frameRate: 16,
            repeat: -1
        });
        a5Animation = this.anims.create({
            key: 'swim5',
            frames: 'a5',
            frameRate: 16,
            repeat: -1
        });
        a6Animation = this.anims.create({
            key: 'swim6',
            frames: 'a6',
            frameRate: 16,
            repeat: -1
        });
        a7Animation = this.anims.create({
            key: 'swim7',
            frames: 'a7',
            frameRate: 16,
            repeat: -1
        });
        a8Animation = this.anims.create({
            key: 'swim8',
            frames: 'a12',
            frameRate: 16,
            repeat: -1
        });
        f1Animation = this.anims.create({
            key: 'swimf1',
            frames: 'f1',
            frameRate: 16,
            repeat: -1
        });
        f2Animation = this.anims.create({
            key: 'swimf2',
            frames: 'f2',
            frameRate: 16,
            repeat: -1
        });
        f3Animation = this.anims.create({
            key: 'swimf3',
            frames: 'f3',
            frameRate: 16,
            repeat: -1
        });
        f4Animation = this.anims.create({
            key: 'swimf4',
            frames: 'f4',
            frameRate: 16,
            repeat: -1
        });
        f5Animation = this.anims.create({
            key: 'swimf5',
            frames: 'f5',
            frameRate: 16,
            repeat: -1
        });
        f6Animation = this.anims.create({
            key: 'swimf6',
            frames: 'f6',
            frameRate: 16,
            repeat: -1
        });
        f7Animation = this.anims.create({
            key: 'swimf7',
            frames: 'f7',
            frameRate: 16,
            repeat: -1
        });
        f8Animation = this.anims.create({
            key: 'swimf8',
            frames: 'f8',
            frameRate: 16,
            repeat: -1
        });
        

        fish1s = this.physics.add.sprite(canvasWidth / 2 + 100, 500, 'a1');
        fish1s.play({ key: 'swim1'});
        fish2s = this.physics.add.sprite(100, 400, 'a9');
        fish2s.play({ key: 'swim2'});
        fish3s = this.physics.add.sprite(canvasWidth / 2 - 300, 500, 'a3').setScale(0.7);
        fish3s.play({ key: 'swim3'});
        fish4s = this.physics.add.sprite(canvasWidth / 2 + 200, 600, 'a11').setScale(0.6);
        fish4s.play({ key: 'swim4'});
        fish5s = this.physics.add.sprite(canvasWidth / 2 - 100, 500, 'a5').setScale(0.7);
        fish5s.play({ key: 'swim5'});
        fish6s = this.physics.add.sprite(canvasWidth / 2 - 200 , 500, 'a6');
        fish6s.play({ key: 'swim6'});
        fish7s = this.physics.add.sprite(canvasWidth / 2, 500, 'a7');
        fish7s.play({ key: 'swim7'});
        fish8s = this.physics.add.sprite(100, 700, 'a12');
        fish8s.play({ key: 'swim8'});

        fishf1s = this.physics.add.sprite(canvasWidth / 2, 400, 'f1');
        fishf1s.play({ key: 'swimf1'});
        fishf2s = this.physics.add.sprite(canvasWidth / 2, 500, 'f2');
        fishf2s.play({ key: 'swimf2'});
        fishf3s = this.physics.add.sprite(canvasWidth / 2, 700, 'f3');
        fishf3s.play({ key: 'swimf3'});
        fishf4s = this.physics.add.sprite(canvasWidth / 2 + 100, 700, 'f4');
        fishf4s.play({ key: 'swimf4'});
        fishf5s = this.physics.add.sprite(canvasWidth / 2 - 100, 400, 'f5');
        fishf5s.play({ key: 'swimf5'});
        fishf6s = this.physics.add.sprite(canvasWidth / 2 - 300, 230, 'f6').setScale(0.8);
        fishf6s.play({ key: 'swimf6'});
        fishf7s = this.physics.add.sprite(canvasWidth / 2, 300, 'f7');
        fishf7s.play({ key: 'swimf7'});
        fishf8s = this.physics.add.sprite(canvasWidth / 2, 680, 'f8');
        fishf8s.play({ key: 'swimf8'});


        fishs_number = 16

        leave_test = function() {
            // _this.add.text(400, 200, '小鱼已收集完毕，\n3秒后离开关卡', { fontSize: '80px', fill: '#000' });
            //globalThis.bgaudio.stop() // 关闭音乐
            setTimeout(function() {
                _this.add.image(canvasWidth / 2, canvasHeight / 2 ,"leave").setScale(0.8)
            }, 1000)
            setTimeout(function() {
                clearInterval(set_gold_text)
                _this.scene.start("game_chose_level")
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

    this.physics.add.collider(null_, fishf1s, harpoon_collid_fishs, null, this)
    this.physics.add.collider(null_, fishf2s, harpoon_collid_fishs, null, this)
    this.physics.add.collider(null_, fishf3s, harpoon_collid_fishs, null, this)
    this.physics.add.collider(null_, fishf4s, harpoon_collid_fishs, null, this)
    this.physics.add.collider(null_, fishf5s, harpoon_collid_fishs, null, this)
    this.physics.add.collider(null_, fishf6s, harpoon_collid_fishs, null, this)
    this.physics.add.collider(null_, fishf7s, harpoon_collid_fishs, null, this)
    this.physics.add.collider(null_, fishf8s, harpoon_collid_fishs, null, this)

    
    // 键盘响应事件
    cursors = this.input.keyboard.createCursorKeys();
    //键盘操作
    key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
    key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
    key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR)
    key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
    // 按ESC退出到首页
    this.input.keyboard.on('keydown-ESC', function (event) {
        //bgaudio.stop()
        _this.scene.start("game_first_open")
    });
    
    // 鼠标响应事件 // todo，改成上面那样
    this.input.on('pointerdown', (pointer) => {
        if(limit_space)
        {
            return
        }
        if(xuxian.rotation < 0) {
            man.flipX = true;
        }
        else {
            man.flipX = false;
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

    // 人物随着虚线的方向摆动
    man.destroy()
    if(xuxian.rotation > 0) {
        man = this.physics.add.image(canvasWidth / 2 - 40, 120, "man" + parseInt(60 - xuxian.rotation * 60)).setScale(0.2)
        man.flipX = false;
    }
    else {
        man = this.physics.add.image(canvasWidth / 2 - 40 + 314*0.2*0.5*0.5, 120, "man" + parseInt(60 - Math.abs(xuxian.rotation)  * 60)).setScale(0.2)
        man.flipX = true;
    }
    

    // 如果钩子的高度小于钩子的初始高度(钩子伸出再缩回时会触发)
    if(harpoon.y < harpoon_init_height) {
        can_catch_fish = true // 允许再次捕鱼
        harpoon.setVelocityX(0) // 钩子停止移动
        harpoon.setVelocityY(0) // 钩子停止移动
        harpoon.rotation = 0
        if(fish1_obj){ // 如果指定fish1存在
            let gold_num // 表示当前捕到的鱼的价格
            switch(fish1_obj.frame.texture.key) {
                case 'a1':
                case 'a2':
                case 'a9':
                case 'f1':
                case 'f2':
                    gold_num = 3;break;
                case 'a3':
                case 'a4':
                case 'a10':
                case 'f3':
                case 'f4':
                    gold_num = 4;break;
                case 'a5':
                case 'a6':
                case 'a11':
                case 'f5':
                case 'f6':
                    gold_num = 2;break;
                case 'a7':
                case 'a8':
                case 'a12':
                case 'f7':
                case 'f8':
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
    }
    if(fish1s_step > 0)
    {
        fish1s.flipX = false
    } else {
        fish1s.flipX = true
    }

    // 鱼2的自由游泳
    fish2s.x += fish2s_step * 0.2
    if(fish2s.x > canvasWidth || fish2s.x < 0) {
        fish2s_step = -fish2s_step
    }
    if(fish2s_step > 0)
    {
        fish2s.flipX = false
    } else {
        fish2s.flipX = true
    }

    // 鱼3的自由游泳
    fish3s.x += fish3s_step * 0.3
    if(fish3s.x > canvasWidth || fish3s.x < 0) {
        fish3s_step = -fish3s_step
    }
    if(fish3s_step > 0)
    {
        fish3s.flipX = false
    } else {
        fish3s.flipX = true
    }

    // 鱼4的自由游泳
    fish4s.x += fish4s_step * 0.1
    fish4s.y += Math.sin(toAngle(fish4s_step_y)) * 1
    fish4s_step_y += 1
    if(fish4s.x > canvasWidth || fish4s.x < 0) {
        fish4s_step = -fish4s_step
    }
    if(fish4s_step > 0)
    {
        fish4s.flipX = false
    } else {
        fish4s.flipX = true
    }

    // 鱼5的自由游泳
    fish5s.x += fish5s_step * 0.4
    fish5s.y += Math.sin(toAngle(fish5s_step_y)) * 1.5
    fish5s_step_y += 1 * 2.5
    if(fish5s.x > canvasWidth || fish5s.x < 0) {
        fish5s_step = -fish5s_step
    }
    if(fish5s_step > 0)
    {
        fish5s.flipX = false
    } else {
        fish5s.flipX = true
    }

    // 鱼6的自由游泳
    fish6s.x += fish6s_step * 0.4
    fish6s.y += Math.sin(toAngle(fish6s_step_y)) * 2
    fish6s_step_y += 1
    if(fish6s.x > canvasWidth || fish6s.x < 0) {
        fish6s_step = -fish6s_step
    }
    if(fish6s_step > 0)
    {
        fish6s.flipX = false
    } else {
        fish6s.flipX = true
    }

    // 鱼7的自由游泳
    fish7s.x += fish7s_step * 0.1
    fish7s.y += Math.sin(toAngle(fish7s_step_y)) * 0.5
    fish7s_step_y += 0.5
    if(fish7s.x > canvasWidth || fish7s.x < 0) {
        fish7s_step = -fish7s_step
    }
    if(fish7s_step > 0)
    {
        fish7s.flipX = false
    } else {
        fish7s.flipX = true
    }

    // 鱼8的自由游泳
    fish8s.x += fish8s_step * 0.1
    if(fish8s.x > canvasWidth || fish8s.x < 0) {
        fish8s_step = -fish8s_step
    }
    if(fish8s_step > 0)
    {
        fish8s.flipX = false
    } else {
        fish8s.flipX = true
    }

    

    // 鱼f1的自由游泳
    fishf1s.x += fishf1s_step * 0.3
    fishf1s.y += Math.sin(toAngle(fishf1s_step_y)) * 2.5
    fishf1s_step_y += 3.5
    if(fishf1s.x > canvasWidth || fishf1s.x < 0) {
        fishf1s_step = -fishf1s_step
    }
    if(fishf1s_step > 0)
    {
        fishf1s.flipX = false
    } else {
        fishf1s.flipX = true
    }

    // 鱼f2的自由游泳
    fishf2s.x += fishf2s_step * 0.1 * -1
    if(fishf2s.x > canvasWidth || fishf2s.x < 0) {
        fishf2s_step = -fishf2s_step
    }
    if(fishf2s_step > 0)
    {
        fishf2s.flipX = true
    } else {
        fishf2s.flipX = false
    }

    // 鱼f3的自由游泳
    fishf3s.x += fishf3s_step * 0.1
    if(fishf3s.x > canvasWidth || fishf3s.x < 0) {
        fishf3s_step = -fishf3s_step
    }
    if(fishf3s_step > 0)
    {
        fishf3s.flipX = true
    } else {
        fishf3s.flipX = false
    }

    // 鱼f4的自由游泳
    fishf4s.x += fishf4s_step * 0.1 * 0
    if(fishf4s.x > canvasWidth || fishf4s.x < 0) {
        fishf4s_step = -fishf4s_step
    }
    if(fishf4s_step > 0)
    {
        fishf4s.flipX = false
    } else {
        fishf4s.flipX = true
    }

    // 鱼f5的自由游泳
    fishf5s.x += fishf5s_step * 0.18 * -1
    fishf5s.y += Math.sin(toAngle(fishf5s_step_y)) * 1
    fishf5s_step_y += 5
    if(fishf5s.x > canvasWidth || fishf5s.x < 0) {
        fishf5s_step = -fishf5s_step
    }
    if(fishf5s_step > 0)
    {
        fishf5s.flipX = true
    } else {
        fishf5s.flipX = false
    }
    
    // 鱼f6的自由游泳
    fishf6s.x += fishf6s_step * 0.1 * 0
    if(fishf6s.x > canvasWidth || fishf6s.x < 0) {
        fishf6s_step = -fishf6s_step
    }
    if(fishf6s_step > 0)
    {
        fishf6s.flipX = false
    } else {
        fishf6s.flipX = true
    }

    // 鱼f7的自由游泳
    fishf7s.x += fishf7s_step * 0.2
    if(fishf7s.x > canvasWidth || fishf7s.x < 0) {
        fishf7s_step = -fishf7s_step
    }
    if(fishf7s_step > 0)
    {
        fishf7s.flipX = false
    } else {
        fishf7s.flipX = true
    }

    // 鱼f8的自由游泳
    fishf8s.x += fishf8s_step * 0.2 * -1
    if(fishf8s.x > canvasWidth || fishf8s.x < 0) {
        fishf8s_step = -fishf8s_step
    }
    if(fishf8s_step > 0)
    {
        fishf8s.flipX = true
    } else {
        fishf8s.flipX = false
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
        //  extend_forward_speed -= 1
        leave_test()
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
    // extend_forward_speed_text.setText("当前鱼叉发射速度为：" + extend_forward_speed)
    
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
function harpoon_fire(a) {
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
