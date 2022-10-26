import {canvasWidth, canvasHeight} from "./index.js"

let gold_text

export let char_chose = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function char_chose() {
        Phaser.Scene.call(this, {key: "char_chose"})
    },
    preload: function () {
        this.load.image("char_chose", "./images/角色选择界面.png")
        this.load.image("area", "./images/touming_xiangsu.png")
        this.load.image("gold", "./images/gold.png") // 引入“显示金币框”
    },
    create: function () {
        this.add.image(canvasWidth / 2, canvasHeight / 2, "char_chose")
        this.add.image(860, 50, "gold").setScale(0.9)
        let gold = localStorage.getItem("gold") // 获取本地“gold”值
        gold_text = this.add.text(860, 50, gold, { fontSize: "24px" })

        let area_scale_x = 150
        let area_scale_y = 55
        let area = this.add.image(1000, 545, "area").setScale(area_scale_x, area_scale_y)
        // 控制角色选择确定点击后该点击事件不会继承到后面场景
        let game_chose_level_input = true // 控制变量为真
        area.setInteractive();
        area.on("pointerdown", () => {
            if(game_chose_level_input) {
                // 鼠标在热区内
                clearInterval(set_gold_text)
                this.scene.start("game_chose_level") // 切换场景game_first_open
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

        let set_gold_text = setInterval(() => {
            gold_text.setText(localStorage.getItem("gold"))
            console.log("char")
        }, 1000)
    },
})