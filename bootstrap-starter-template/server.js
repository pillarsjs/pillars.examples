var project = require('pillars'),
    jade = require('jade');

// Starting the project
project.services.get('http').configure({
    port: process.env.PORT || 8080
}).start();


// Template Engine
var templated = global.templated;
templated.addEngine('jade', function compiler(source, path) {
    return jade.compile(source, {
        filename: path,
        pretty: false,
        debug: false,
        compileDebug: false
    });
});


// Routes definition
var index = new Route({
        id: "index",
        path: "/"
    },
    function(gw) {
      gw.render('./templates/index.jade');
    });

var estatics = new Route({
    id: 'estatics',
    path: '/*:path',
    directory: {
        path: './public',
        listing: true
    }
});


// Adding Routes to Pillars
project.routes.add(index);
project.routes.add(estatics);