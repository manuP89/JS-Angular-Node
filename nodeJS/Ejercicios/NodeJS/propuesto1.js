
//llamamos a los modulos
var http = require('http');
var url = require('url');
//creamos servidor(que despues configuramos)
var server = http.createServer();
//creamos un objeto con las rutas válidas para la ejecución
var routes ={
	"/hola": function (request, response) {response.end("Hola!")},
	"/adios": function (request, response) {response.end("Adios!")}
	}
//cuando llegue petición leo la url de la petición y miro si forma parte de las rutas válidas.
server.on("request", function (request, response) {
	var urlData = url.parse(request.url);
	var path = urlData.pathname;

	/*si no queremos usar el objeto routes
	if (path=="/hola"){response.end("Hola")}
	else if (path=="/adios"){response.end("Adios")}
	else{response.end("Not found")}
	*/

	if (path in routes){//si esta dentro de las rutas validas ejecuto
		return routes[path](request, response);
	}else{
		response.writeHead(404);
		response.end("Not found");
	}
})
server.listen(3000);