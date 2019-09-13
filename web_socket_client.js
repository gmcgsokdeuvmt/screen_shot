let sock = new WebSocket('ws://localhost:8000')
let state = {
    sx: 0,
    sy: 0,
    sw: 0,
    sh: 0,
    dx: 0,
    dy: 0,
    dw: 0,
    dh: 0,
}
// 接続
sock.addEventListener('open',function(e){
    console.log('Socket 接続成功')
    sock.send('plz screen shot')
})

// サーバーからデータを受け取る
sock.addEventListener('message',function(e){
    let canvas = document.getElementById("canvas")
    let dataUri = e.data
    loadImage(dataUri, canvas)
})

document.addEventListener('DOMContentLoaded',function(e){
    // サーバーにデータを送る
    document.getElementById('screen').addEventListener('click',function(e){
        sock.send('plz screen shot')
    })
    // 上下左右　拡縮の設定をする
    document.getElementById('up').addEventListener('click',function(e){
        let img = getImage()
        let canvas = document.getElementById("canvas")
        state.sy -= 100
        if (state.sy < 0) {
            state.sy = 0
        }
        drawImage(img, canvas, state.sx, state.sy, state.sw, state.sh, state.dx, state.dy, state.dw, state.dh)
    })
    document.getElementById('down').addEventListener('click',function(e){
        let img = getImage()
        let canvas = document.getElementById("canvas")
        state.sy += 100
        if (state.sy > img.height - state.sh) {
            state.sy = img.height - state.sh
        }
        drawImage(img, canvas, state.sx, state.sy, state.sw, state.sh, state.dx, state.dy, state.dw, state.dh)
    })
    document.getElementById('left').addEventListener('click',function(e){
        let img = getImage()
        let canvas = document.getElementById("canvas")
        state.sx -= 100
        if (state.sx < 0) {
            state.sx = 0
        }
        drawImage(img, canvas, state.sx, state.sy, state.sw, state.sh, state.dx, state.dy, state.dw, state.dh)
    })
    document.getElementById('right').addEventListener('click',function(e){
        let img = getImage()
        let canvas = document.getElementById("canvas")
        state.sx += 100
        if (state.sx > img.width - state.sw) {
            state.sx = img.width - state.sw
        }
        drawImage(img, canvas, state.sx, state.sy, state.sw, state.sh, state.dx, state.dy, state.dw, state.dh)
    })
    document.getElementById('plus').addEventListener('click',function(e){
        let img = getImage()
        let canvas = document.getElementById("canvas")
        state.sw = state.sw / 2
        state.sh = state.sh / 2
        drawImage(img, canvas, state.sx, state.sy, state.sw, state.sh, state.dx, state.dy, state.dw, state.dh)
    })
    document.getElementById('minus').addEventListener('click',function(e){
        let img = getImage()
        let canvas = document.getElementById("canvas")
        state.sw = state.sw * 2
        state.sh = state.sh * 2
        console.log(state.sw)
        console.log(state.sh)
        console.log(img.width)
        console.log(img.height)
        if (state.sw >= img.width) {
            state.sw = img.width
            state.sx = 0
        }
        if (state.sh >= img.height) {
            state.sh = img.height
            state.sy = 0
        }
        drawImage(img, canvas, state.sx, state.sy, state.sw, state.sh, state.dx, state.dy, state.dw, state.dh)
    })
})

function drawImage(image, canvas, sx, sy, sw, sh, dx, dy, dw, dh) {
    let ctx = canvas.getContext("2d")

    ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
}

function loadImage(dataUri, canvas) {
    //let image = new Image()
    let image = getImage()    
    image.src = dataUri
    image.onload = function() {
        initializeState(image, state)
        drawImage(image, canvas, state.sx, state.sy, state.sw, state.sh, state.dx, state.dy, state.dw, state.dh)
    }
}

function getImage() {
    return document.getElementById("screen_shot")
}

function initializeState(image, state) {
    state.sx = 0
    state.sy = 0
    state.sw = image.width
    state.sh = image.height
    
    let aspectRatio = state.sh / state.sw
    let dw = 640
    let dh = 480
    // 縦長の場合
    if (aspectRatio > 1.0) {
        dw = dh / aspectRatio
    }
    // 横長の場合
    else {
        dh = dw * aspectRatio
    }
    state.dx = 0
    state.dy = 0
    state.dw = dw
    state.dh = dh
}