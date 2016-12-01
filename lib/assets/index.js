
function init () {
  var canvas = document.createElement('canvas')
  canvas.id = 'ascii'
  document.body.appendChild(canvas)

  canvas = document.createElement('canvas')
  canvas.id = 'matrix'
  document.body.appendChild(canvas)

  return {
    ascii: () => {
      var canvas = document.querySelector('#ascii')
      ascii('ascii', logo)
      canvas.width = 950
      canvas.height = 850
      canvas.style.left = (window.innerWidth - canvas.width) / 2 + 'px'
      canvas.style.top = (window.innerHeight - canvas.height) / 2 + 'px'
    },
    matrix: () => {
      var add = matrix('matrix')

      function string () {
        var max = 55
        var length = Math.floor(Math.random() * max) + 1
        var message = Math.random().toString(36).substring(length)
        return message
      }

      setInterval(() => {
        add(string())
      }, 100)
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  var app = init()
  app.ascii()
  app.matrix()
  setTimeout(() => {
    var canvas = document.querySelector('#matrix')
    var opacity = 0
    var int = setInterval(() => {
      canvas.style.opacity = '0.' + (opacity++)
      if (opacity === 9) {
        clearInterval(int)
      }
    }, 300)
  }, 3300)
})
