// import Nightmare from 'nightmare';
var Nightmare = require('nightmare');

const nightmare = Nightmare();

nightmare.goto('http://localhost:3000/')
 .screenshot('sample.png')
 .end()
 .then(function(){console.log("Screenshot Saved")})
  // .evaluate(() => {
  //   return document.title;
  // })
  // .end()
  // .then((title) => {
  //   console.log(title);
  // })
