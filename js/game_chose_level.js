let area_big

import {canvasWidth, canvasHeight} from "./index.js"

export let game_chose_level = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: 

    function game_chose_level() {
        Phaser.Scene.call(this, {key: "game_chose_level"})
    },
    preload: function () {
        this.load.image("game_chose_level", "./images/game_chose_level.png")
        this.load.image("area", "./images/touming_xiangsu.png")
        this.load.image("back_icon", "./images/back_icon.png") // 引入“返回”图标
        this.load.image("area_big", "./images/new/单独放大关卡.png")
    },
    create: function () {
        this.add.image(canvasWidth / 2, canvasHeight / 2, "game_chose_level")
        // // 返回键
        // let return_key = this.add.image(1240, 40, "back_icon").setScale(0.4).setInteractive()
        // // 返回键的点击事件
        // return_key.on("pointerdown", () => {
        //     this.scene.start("char_chose") // 进入角色选择页面
        // })
        // // 返回键的鼠标移入事件
        // return_key.on("pointerover", () => {
        //     document.body.style.cursor = "url(./images/pointer_mouse_icon.ico), auto"
        // })
        // // 返回键的鼠标移出事件
        // return_key.on("pointerout", () => {
        //     document.body.style.cursor = "url(./images/default_mouse_icon.ico), auto"
        // })

        let area_scale_x = 160
        let area_scale_y = 180
        let area = this.add.image(630, 350, "area").setScale(area_scale_x, area_scale_y)
        area.setInteractive();
        area.on("pointerdown", () => {
            let gold = localStorage.getItem("gold")
            localStorage.setItem("gold", gold - 20)
            this.scene.start("gaming_scene") // 切换场景
            document.querySelector("body").style.cursor = "url(./images/default_mouse_icon.ico), auto"
        })
        area.on("pointerover", () => {
            document.querySelector("body").style.cursor = "url(./images/pointer_mouse_icon.ico), auto"
            area_big = this.add.image(canvasWidth / 2 - 15, canvasHeight / 2 - 25, "area_big").setScale(1.35)
        })
        area.on("pointerout", () => {
            document.querySelector("body").style.cursor = "url(./images/default_mouse_icon.ico), auto"
            area_big.destroy()
        })

        // 按ESC退出到首页
        let _this = this
        this.input.keyboard.on('keydown-ESC', function (event) {
            _this.scene.start("game_first_open")
        });
    }

})