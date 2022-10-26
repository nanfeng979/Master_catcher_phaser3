export let gaming_scene_lanch = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function gaming_scene_lanch() {
        Phaser.Scene.call(this, {key: "gaming_scene_lanch"})
    },

    preload: function() {
        this.load.image("start_icon", "./images/start_icon.png")
    },
    
    create: function() {
        // 启动键
        this.add.image(1140, 40, "start_icon").setScale(0.5).setInteractive().on("pointerdown", () => {
            this.scene.resume("gaming_scene")
            this.scene.stop()
        }, this)
    }
})