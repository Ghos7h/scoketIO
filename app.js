var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendfile('index.html');
});

var clientConnection = 0;
//Whenever someone connects this gets executed
io.on('connection', (socket) => {
    console.log('A user connected');

    // sending built-in event
    // setTimeout(() => {socket.send("Sent a message 4seconds after connection!")}, 4000);


    // send custom event ... 
    // setTimeout(() => {socket.emit("testEvent", {description: "A custom event named testerEvent!"})}, 4000);

    // capturing custom event from client ...
    // socket.on('testEvent', (data)=>{console.log(data);});

    // when we want to broadcast message to evryone 
    // clientConnection++;
    // io.sockets.emit('broadcast', {description: clientConnection+ ' clients connected!'});

    // if we want to send an event to everyone, but the client that caused it 
     socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
     socket.broadcast.emit('newclientconnect',{ description: clientConnection + ' clients connected!'})

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
    	clientConnection--;
      	io.sockets.emit('broadcast',{ description: clientConnection + ' clients connected!'});
        console.log('A user disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});