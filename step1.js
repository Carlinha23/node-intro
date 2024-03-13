const fs = require('fs');

fs.readFile('one.txt', 'utf8', (err, data) => {
  if(err){
    console.log("ERROR:", err);
    process.kill(1)
  }
  console.log(data)
})