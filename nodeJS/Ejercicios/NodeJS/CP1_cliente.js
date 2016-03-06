
var http = require('http');

var opciones = {
		host: "localhost",
		port: "8081",
		path: "/index.html"
		};

var callback = function (response) {
	var body = "";

	response.on("data", function (data) {
		body += data;
	})

	response.on("end", function () {
		console.log(body);
	})
}

var request = http.request(opciones,callback);
request.end();