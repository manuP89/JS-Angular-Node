

var app=angular.module("miApp",[]);
app.controller('miControlador', function ($scope){
	
	$scope.contador=0;
	$scope.questions=[
				{text:'El perro...', 
				id:1, 
				correcta:1,
				status:"",
				userAnswer: null,
				answers:[
					{id:1, text:'ladra'}, 
					{id:2, text:'muge'}, 
					{id:3, text:'bala'}]},
	 			{text:'La vaca...', 
	 			id:2, 
	 			correcta:2,
	 			status:"",
	 			userAnswer: null,
	 			answers:[
	 				{id:1, text:'ladra'}, 
	 				{id:2, text:'muge'}, 
	 				{id:3, text:'bala'}]},
				{text:'La oveja...', 
				id:3,
				correcta:3,
				status:"",
				userAnswer: null, 
				answers:[
					{id:1, text:'ladra'}, 
					{id:2, text:'muge'}, 
					{id:3, text:'bala'}]}];
	
	$scope.validar= function(question){
		/*si la eleccion del usuario es igual a la resp correcta
		se suma 1 al contador y se cambia el status de la pregunta a ok.
		si no, se cambia el status a ko. si la pregunta ya ha sido contestada,
		tendra status ok, asiq si se cambia la elección, se borra uno al contador.
	*/	if (question.correcta==question.userAnswer){
			$scope.contador++; 
			question.status='ok';
		} else {
			if (question.status == 'ok' && $scope.contador > 0) {
                $scope.contador --;
            }
			question.status='ko'
		}
	}

})

