let express = require('express')
let app = express()

app.get('/', function(req, res) {
  console.log('got request for root');
  res.send('helloworld')
})

// app.get()
app.listen(8080, function(){
  console.log('listening on 8080');
})
