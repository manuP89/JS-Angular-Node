/**
*
*/
$(document).ready(inicializaBotones);

function inicializaBotones () {

	$("#boton1").click(function(){
		$("#lista").empty();
	})

	$("#boton3").click(function(){
		$("#lista").append("<li>Nuevo elemento final</li>");
	})

	$("#boton4").click(function(){
		$("#lista").prepend("<li>Nuevo elemento inicio</li>");
	})

	$("#boton5").click(function(){
		$("li").last().remove();
	})

	$("#boton6").click(function(){
		$("li").first().remove();
	})

}