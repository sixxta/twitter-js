const express = require( 'express' );
const app = express();
const nunjucks = require('nunjucks');
const socketio = require('socket.io');

var server = app.listen(3000, function() {
  console.log('server listening...')
});

var io = socketio.listen(server);

const routes = require('./routes');
app.use(function(request, response, next){
  console.log(request.method + " " + request.originalUrl + " " + response.statusCode)
  next();
});
app.use(express.static('public'))
app.use('/', routes(io));
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// var locals = {
//   title: 'Good Peeps',
//   people: [
//       { name: 'Marx'},
//       { name: 'Lenin' },
//       { name: 'Castro'}
//   ]
// };

nunjucks.configure('views', {noCache: true});
// nunjucks.render('index.html', locals, function (err, output) {
//   console.log(output);
// });




// app.use('/special/', function(request, response, next){
//   console.log("We saw a special request!");
//   next();
// })

// app.get('/special/', function(request, response, next){
//   response.send("You are special!");
//   next();
// });

// app.get('/', function (request, response) {
//   response.send("you found the index!")
// });

// app.get('/index.html', function (request, response) {
//   const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//   response.render( 'index', locals );
// });

// app.get('/news', function (request, response) {
//   response.send("The World is going to hell.")
// });
