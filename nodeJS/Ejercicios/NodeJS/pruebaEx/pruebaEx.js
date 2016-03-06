/*llamar a los módulos*/
var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');

/*definimos la aplicacion*/
var app = express();
/*definimos una variable a través de la que va a escuchar el bodyparser*/
var urlencodedParser = bodyParser.urlencoded({extended:false});

/*creamos el servidor y configuramos el puerto en el que vamos a escuchar*/
app.set('port',process.env.PORT||8081);//siempre tenemos que definir antes el puerto!!!CAPULLO!!!!!!
http.createServer(app).listen(app.get('port'),function(){
	console.log('Express server listening on port '+app.get('port'));
});

/*definimos un procedimiento para llamar a un html creado para la petición post*/
app.get("/", function (request, response) {
	fs.readFile("pruebaEx.html", function (err, data){
		if (err){//si ha habido error y no ha encontrado la página.
			console.log(err);
			response.writeHead(404,{'Content-Type':'text/html'}); //generamos una respuesta
		}else{//si no ha habido error y se ha encontrado la pagina
			response.writeHead(200,{'Content-Type':'text/html'});
			response.write(data.toString()); //enviamos el doc leido como respuesta
		}
		response.end(); //enviamos la respuesta
	});
});

/*definimos un procedimiento get para listar el objeto json
el objeto json debe estar guardado en la misma carpeta de directorio*/
app.get("/listar", function (request, response){
	fs.readFile("libreria.json", function (err, data) {
		if (err){
			console.log(err);
			response.writeHead(404,{'Content-Type':'text/html'});
		}else{
			response.writeHead(200,{'Content-Type':'text/html'});	
			response.write(data.toString());
		}
		response.end();
	});
});

/*definimos un procedimiento post para añadir un libro desde el formulario
*/
app.post("/add", urlencodedParser, function (request,response) {
	var ident = request.body.ident;//creamos variables con los valores del formulario
	var tit = request.body.titulo;
	var aut = request.body.autor;
	var libro ={id: ident, titulo: tit, autor: aut};//definimos el libro que queremos crear
	fs.readFile("libreria.json", function (err, data) {//leemos el archivo JSON
		if (err){
			console.log(err);
			response.writeHead(404,{'Content-Type':'text/html'});
		}else{	
			var libreria = JSON.parse(data.toString());//convertimos el archivo a cadena de texto
			libreria["libro"+ident] = libro;//añadimos el libro creado a nuestro objeto JSON
			libreria = JSON.stringify(libreria);//volvemos a convertir el objeto JSON de cadena a JSON
			fs.writeFile("libreria.json", libreria, function (){});//reescribimos el archivo ya completo
			response.send("El libro ha sido añadido");
		}
		response.end();	
	});
});

app.get("/libro/:ident", function (request, response) {
	var ident = request.params.ident;
	fs.readFile("libreria.json", function (err, data) {
		if (err){
			console.log(err);
		}else{
					
			var libreria = JSON.parse(data.toString());
			var libro = libreria["'libro'+ident"];
			libro = JSON.stringify(libro)	
			response.send(data.toString());
		}
		response.end();
	});
});
