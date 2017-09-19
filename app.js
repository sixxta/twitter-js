const express = require( 'express' );
const app = express();

app.listen(3000, function() {
  console.log('server listening...')
});

app.use(function(request, response, next){
  console.log(request.method + " " + request.originalUrl + " " + response.statusCode)
  next();
});

app.use('/special/', function(request, response, next){
  console.log("We saw a special request!");
  next();
})

app.get('/special/', function(request, response, next){
  response.send("You are special!");
  next();
});

app.get('/', function (request, response) {
  response.send("Welcome!")
});

app.get('/news', function (request, response) {
  response.send("The World is going to hell.")
});
