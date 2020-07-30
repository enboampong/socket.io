const express= require("express");
const socket = require('socket.io');

//App setup
var app = express();
 
var server = app.listen(4000, function(){
    console.log("listening on port 4000");
});


//static files
app.use(express.static('public')); 

//socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log('made a connection to the server', socket.id);

  // Handle chat event
  socket.on('chat', function(data){
    // console.log(data);
    io.sockets.emit('chat', data);
});

// Handle typing event
socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
});

});