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
  let buffer = fs.readFileSync(file)
  let bufferString = bufferToString(buffer)

  emlformat.parse(bufferString, function (error, data) {
    if (error) return console.log(error)
    let content_type = data['headers']['Content-type'].split(';')[0].trim()
    res.type(content_type)
    res.send(new Buffer(data['body']))
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
