var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendfile('index.html');
});

//Whenever someone connects this gets executed
io.on('connection', (socket) => {
    console.log('A user connected');

    // sending built-in event
    // setTimeout(() => {socket.send("Sent a message 4seconds after connection!")}, 4000);


    // send custom event ... 
    // setTimeout(() => {socket.emit("testEvent", {description: "A custom event named testerEvent!"})}, 4000);

    socket.on('testEvent', (data)=>{console.log(data);});

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});