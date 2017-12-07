//Inclusión de la librería pillars
var project = require('pillars');

project.services.get("http").configure({
	port:3001
}).start(); 

project.routes.add(new Route({
	path:"/mytemplate"
},function(gw){
	let data = {
		name: "Manolo",
		surname: "Gafotas",
		age: "32"
	};	
	gw.render("static/user.hbs", data);
}));


let pillarsDocsStatic = new Route({
  id:'pillarsDocsStatic',
  path:'/*:path',
  directory:{
    path:'./static',
    listing:true
  }
});
project.routes.add(pillarsDocsStatic);



/*
1.- Hola Mundo
2.- Configuración del proyecto
3.- Configuración del servicio
4.- Creación de un nuevo servicio http en otro puerto
5.- Configuración de un controlador para que atienda sólo en un puerto determinado
6.- Incorporación de directorio estático
7.- Plantilla hbs
8.- Sesión sin persistencia
9.- Retransmisión de video en streaming
10.- Envío de un json
11.- GET y POST
12.- Rutas parametrizadas /:var/:*rest

*/

//2.- Configuración del proyecto mediante .configure()
/*
project.configure({
	debug:true, 
	renderReload: true,
	cors: false,
	maxUploadSize: 1*1024*1024,
	logFile: false
});


/*
project.services.get("http").configure({
	port:3001,
	timeout: 8000 //Error 408
}).start();


//3.- Pillars.js incorpora un servicio http built-in, así que tomamos e iniciamos del servicio http, mediante el método .start();
// Para configurar el servicio, se usa el método .configure()
/*
project.services.get('http').configure({
	port:3001,
	timeout: 8000
}).start();

//4.- Creación de un nuevo servicio http
/*project.services.add((new HttpService({
  id:'http2',
  port: 3002
})).start()); 

//5.- Filtrado por un puerto determinado. 
//Los controladores filtran la petición por: port, path, method, host y https 
//Ejemplo filtrado de controlador por puerto de petición
/*
project.routes.add(new Route({
	path:"/info",
	port: 3002
},gw=>{
	gw.json(project);
}));

//6.- Ejemplo directorio estático
//Añadimos un nuevo controlador que activa el directorio estático (el directorio estático es el middleware directory.js)
/*
let pillarsDocsStatic = new Route({
  id:'pillarsDocsStatic',
  path:'/*:path',
  directory:{
    path:'./static',
    listing:true
  }
});
project.routes.add(pillarsDocsStatic);


//7.- Ejemplo de envío de datos a un template
/*
project.routes.add(new Route({
	path:"/mytemplate"
},function(gw){
	let data = {
		name: "Manolo",
		surname: "Gafotas",
		age: "32"
	};	
	gw.render("static/user.hbs", data);
}));


//8.- Sesión sin persistencia
/*
project.routes.add(new Route({
	port: 3001,
	path:"hola",
	method: "GET",
	host: "localhost",
	https: false,
	multipart: false,
	cors: false,
	session: true
},gw=>{
	gw.session.counter = gw.session.counter || 0;
	gw.session.counter++;	
	gw.html("Hola Mundo, esta es tu visita:"+ gw.session.counter);
}));

//10.- Ejemplo de envío de un json
/*
project.routes.add(new Route({
	path:"/json"
},function(gw){
	let data = {
		name: "Manolo",
		surname: "Gafotas",
		age: "32",
		func : function(){console.log("Holita");}
	};	
	gw.json(data);
}));*/





//Ejemplo rutas parametrizadas
/*
project.routes.add(new Route({
	path:"/:var1/:var2"
},gw=>{
	gw.json(gw.pathParams["var1"]);
}));
*/



/*11.- GET*/
//localhost?a=A&b=B
//gw.query['a'], gw.query['b']
//POST
// El route debe estar configurado en method y multipart a true si vamos a subir archivos
//gw.files, estarán todos los archivos subidos y almacenados en el directorio temp
//el contenido del post-> gw.content.params



//extra.- Controlador para desactivar el servicio http
/*
project.routes.add(new Route({
	path: "off"
},gw=>{
	project.services.get("http2").stop();
	gw.send("Desactivado el servicio http2");
}));

//Controlador para activa el servicio http2
/*project.routes.add(new Route({
	path: "on"
},gw=>{
	project.services.get("http2").start();
	gw.send("Activado el servicio http2");
}));*/