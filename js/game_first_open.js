import {canvasWidth, canvasHeight} from "./index.js"

export let game_first_open = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function game_first_open () {
        Phaser.Scene.call(this, {key: "game_first_open"})
    },
    preload : function () {
        this.load.image("game_cover", "./images/game_cover.png") // 引入游戏封面
        this.load.image("game_start_loading", "./images/game_start_loading.png") // 引入游戏加载页面
    },
    create: function () {
        let _this = this
        this.add.image(canvasWidth / 2, canvasHeight / 2, "game_start_loading")
        let game_cover = this.add.image(canvasWidth / 2, canvasHeight / 2, "game_cover")
        setTimeout(function() {
            game_cover.destroy()
        }, 2000)
        setTimeout(function(){
            _this.scene.start("char_chose") 
        }, 5000)
    }
})