/**
*
*/
$(document).ready(inicio);

function inicio () {
	
	var $h1 = $("h1");
	console.log($h1.text());
	$h1.text("Texto alternativo - Funciones principales JQuery");

	var $form = $("#miform");
	console.log($form.attr("action"));
	$form.attr("action","final.php");
	console.log($form.attr("action"));
	$form.removeAttr("action");

	var $parrafo = $(".clase1");
	$parrafo.addClass("clase2");
	console.log($parrafo.attr("class"));
	$parrafo.removeClass("clase1");
	console.log($parrafo.attr("class"));

	$form.html("<input type='text' placeholder='esto es la polla'></input>");


//	for(var i=0;i<500;i++){
		var $img = $("#juegotronos");
/*		$img.hide("slow");
		$img.show("slow");
		$img.fadeOut(300);
		$img.fadeIn(300);
		$img.fadeTo(3000, 0.5);
	}
*/
	var $interruptor = $("#interruptor");
	$interruptor.click(function(){$img.toggle()})
}