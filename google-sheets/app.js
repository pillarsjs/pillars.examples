var project = require('pillars');
var jade = require('jade');
var config = require('./config');
var Scheduled = require("scheduled");
var https = require('https');
var fs = require('fs');

// Starting the project
project.services.get('http').configure({
    port: process.env.PORT || 3000
}).start();


// Template setup
var templated = global.templated;
templated.addEngine('jade', function compiler(source, path) {
    return jade.compile(source, {
        filename: path,
        pretty: false,
        debug: false,
        compileDebug: false
    });
});

// Main route for my Google Sheet
var sheetRoute = new Route({
        id: "sheet",
        path: "/*:path"
    },
    function(gw) {
        if (gw.pathParams.path === "") {

            var obj;
            fs.readFile('./data/sheet.json', 'utf8', function(err, data) {
                if (err) throw err;
                obj = JSON.parse(data);

                obj = obj.feed.entry;

                // Síncrono
                var keyData = {};
                keyData.items = [];
                keyData.mainRoute = false;

                for (var i = 0; i < obj.length; i++) {
                    keyData.items.push({
                        library: obj[i]["gsx$librería"].$t,
                        description: obj[i]["gsx$descripción"].$t,
                        documentation: {
                            spanish: obj[i]["gsx$doces"].$t,
                            english: obj[i]["gsx$docen"].$t,
                        },
                        test: obj[i]["gsx$test"].$t,
                        shields: obj[i]["gsx$pegatinas"].$t,
                        notes: obj[i]["gsx$notas"].$t,
                        example: obj[i]["gsx$ejemplo"].$t
                    });
                }

                gw.render("./public/index.jade", keyData);

            });

        } else {
            fs.readFile('./data/sheet.json', 'utf8', function(err, data) {
                if (err) throw err;
                obj = JSON.parse(data);

                obj = obj.feed.entry;

                var keyData = {};
                keyData.items = [];
                keyData.mainRoute = false;

                for (var i = 0; i < obj.length; i++) {

                    if (gw.pathParams.path === obj[i]["gsx$librería"].$t) {
                        keyData.items.push({
                            library: obj[i]["gsx$librería"].$t,
                            description: obj[i]["gsx$descripción"].$t,
                            documentation: {
                                spanish: obj[i]["gsx$doces"].$t,
                                english: obj[i]["gsx$docen"].$t,
                            },
                            test: obj[i]["gsx$test"].$t,
                            shields: obj[i]["gsx$pegatinas"].$t,
                            notes: obj[i]["gsx$notas"].$t,
                            example: obj[i]["gsx$ejemplo"].$t
                        });

                        keyData.mainRoute = true;
                    }

                }

                if (keyData.mainRoute) {
                    gw.render("./public/detail.jade", keyData);
                } else {
                    gw.redirect("/");
                }

            });

        }
    });


var staticRoute = new Route({
    id: 'staticRoute',
    path: '/*:path',
    directory: {
        path: './public',
        listing: true
    }
});

// Adding routes objects to the project
project.routes.add(sheetRoute);
project.routes.add(staticRoute);


// Using Scheduled to download periodically the Google Sheet data in the server
var DownloadSheet = new Scheduled({
    id: "DownloadSheet",
    pattern: "*/2", // Every 2 minutes
    task: function() {
        downloader();
        console.log("Sucesfully downloaded and stored in data/sheet.json");
    }
}).start();


// Function to Download the Data
function downloader() {

    var file = fs.createWriteStream("data/sheet.json");
    var request = https.get("https://spreadsheets.google.com/feeds/list/" + config.sheetCode + "/od6/public/values?alt=json", function(response) {
        response.pipe(file);
        console.log("Downloading the file...");
    });
}