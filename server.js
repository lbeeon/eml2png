const path = require('path')
const express = require('express')
const app = express()

const fs = require('fs')
const simpleParser = require('mailparser').simpleParser

function bufferToString (buffer) {
  const charsetDetector = require('node-icu-charset-detector')
  const charset = charsetDetector.detectCharset(buffer).toString()

  try {
    return buffer.toString(charset)
  } catch (x) {
    const Iconv = require('iconv').Iconv
    const charsetConverter = new Iconv(charset, 'utf8')
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

  simpleParser(bufferString, (err, data) => {
    if (err) {
      console.log(err)
      return res.status(505).send('Not found')
    }
    let contentType = ''
    if (data['html']) {
      contentType = 'text/html'
      res.type(contentType)
      return res.send(Buffer.from(data['html']))
    }

    if (data['text']) {
      contentType = 'text/html'
      res.type(contentType)
      return res.send(Buffer.from(data['text']))
    }

    return res.status(505).send('Not found')
  })
})

module.exports = app
// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })
