const Nightmare = require('nightmare')

module.exports = async function () {
  const Xvfb = require('xvfb')
  const path = require('path')
  const fs = require('fs')
  const emlFolder = path.join(__dirname, 'emls')
  const imgFolder = path.join(__dirname, 'images')
  const files = fs.readdirSync(emlFolder)
  let xvfb = new Xvfb({silent: true})
  xvfb.startSync()

  let count = 0
  let promises = []
  for (let i = 0, len = files.length; i < len; i++) {
    try {
      count += 1
      let file = files[i]
      let dist = imgFolder + '/' + file + '.png'
      promises.push(screenshot(file, dist))

      if (count > 10) {
        await Promise.all(promises)
        count = 0
        promises = []
      }

      if ((i + 1 < len) === false) {
        await Promise.all(promises)
        xvfb.stopSync()
        process.exit(0)
      }
    } catch (e) {
      count = 0
      promises = []
      console.log(e)
    }
  }
}

async function screenshot (file, dist) {
  return new Promise(async function (resolve, reject) {
    let nightmare = Nightmare({width: 512, height: 512})
    try {
      console.log(file)
      let resp = await nightmare.goto('http://127.0.0.1:3000/' + file).catch(function (err) { console.log(err) })
      if (resp.code === 505) {
        await nightmare.end()
        resolve()
      }
      // let dimensions = await nightmare.wait('body')
      //   .evaluate(function () {
      //     var body = document.querySelector('body')
      //     return {
      //       height: body.scrollHeight,
      //       width: body.scrollWidth
      //     }
      //   })
      try {
        // await nightmare.viewport(1024, 1024).screenshot(dist).end()
        let img = await nightmare.viewport(1024, 1024).screenshot().end()
        if (img.byteLength === 0) {
          return resolve(true)
        }
        let Jimp = require('jimp')
        let j = await Jimp.read(img)
        j.resize(200, 200).greyscale().write(dist, function () { resolve(true) })
      } catch (e) {
        console.log(e)
        reject(e)
      }
    } catch (e) {
      console.log(file, 'convert failed', e)
      reject(e)
    }
  })
}
