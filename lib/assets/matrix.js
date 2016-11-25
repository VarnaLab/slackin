
document.addEventListener('DOMContentLoaded', () => {
  var canvas = document.createElement('canvas')
  canvas.id = 'c'
  document.body.appendChild(canvas)
  matrix()
})

function matrix () {
  // based on
  // https://github.com/Konard/twittermatrix

  var alphabet = ['0', '1']
  var offset = 0

  var c = document.getElementById('c')
  var ctx = c.getContext('2d')

  //making the canvas full screen
  c.height = window.innerHeight
  c.width = window.innerWidth

  var font_size = 14
  var columns = c.width / font_size //number of columns for the rain
  //an array of drops - one per column
  var drops = []
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for (var x = 0; x < columns; x++) {
    drops[x] = 1
  }

  //drawing the characters
  function draw() {
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, c.width, c.height)

    ctx.fillStyle = '#0F0' //green text
    ctx.font = font_size + 'px "Unifont"'
    //looping over drops
    for (var i = 0; i < drops.length; i++) {
      if (offset >= alphabet.length) {
        offset = 0
      }
      
      var text = alphabet[offset++]
      
      if (!text) {
        text = ' '
      }
        
      ctx.fillText(text, i * font_size, drops[i] * font_size)

      //sending the drop back to the top randomly after it has crossed the screen
      //adding a randomness to the reset to make the drops scattered on the Y axis
      if (drops[i] * font_size > c.height && Math.random() > 0.975) {
        drops[i] = 0
      }

      //incrementing Y coordinate
      drops[i]++
    }
  }

  setInterval(draw, 44)

  function getSymbols(string) {
    var index = 0
    var length = string.length
    var output = []
    for (; index < length - 1; ++index) {
      var charCode = string.charCodeAt(index)
      if (charCode >= 0xD800 && charCode <= 0xDBFF) {
        charCode = string.charCodeAt(index + 1)
        if (charCode >= 0xDC00 && charCode <= 0xDFFF) {
          output.push(string.slice(index, index + 2))
          ++index
          continue
        }
      }
      output.push(string.charAt(index))
    }
    output.push(string.charAt(index))
    return output
  }

  setInterval(() => {
    // generate random string
    var max = 55
    var length = Math.floor(Math.random() * max) + 1
    var message = Math.random().toString(36).substring(length)
    
    var letters = getSymbols(message)
    
    if (alphabet.length >= 10240) {
      alphabet = alphabet.slice(alphabet.length - letters.length)
    }
    
    for (var i = 0; i < letters.length; i++) {
      alphabet.push(letters[i])
    }
  }, 100)
}
