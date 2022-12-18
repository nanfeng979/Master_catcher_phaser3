import {canvasWidth, canvasHeight} from "./index.js"

export let shop_lanch = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function shop_lanch() {
        Phaser.Scene.call(this, {key: "shop_lanch"})
    },

    preload: function() {
        this.load.image("set", "./images/set_scene.png")
        this.load.image("close", "./images/close_icon.png")
        this.load.image("null", "./images/touming_xiangsu.png")
        this.load.image("blue", "/images/蓝色进度条.png")
        this.load.image("yellow", "/images/黄色进度条.png")
        this.load.image("white", "/images/白色滑动按钮.png")
        this.load.image("shop", "./images/new/商店界面2.png")
    },

    create: function() {
        // 设置框
        // this.add.image(canvasWidth / 2, canvasHeight / 2, "set").setScale(0.6);
        this.add.image(canvasWidth / 2, canvasHeight / 2, "shop").setScale(0.6);

        // var blue1 = this.add.image(canvasWidth / 2 + 28, canvasHeight / 2 - 38, "blue").setScale(0.6)
        // var yellow1 = this.add.image(canvasWidth / 2 - 66, canvasHeight / 2 - 38, "yellow").setScale(0.6).setOrigin(0, 0.5)
        // var blue1_click = this.add.image(blue1.x, blue1.y, "null").setScale(blue1.width * 0.6 * 0.8 / 2, blue1.height * 0.6 / 2).setInteractive()
        // var white1 = this.add.image(canvasWidth / 2 - 60, canvasHeight / 2 - 38, "white").setScale(0.6)
        // var jindutiao_leng1 = 0.6
        // white1.x += 34 * 3
        // yellow1.setScale(0.6 * jindutiao_leng1, 0.6)
        // blue1_click.on("pointerdown", (pointer) => {
        //     if(pointer.x > white1.x){
        //         white1.x += 34
        //         jindutiao_leng1 += 0.2
        //     }else if(pointer.x < white1.x){
        //         white1.x -= 34
        //         jindutiao_leng1 -= 0.2
        //     }
        //     yellow1.setScale(0.6 * jindutiao_leng1, 0.6)
        //     bgaudio.volume = 3 * jindutiao_leng1
        // })

        // var blue2 = this.add.image(canvasWidth / 2 + 28, canvasHeight / 2 + 17, "blue").setScale(0.6)
        // var yellow2 = this.add.image(canvasWidth / 2 - 66, canvasHeight / 2 + 17, "yellow").setScale(0.6).setOrigin(0, 0.5)
        // var blue2_click = this.add.image(blue2.x, blue2.y, "null").setScale(blue2.width * 0.6 * 0.8 / 2, blue2.height * 0.6 / 2).setInteractive()
        // var white2 = this.add.image(canvasWidth / 2 - 60, canvasHeight / 2 + 17, "white").setScale(0.6)
        // var jindutiao_leng2 = 0.6;
        // white2.x += 34 * 3
        // yellow2.setScale(0.6 * jindutiao_leng2, 0.6)
        // blue2_click.on("pointerdown", (pointer) => {
        //     if(pointer.x > white2.x){
        //         white2.x += 34
        //         jindutiao_leng2 += 0.2
        //     }else if(pointer.x < white2.x){
        //         white2.x -= 34
        //         jindutiao_leng2 -= 0.2
        //     }
        //     yellow2.setScale(0.6 * jindutiao_leng2, 0.6)
        //     dianjiAudio.volume = jindutiao_leng2
        // })


        // 关闭按钮
        let close_key = this.add.image(canvasWidth / 2 + 185, canvasHeight / 2 - 144, "close").setScale(0.65).setInteractive()
        // 关闭按钮点击事件
        close_key.setAlpha(0.01)
        close_key.on("pointerdown", () => {
            document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
            localStorage.setItem("pause", "false")
            this.scene.resume("gaming_scene")
            this.scene.stop()
        }, this)
        // 关闭按钮鼠标移入事件
        close_key.on("pointerover", () => {
            document.body.style.cursor = "url(./images/pointer_mouse_icon.ico), auto"
        })
        // 关闭按钮鼠标移出事件
        close_key.on("pointerout", () => {
            document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
        })

        // 确认按钮
        let yes_key = this.add.image(canvasWidth / 2 - 6, canvasHeight / 2 + 120, "null").setScale(92, 40).setInteractive()
        // 确认按钮点击事件
        yes_key.on("pointerdown", () => {
            localStorage.setItem("pause", "false")
            this.scene.resume("gaming_scene")
            this.scene.stop()
        }, this)
        // 确认按钮鼠标移入事件
        yes_key.on("pointerover", () => {
            document.body.style.cursor = "url(./images/pointer_mouse_icon.ico), auto"
        })
        // 确认按钮鼠标移出事件
        yes_key.on("pointerout", () => {
            document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
        })

    }
})