import {canvasWidth, canvasHeight} from "./index.js"

let _this

let initCount = 0
let endCount = 420
let count = initCount
let animObject

let sch_initCount = 0
let sch_endCount = 299
let sch_count = sch_initCount
let sch_animObject

export let game_first_open = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function game_first_open () {
        Phaser.Scene.call(this, {key: "game_first_open"})
    },
    preload : function () {
        this.load.image("game_cover_old", "./images/game_cover.png") // 引入游戏封面
        this.load.image("game_cover", "./images/new/新的游戏封面 .png") // 引入游戏封面
        this.load.image("game_start_loading", "./images/game_start_loading.png") // 引入游戏加载页面
        this.load.image("start", "./images/start.png")

        // for(var i = sch_initCount; i < sch_endCount + 1; i++)
        // {
        //     if(i < 10)
        //     {
        //         this.load.image("a" + i, "./images/anim/1/学校logo_0000000" + i + ".png")
        //     } else if(i < 100) {
        //         this.load.image("a" + i, "./images/anim/1/学校logo_000000" + i + ".png")
        //     } else {
        //         this.load.image("a" + i, "./images/anim/1/学校logo_00000" + i + ".png")
        //     }
        // }

        // for(var i = initCount; i < endCount + 1; i++)
        // {
        //     if(i < 10)
        //     {
        //         this.load.image("b" + i, "./images/anim/3/游戏logo00" + i + ".png")
        //     } else if(i < 100) {
        //         this.load.image("b" + i, "./images/anim/3/游戏logo0" + i + ".png")
        //     } else {
        //         this.load.image("b" + i, "./images/anim/3/游戏logo" + i + ".png")
        //     }
        // }    
    },
    create: function () {
        // 加载动画挡住黑屏，并且再开始执行create()时删除加载动画
        // let load = document.getElementById("load")
        // let loadParent = load.parentElement
        // loadParent.removeChild(load)
        mp4.play()
        _this = this
        this.add.image(canvasWidth / 2, canvasHeight / 2, "game_start_loading")
        let game_cover = this.add.image(canvasWidth / 2, canvasHeight / 2, "game_cover")

        let start = this.add.image(canvasWidth / 2, 670, "start").setScale(0.45).setInteractive()
        start.on("pointerdown", () => {
            // 动画加载完毕前不可以点击
            // if(count < endCount) {
            //     return
            // }
            game_cover.destroy()
            start.destroy()
            setTimeout(function(){
                _this.scene.start("game_chose_level") 
            }, 3000)
        })

        // schoolLogoAnim()
        

        
    },

})

function schoolLogoAnim() {
    // 过场动画
    sch_animObject = _this.add.image(canvasWidth / 2, canvasHeight / 2, "a" + sch_initCount)
    var timer = setInterval(function(){
        sch_animObject.destroy()
        sch_animObject = _this.add.image(canvasWidth / 2, canvasHeight / 2, "a" + sch_count++)
        if(sch_count > sch_endCount)
        {
            clearInterval(timer)
            startAnim()
            setTimeout(function() {
                sch_animObject.destroy()
            }, 3000)
        }
        
    }, 42)
}

function startAnim() {
    // 过场动画
    animObject = _this.add.image(canvasWidth / 2, canvasHeight / 2, "b" + initCount)
    var timer = setInterval(function(){
        animObject.destroy()
        animObject = _this.add.image(canvasWidth / 2, canvasHeight / 2, "b" + count++)
        if(count > endCount)
        {
            animObject.destroy()
            clearInterval(timer)
        }
    }, 42)
}