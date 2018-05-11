var fs = require('fs')
// var charsetDetector = require('node-icu-charset-detector')

var buffer = fs.readFileSync('sample9.eml')
// var charset = charsetDetector.detectCharset(buffer)

// console.log('charset name: ' + charset.toString())
// console.log('language: ' + charset.language)
// console.log('detection confidence: ' + charset.confidence)

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

var buffer = fs.readFileSync('sample9.eml')
var bufferString = bufferToString(buffer)
console.log(bufferString)
