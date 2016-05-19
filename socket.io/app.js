var project = require('pillars'),
    io = require('socket.io')(project.services.get('http').server);


// Starting the project
project.services.get('http').configure({
    port: process.env.PORT || 3000
}).start();


// Static Files, like index.html in this case
var staticRoute = new Route({
    id: 'staticRoute',
    path: '/*:path',
    directory: {
        path: './public',
        listing: true
    }
});

// Send the message
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


project.routes.add(staticRoute);