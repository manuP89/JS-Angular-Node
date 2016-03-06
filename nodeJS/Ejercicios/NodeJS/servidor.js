
/*creamos las variables para http, filesystem y url. 
la función require es propia de node.
así configuramos los modulos que vamos a necesitar
*/
var http = require("http");
var fs = require("fs");
var url = require("url");

//creamos el servidor. la sentencia la tenemos dentro del modulo http.

http.createServer(function (request, response) {
	/*request en este caso va a ser una peticion de una pagina html
	la solicitud entra por request*/
	var pathname = url.parse(request.url).pathname;

	/*este path corresponde a un fichero y lo vamos a leer
	el pathname nos incluye la barra, x eso empezamos a leer
	el substring desde la posicion 1*/
	fs.readFile(pathname.substr(1), function (err, data){
		if (err){//si ha habido error y no ha encontrado la página.
			console.log(err);
			response.writeHead(404,{'Content-Type':'text/html'}); //generamos una respuesta
		}else{//si no ha habido error y se ha encontrado la pagina
			response.writeHead(200,{'Content-Type':'text/html'});
			response.write(data.toString()); //enviamos el doc leido como respuesta
		}
		response.end(); //enviamos la respuesta
	})
//aqui ya hemos creado el servidor, le decimos en que puerto tiene que escuchar
}).listen(8081);
