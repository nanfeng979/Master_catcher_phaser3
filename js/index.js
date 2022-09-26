let canvasWidth = 1280
let canvasHeight = 720
var config = {
    type: Phaser.AUTO,
    width: canvasWidth,
    height: canvasHeight,
    parent: "frame",
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image("background", "images/level-background-0.jpg")
}

function create ()
{
    this.add.image(canvasWidth / 2, canvasHeight / 2, "background")
}

function update ()
{
}