/**
*
*/
$(document).ready(inicio);

function inicio () {
	
	var $lista1 = $("#lista1 li");
	$lista1.each(mostrar_consola);

	function mostrar_consola(){
		var x=$(this);

		console.log(x.text());
	}

}