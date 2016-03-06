/**
*
*/
$(document).ready(inicializa);

function inicializa () {

	$("input").focus(function(){
		$(this).css('color','red');
	})

	$("input").blur(function(){
		$(this).css('color','black');
	})
	
	$("#boton").click(resaltar);

}

function resaltar(){
	$("p").each(pintar)
}

function pintar(){
	var parrafo=$(this);
	var longitud=parrafo.text().length;

	if(longitud>100){
		parrafo.css('color','orange');
	}
}