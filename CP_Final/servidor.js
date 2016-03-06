/*Definimos los módulos que se van a usar*/
var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var cadena;
var urlencodedParser = bodyParser.urlencoded({extended:false});

/*Definimos procedimiento para llamar al html.
Devuelve el html visto en el enunciado al navegador*/
app.get("/", function (request, response) {
	fs.readFile("index.html", function (err, data){
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

/*Definimos procedimiento para listar el objeto json.
Devuelve la lista de todos los productos como texto plano*/
app.get("/list", function (request, response){
	fs.readFile("catalogo.json", function (err, data) {
		var lista = JSON.parse(data);
		if (err){
			console.log(err);
			response.writeHead(404,{'Content-Type':'text/html'});
		}else{
			response.writeHead(200,{'Content-Type':'text/html'});	
			response.write(JSON.stringify(lista));
		}
		response.end();
	});
});

/*Definimos un procedimiento post para añadir un producto desde el formulario.
Recibe la petición post del formulario con los datos de un producto, 
crea el producto y lo mete en la lista, para devolver toda la lista de 
productos de nuevo al navegador como texto plano.*/
function disponible (disp){
	if(disp){
		dispon = true;
	}else{
		dispon = false;
	}
	return dispon;
}
app.post("/add", urlencodedParser, function (request,response) {
	fs.readFile("catalogo.json", function (err, data) {
		if (err){
			console.log(err);
			response.writeHead(404,{'Content-Type':'text/html'});
		}else{
			cadena = data.toString();
			var producto ={"id": request.body.identificador, "nombre": request.body.nombre, "precio": request.body.precio, "disponible": disponible(request.body.disponible)};	
			var catalogo = JSON.parse(cadena);
			catalogo["producto"+request.body.identificador] = producto;
			fs.writeFile("catalogo.json", JSON.stringify(catalogo));
			response.write(JSON.stringify(catalogo));
		}
		response.end();	
	});
});

/*Eliminar un producto por su id
Borra un elemento de la lista a través de su ID y devuelve la lista de todos los productos como texto plano. */
app.get("/delete/:id", urlencodedParser, function (request, response) {
	fs.readFile("catalogo.json", function (err, data) {
		var identificador = request.params.id;
		if (err){
			console.log(err);
			response.writeHead(404,{'Content-Type':'text/html'});
		}else{
		cadena = data.toString();
		var catalogo = JSON.parse(cadena);
		delete catalogo["producto"+identificador];
		fs.writeFile("catalogo.json", JSON.stringify(catalogo));
		response.send("El producto ha sido eliminado");
		}
	response.end();
	});
});

/*ver un producto concreto por su id.
Selecciona un producto a través de su ID y lo devuelve como texto plano.*/
app.get('/seleccion/:id', function(req,res) {
  fs.readFile("catalogo.json", function(err,data) {
    var lista = JSON.parse(data);
    var identificador = req.params.id;
    if(err){
    	console.log(err);
    	res.writeHead(404, {"Content-Type": "text/html"});
    } else {
    	res.writeHead(200, {"Content-Type": "text/html"});
    	res.write(JSON.stringify(lista["producto"+identificador]));
    };
    res.end();
  });
});

/*Definimos procedimiento para las rutas que no existen.
Nos saca la cadena de texto: “No existe tal ruta”.*/
app.get("/*", function (request, response) {
	fs.readFile("index.html", function (){
		response.writeHead(200,{'Content-Type':'text/html'});
		response.write("No existe tal ruta");
		response.end();
	});
});

/*creamos el servidor y configuramos el puerto en el que vamos a escuchar*/
app.set('port',process.env.PORT||8081);
http.createServer(app).listen(app.get('port'),function(){
	console.log('Express server listening on port '+app.get('port'));
});