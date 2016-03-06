/*cargamos los módulos necesarios, en este caso añadimos el framework del express
*/
var express = require('express');
var http = require('http');
var fs = require('fs');

/*instalamos el body-parser desde la consola con (npm install body-parser)
y llamamos al modulo*/
var bodyParser = require('body-parser');

/*con esto almacenamos el generador del express en una variable, asi le indicamos
en que puerto escucha*/
var app = express();
/*definimos una variable a través de la que va a escuchar el bodyparser*/
var urlencodedParser = bodyParser.urlencoded({extended:false});

/*definimos un procedimiento para llamar a un html creado para la petición post*/
app.get("/", function (request, response) {
	fs.readFile("saludador.html", function (err, data){
		if (err){//si ha habido error y no ha encontrado la página.
			console.log(err);
			response.writeHead(404,{'Content-Type':'text/html'}); //generamos una respuesta
		}else{//si no ha habido error y se ha encontrado la pagina
			response.writeHead(200,{'Content-Type':'text/html'});
			response.write(data.toString()); //enviamos el doc leido como respuesta
		}
		response.end(); //enviamos la respuesta
	})
})

/*definimos la ruta y la llamada que vamos a hacer*/
app.get("/", function (request, response) {
	response.send("Hola con express!");
});

/*posibilidad de recibir un parámetro a través de la url
y poder llamarlo a la respuesta*/
app.get("/users/:nombre", function (request, response) {
	var nombre = request.params.nombre;	//recogemos el nombre que nos dan en la url

	response.send("Hola "+nombre+", con express!");
});

/*posibilidad de recibir peticiones de tipo post, es decir, a través del cuerpo*/
app.post("/users", urlencodedParser, function (request, response) {
	var usuario = request.body.username;
	response.send("Hola "+usuario+", desde petición POST!");
});

/*configuramos el puerto en el que vamos a escuchar*/
app.set('port',process.env.PORT||8081);

/*creamos el servidor y lo iniciamos
le pasamos app y le decimos donde queremos que escuche
port es un atributo de app*/
http.createServer(app).listen(app.get('port'),function(){
	console.log('Express server listening on port '+app.get('port'));
});