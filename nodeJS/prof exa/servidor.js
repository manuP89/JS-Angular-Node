var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var fs = require('fs');

var cadena;

var app = express();

// funcionalidad post
var urlencodedParser = bodyParser.urlencoded({extended: false});


app.get('/', function(req,res) {
  // acabando de arrancar vamos al html definido
    fs.readFile("index.html", function(err,data) {
      if(err){
        console.log(err);
        res.writeHead(404, {"Content-Type": "text/html"});
      } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data.toString());
      };
      res.end();
    });
});

app.get('/listar', function(req,res) {
  fs.readFile("catalogo.json", function(err,data) {
    var listaCompleta = JSON.parse(data);
    if(err){
      console.log(err);
      res.writeHead(404, {"Content-Type": "text/html"});
    } else {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(JSON.stringify(listaCompleta));
      console.log(listaCompleta);
    };
    res.end();
  });
});

// añadir libros
app.post('/add', urlencodedParser, function(req, res) {
  fs.readFile("catalogo.json", function(err,data) {
    if(err){
      console.log(err);
      res.writeHead(404, {"Content-Type": "text/html"});
    } else {
      cadena = data.toString();
      var libro = {"id": req.body.id, "titulo": req.body.titulo, "autor": req.body.autor};
      var libreria = JSON.parse(cadena);
      libreria["libros"+req.body.id]=libro;
      fs.writeFile("catalogo.json", JSON.stringify(libreria));
    };
  });
  res.end();
});

// eliminar libros
app.post('/delete', urlencodedParser, function(req, res) {
  fs.readFile("catalogo.json", function(err,data) {
    if(err){
      console.log(err);
      res.writeHead(404, {"Content-Type": "text/html"});
    } else {
      cadena = data.toString();
      var libreria = JSON.parse(cadena);
      delete libreria["libros"+req.body.id];
      fs.writeFile("catalogo.json", JSON.stringify(libreria));
    };
  });
  res.end();
});

// ver un libro concreto por su id
app.get('/libro/:id', function(req,res) {
  fs.readFile("catalogo.json", function(err,data) {
    var listaCompleta = JSON.parse(data);
    var identificador = req.params.id;
    if(err){
      console.log(err);
      res.writeHead(404, {"Content-Type": "text/html"});
    } else {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(JSON.stringify(listaCompleta["libros"+identificador]));
    };
    res.end();
  });
});


app.set('port', process.env.PORT || "3000");

http.createServer(app).listen(app.get("port"), function() { //mensaje al arrancar
  console.log("Express escuchando! en " + app.get("port"));
});
