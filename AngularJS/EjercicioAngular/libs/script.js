


var app= angular.module("MyApp",[]);
app.controller("controlador",function($scope){
	
	//Contador de respuestas correctas
	$scope.respCorrect=0
	
	/*Creamos el objeto de 3 preguntas y 2 respuestas cada pregunta
	Cada respuesta lleva un atributo "correct" que indica si es la correcta y un atributo
	"status" asociado al checkbox de manera que si cambia el checkbox, cambia "status" */
	
	$scope.questions=[{texto:"Pregunta 1",
		resp:[
		      {respuesta:"Loquesea",correct:true,status:false},
		      {respuesta:"Otracosa",correct:false,status:false}
		      ]
		},
		{texto:"Pregunta 2",
			resp:[
			      {respuesta:"Loquesea",correct:true,status:false},
			      {respuesta:"Otracosa",correct:false,status:false}
			      ]
		},
		{texto:"Pregunta 3",
				resp:[
				      {respuesta:"Loquesea",correct:true,status:false},
				      {respuesta:"Otracosa",correct:false,status:false}
				     ]
		}
			
		]
	
	/*Función de validación, se activa cada vez que cambia un checkbox y comprueba que
	el atributo "correct" coincide con el atributo "status" sumando o restando puntos en consecuencia*/
	$scope.validate=function (b){
				var val=b
					if (b.correct==b.status){
						$scope.respCorrect++;
					}
					if (b.correct!=b.status){
					$scope.respCorrect--;
					}		
	}
})