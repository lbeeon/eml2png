var nightmare = require('nightmare')

nightmare
 .goto('https://github.com')
 .screenshot()
 .end()
 .then(function(){console.log("Screenshot Saved")})
