var fs = require('fs');
var emlformat = require('eml-format');
 
var eml = fs.readFileSync("sample9.eml", "utf-8");
emlformat.read(eml, function(error, data) {
  if (error) return console.log(error);
  fs.writeFileSync("sample.json", JSON.stringify(data, " ", 2));
  console.log(data);
});
