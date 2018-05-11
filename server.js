var path = require('path')
var express = require('express')
var app = express()

var fs = require('fs')
var emlformat = require('eml-format')

function bufferToString (buffer) {
  var charsetDetector = require('node-icu-charset-detector')
  var charset = charsetDetector.detectCharset(buffer).toString()

  try {
    return buffer.toString(charset)
  } catch (x) {
    var Iconv = require('iconv').Iconv
    var charsetConverter = new Iconv(charset, 'utf8')
    return charsetConverter.convert(buffer).toString()
  }
}

app.get('/:filename', function (req, res) {
  let file = req.params['filename']
  if (file === '') {
    return res.send('')
  }

  let filePath = path.join(__dirname, 'emls', file)
  let buffer = fs.readFileSync(filePath)
  let bufferString = bufferToString(buffer)

  emlformat.parse(bufferString, function (error, data) {
    if (error) return console.log(error)
    let contentType = data['headers']['Content-type'].split(';')[0].trim()
    res.type(contentType)
    res.send(new Buffer(data['body']))
  })
})

module.exports = app
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })
