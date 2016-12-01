
function ascii (container, image) {
  // based on
  // https://github.com/Konard/twittermatrix

  var c = document.getElementById(container)
  var ctx = c.getContext('2d')

  // making the canvas full screen
  // c.height = window.innerHeight
  // c.width = window.innerWidth

  var interval
  var lines = image.split('\n')
  var row = 0 // index
  var posY = 0 // y pos to draw the next line
  var font_size = 14

  var wait = null
  var opacity = 9

  function draw () {
    // Black BG for the canvas
    // translucent BG to show trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, c.width, c.height)

    ctx.fillStyle = '#0F0' // green text
    ctx.font = font_size + 'px "Monospace"'

    var line = lines[row++]
    if (row >= lines.length) {
      if (!wait) {
        wait = setTimeout(() => {
          clearInterval(interval)
          var int = setInterval(() => {
            c.style.opacity = '0.' + (opacity--)
            if (opacity === 0) {
              clearInterval(int)
            }
          }, 100)
        }, 2200)
      }
      return
    }
    posY += font_size

    for (var i=0; i < line.length; i++) {
      var symbol = line[i]
      ctx.fillText(symbol, (i * 8), (font_size + posY))
    }
  }

  interval = setInterval(draw, 44)
}
