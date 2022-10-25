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
    },
    create: function () {
        this.add.image(canvasWidth / 2, canvasHeight / 2, "game_chose_level")
        this.add.image(1240, 40, "back_icon").setScale(0.5).setInteractive().on("pointerdown", () => {
            this.scene.start("char_chose")
        })

        let area_scale_x = 160
        let area_scale_y = 180
        let area = this.add.image(630, 350, "area").setScale(area_scale_x, area_scale_y)
        // 控制游戏选择关卡点击后该点击事件不会继承到后面场景
        let game_chose_level_input = true // 控制变量为真
        area.setInteractive();
        area.on("pointerdown", () => {
            if(game_chose_level_input) {
                // 鼠标在热区内
                this.scene.start("gaming_scene") // 切换场景
                document.querySelector("body").style.cursor = "default"
                game_chose_level_input = false // 控制变量为假
            }
        })
        area.on("pointerover", () => {
            if(game_chose_level_input) {
                // 鼠标在热区内
                document.querySelector("body").style.cursor = "pointer"
            }
        })
        area.on("pointerout", () => {
            if(game_chose_level_input) {
                // 鼠标在热区内
                document.querySelector("body").style.cursor = "default"
            }
        })
    }

})