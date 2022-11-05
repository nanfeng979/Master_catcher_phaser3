import {canvasWidth, canvasHeight} from "./index.js"

export let set_launch = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function set_launch() {
        Phaser.Scene.call(this, {key: "set_launch"})
    },

    preload: function() {
        this.load.image("set", "./images/set_scene.png")
        this.load.image("close", "./images/close_icon.png")
        this.load.image("null", "./images/touming_xiangsu.png")
    },

    create: function() {
        this.add.image(canvasWidth / 2, canvasHeight / 2, "set");

        // 关闭按钮
        let close_key = this.add.image(canvasWidth / 2 + 130, canvasHeight / 2 - 164, "close").setScale(0.65).setInteractive()
        // 关闭按钮点击事件
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