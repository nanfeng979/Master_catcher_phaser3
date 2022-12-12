import {canvasWidth, canvasHeight} from "./index.js"


let initCount = 280
let count = initCount;
let animObject

export let game_first_open = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function game_first_open () {
        Phaser.Scene.call(this, {key: "game_first_open"})
    },
    preload : function () {
        this.load.image("game_cover", "./images/game_cover.png") // 引入游戏封面
        this.load.image("game_start_loading", "./images/game_start_loading.png") // 引入游戏加载页面
        this.load.image("start", "./images/start.png")

        for(var i = initCount; i < 421; i++)
        {
            if(i < 10)
            {
                this.load.image("b" + i, "./images/anim/3/游戏logo00" + i + ".png")
            } else if(i < 100) {
                this.load.image("b" + i, "./images/anim/3/游戏logo0" + i + ".png")
            } else {
                this.load.image("b" + i, "./images/anim/3/游戏logo" + i + ".png")
            }
        }
    },
    create: function () {
        let _this = this
        this.add.image(canvasWidth / 2, canvasHeight / 2, "game_start_loading")
        let game_cover = this.add.image(canvasWidth / 2, canvasHeight / 2, "game_cover")
        // setTimeout(function() {
        //     game_cover.destroy()
        // }, 2000)
        // setTimeout(function(){
        //     _this.scene.start("game_chose_level") 
        // }, 5000)

        let start = this.add.image(canvasWidth / 2, 670, "start").setScale(0.45).setInteractive()
        start.on("pointerdown", () => {
            game_cover.destroy()
            start.destroy()
            setTimeout(function(){
                _this.scene.start("game_chose_level") 
            }, 3000)
        })

        // 过场动画
        animObject = _this.add.image(canvasWidth / 2, canvasHeight / 2, "b" + initCount)
        var timer = setInterval(function(){
            animObject.destroy()
            animObject = _this.add.image(canvasWidth / 2, canvasHeight / 2, "b" + count++)
            if(count > 420)
            {
                clearInterval(timer)
            }
        }, 42)
    },

})