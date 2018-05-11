var path = require('path')
var express = require('express')
var app = express()

var fs = require('fs')
var emlformat = require('eml-format')

var src = path.resolve(__dirname, 'sample9.eml')
var dist = path.resolve(__dirname, 'sample9.html')

app.get('/', function (req, res) {
  var eml = fs.readFileSync(src, 'utf-8')
  emlformat.parse(eml, function (error, data) {
    if (error) return console.log(error)
    let content_type = data['headers']['Content-type'].split(';')[0].trim()
    // charset = data['headers']['Content-type'].split(';')[1].replace(/\"/g, '').trim()
    // console.log([content_type, charset].join('; '))
    // console.log(data['headers']['Content-type'].toString().replace(/\"/g,"").replace(/ /g, ""))
    // res.type([content_type, charset].join("; "))
    let template = '<html lang="zh">#<head><head/><body>@</body></html>'
    let meta = '\n<meta http-equiv="Content-Type" content="@">'.replace('@', [content_type, 'gb18030'].join(';'))
    // let metalang = '<meta http-equiv="content-language" content="@">'.replace('@', 'zh')
    // let metabit = '<meta http-equiv="Content-transfer-encoding" content="@">'.replace('@', data['headers']['Content-transfer-encoding'])
    template = template.replace('@', data['body']).replace('#', meta)
    // res.set({
    //   'Content-type': 'charset=gb18030'
    // })
    // res.type(data['headers']['Content-type'])
    // res.type('text/plain; charset=gb2312')
    // console.log(data)
    // res.set('Content-Type', 'text/plain')
    // res.charset = charset
    // res.send(new Buffer(data['body']))
    res.send(template)
    // res.send(new Buffer(template))
  })
  // res.sendFile(path.join(__dirname+'/sample9.html'));
  // res.sendFile(source);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
