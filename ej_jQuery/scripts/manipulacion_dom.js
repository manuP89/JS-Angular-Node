/**
*
*/
$(document).ready(inicializaBotones);

function inicializaBotones () {

	$("#vacia_ul").click(function(){
		$("#lista").empty();
	})

	$("#vacia_li").click(function(){
		$("li").empty();
	})

	$("#nuevo_li_fin").click(function(){
		$("#lista").append("<li>Nuevo elemento final</li>");
	})

	$("#nuevo_li_ini").click(function(){
		$("#lista").prepend("<li>Nuevo elemento inicio</li>");
	})

	$("#elimina_ul").click(function(){
		$("#lista").remove();
	})

	$("#elimina_li").click(function(){
		$("li").remove();
	})

	$("#modifica_2").click(function(){
		$("li").eq(1).text("Nuevo texto cambiado");
	})
}