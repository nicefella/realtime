var express = require('express');
var ejs = require('ejs');
var ejsmate = require('ejs-mate');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var route = require('./route');
var data = require('./data');
var http = require('http');
var httpServer = http.createServer(app);
var io = require('socket.io').listen(httpServer);

app.set('port', process.env.PORT || 1881);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use("/statics", express.static(__dirname + '/statics'));

app.get('/', route.main);


io.on('connection', function(socket){
  console.log('hello i am connected years old');


  var initdata = new data.RealTimeData(2);

  io.emit('init', initdata.history());

  socket.on('fire', function(msg){
    io.emit('push', initdata.next());
  });

  socket.on('disconnect', function(){
    console.log('i am now disconnected see you later');
  });

});




app.use(function(req, res){
 res.status(404);
 res.type('txt').send('404 go back to the shadow!');
});


httpServer.listen(1881, function(){
  console.log('believe me, realtime service is running');
});
