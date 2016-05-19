# Pillars.js Example - Socket.io

This sample is based in [the Socket.io - chat sample](http://socket.io/get-started/chat/). The [original version](https://github.com/rauchg/chat-example) was implemented for Express.
We *translate it* for you in order to use it with pillars. 

**Tip:** You can compare how to run Socket.io with both frameworks. 

- **This example show you:**
	- How to setup create a very simple simple chat using [socket.io](https://www.npmjs.com/package/socket.io) and Pillars
	- How to *emit messages* and *listen for changes* using events
- **Dependencies**
    - [Pillars](https://github.com/pillarsjs/pillars) - 0.3.3
    - [Socket.io](https://www.npmjs.com/package/socket.io) - 1.4.6
- **Change Log**
	- 0.0.1 - First and current versión

- **Instalation & setup**
	- Download the repository. 
	- Move to this folder
	- Install dependencies and start the project
	```
		npm install && node app
	```

- **Licence**
 - All the examples are covered by the same **MIT** Licence as **Pillars.js**

	
### Advance Options

We can *integrate* better socket.io in Pillars taking advantage of the routes for deal with statical resources.

**In details**

The main objetive is to let Pillars manage the static files, so we can integrate socket.io client inside the usual working flow.
Then the Socket.io client library is added as a route resource, now you can take an advantaje of the cache and more key feautres that pillars provides you.

**Check out the code!**

- inside *app.js*
```javascript
var project = require('pillars'),
    io = require('socket.io'); // No server reference is provided, just the library


// Starting the project http service, as usual
project.services.get('http').configure({
    port: process.env.PORT || 3000
}).start();

// Attach Socket.io to Pillars... avoiding to serve the client itself
io = io(project.services.get('http').server,{serveClient: false});

/* 
  Serve socket.io client on Pillars. 
  This will integrated with pillars philosophy and features like cache, logs...
*/
project.routes.add(new Route({
        id: 'ioClient',
        path: '/socket.io.js',
    },function(gw){
        gw.file('./node_modules/socket.io/node_modules/socket.io-client/socket.io.js');
    }));


// Static Files, like index.html in this case
var staticRoute = new Route({
    id: 'staticRoute',
    path: '/*:path',
    directory: {
        path: './public',
        listing: true
    }
});
project.routes.add(staticRoute);


// Send the message
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
```

inside *index.html*
```html
<!-- 
  no need for <script src="https://cdn.socket.io/socket.io-1.2.0.js"></script>. 
  Now we provide the file from Pillars using the right route.
-->
<script src="/socket.io.js"></script>
```
