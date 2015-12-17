var Xray = require('x-ray');
var x = Xray();


x('http://google.com', 'title')(function(err, title) {
  console.log(title) // Google
})