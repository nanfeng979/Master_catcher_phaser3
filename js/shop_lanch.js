let q1, q2, q3

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
        this.load.image("null_lv", "./images/green_xiangsu.png")

        this.load.image("shop", "./images/new/商店界面2.png")
        this.load.image("q1", "./images/new/商店放大后图片1.png")
        this.load.image("q2", "./images/new/商店放大后图片2.png")
        this.load.image("q3", "./images/new/商店放大后图片3.png")
    },

    create: function() {
        // 商店框
        this.add.image(canvasWidth / 2, canvasHeight / 2, "shop").setScale(0.6);

        // 放大
        // let qclose1 = this.add.image(canvasWidth / 2 - 100, canvasHeight / 2 + 10, "null_lv").setScale(60, 90);
        // let qclose2 = this.add.image(canvasWidth / 2 + 48, canvasHeight / 2 + 10, "null_lv").setScale(60, 90);
        // let qclose3 = this.add.image(canvasWidth / 2 + 190, canvasHeight / 2 + 10, "null_lv").setScale(60, 90);
        // q1 = this.add.image(canvasWidth / 2 - 100, canvasHeight / 2 + 10, "q1").setScale(0.25);
        // q2 = this.add.image(canvasWidth / 2, canvasHeight / 2, "q2").setScale(0.6);
        // q3 = this.add.image(canvasWidth / 2, canvasHeight / 2, "q3").setScale(0.6);
        
        let qclose1 = this.add.image(canvasWidth / 2 - 100, canvasHeight / 2 + 10, "null").setScale(60, 90).setInteractive();
        // qclose1.on("pointerdown", () => {
        // }, this)
        qclose1.on("pointerover", () => {
            q1 = this.add.image(canvasWidth / 2 - 100, canvasHeight / 2 + 10, "q1").setScale(0.25);
        })
        qclose1.on("pointerout", () => {
            q1.destroy()
        })

        let qclose2 = this.add.image(canvasWidth / 2 + 48, canvasHeight / 2 + 10, "null").setScale(60, 90).setInteractive();
        // qclose1.on("pointerdown", () => {
        // }, this)
        qclose2.on("pointerover", () => {
            q2 = this.add.image(canvasWidth / 2 + 48, canvasHeight / 2 + 10, "q2").setScale(0.25);
        })
        qclose2.on("pointerout", () => {
            q2.destroy()
        })

        let qclose3 = this.add.image(canvasWidth / 2 + 190, canvasHeight / 2 + 10, "null").setScale(60, 90).setInteractive();
        // qclose1.on("pointerdown", () => {
        // }, this)
        qclose3.on("pointerover", () => {
            q3 = this.add.image(canvasWidth / 2 + 190, canvasHeight / 2 + 10, "q3").setScale(0.25);
        })
        qclose3.on("pointerout", () => {
            q3.destroy()
        })

        // 关闭按钮
        let close_key = this.add.image(canvasWidth / 2 + 250, canvasHeight / 2 - 144, "close").setScale(0.65).setInteractive()
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



    }
})