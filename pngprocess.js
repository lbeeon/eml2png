module.exports = async function () {
  const path = require('path')
  const fs = require('fs')
  const emlFolder = path.join(__dirname, 'emls')
  const imgFolder = path.join(__dirname, 'images')
  const Nightmare = require('nightmare')
  const files = fs.readdirSync(emlFolder)

  for (let i = 0, len = files.length; i < len; i++) {
    let file = files[i]
    let dist = imgFolder + '/' + file + '.png'
    let nightmare = Nightmare()
    await nightmare.goto('http://localhost:3000/' + file)
      .screenshot(dist)
      .end()
      .then(function () { console.log(dist) })
    if ((i + 1 < len) === false) {
      process.exit(0)
    }
  }
}
