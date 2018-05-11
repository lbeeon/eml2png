
var app = require('./server.js')
app.listen(3000, function () {
  console.log('Start convert')
  require('./pngprocess')()
})
