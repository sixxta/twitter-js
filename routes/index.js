module.exports = function(io){

  const express = require('express');
  const router = express.Router();
  const bodyParser = require('body-parser')
  // could use one line instead: const router = require('express').Router();
  const tweetBank = require('../tweetBank');
  let showForm;
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({extended: false}));

  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render( 'index', { tweets: tweets, showForm: true});
});

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var tweets = tweetBank.find( {name: name} );
    //res.send(list)
    res.render( 'index', { tweets: tweets, showForm: true, username: name} );
});

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('newTweet', {name, text});
    res.redirect('/');
});

  router.get('/tweets/:id', function(req, res){
    var tweetId = Number(req.params.id);
    var tweets = tweetBank.find({tweetID: tweetId});
    res.render('index', {tweets: tweets, showForm: true});
});

  router.get('/stylesheets/style.css', function(request, response){
  response.sendFile('/Users/evalinamorales/GH/twitter-js/public/stylesheets/style.css')
})

return router;
};

