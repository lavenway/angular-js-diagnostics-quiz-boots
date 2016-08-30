(function() {

	'use strict';

	function ResultsController(quizMetrics, dataService) {

		// VM = Virtual model
		var vm = this;

		//calculate the number of each question answered to determine final output
		function calculateDiagnosticScore(){
			//Loop through all questions in JSON and match score to diagnostic score
			var score = quizMetrics.answerArray;
			var numberOfQuestions = [];
			var matches = [];

			for (var i = 0; i < dataService.JSONDiagnosticResult.length; i++) {
				var matchedScore = dataService.JSONDiagnosticResult[i].score;
				numberOfQuestions.push(matchedScore);

				//console.log(score);

				//console.log(numberOfQuestions);

				for(var j = 0; j < score.length; j++){
	        
	        //If more than one score in the array then we have a tied score
					if(score.length >= 2){
						//console.log('MORE THAN 1');

						//Show the last item in the JSON file
						/*i = dataService.JSONDiagnosticResult.length -1;

						return dataService.JSONDiagnosticResult[i].title,
									 dataService.JSONDiagnosticResult[i].image,
									 dataService.JSONDiagnosticResult[i].description;*/

						var a = 0;
						var	b = 1;
						var	c = 2;
						var	d = 3;

						//SCORE IS TIED AT A & B
						if (score.indexOf(a)+1 && score.indexOf(b)+1) {
        			//console.log('A & B');
        			i = a;
    				}

    				//SCORE IS TIED AT A & C
    				if (score.indexOf(a)+1 && score.indexOf(c)+1) {
        			//console.log('A & C');
        			i = c;
    				}

    				//SCORE IS TIED AT A & D
    				if (score.indexOf(a)+1 && score.indexOf(d)+1) {
        			//console.log('A & D');
        			i = a;
    				}

    				//SCORE IS TIED AT B & C
    				if (score.indexOf(b)+1 && score.indexOf(c)+1) {
        			//console.log('B & C');
        			i = c;
    				}

    				//SCORE IS TIED AT B & D
    				if (score.indexOf(b)+1 && score.indexOf(d)+1) {
        			//console.log('B & D');
        			i = b;
    				}

    				//SCORE IS TIED AT C & D
    				if (score.indexOf(c)+1 && score.indexOf(d)+1) {
        			//console.log('C & D');
        			i = c;
    				}

    				//SCORE IS TIED AT A, B & C
    				if (score.indexOf(a)+1 && score.indexOf(b)+1 && score.indexOf(c)+1) {
        			//console.log('A, B & C');
        			i = a;
    				}

    				//SCORE IS TIED AT A, B & D
    				if (score.indexOf(a)+1 && score.indexOf(b)+1 && score.indexOf(d)+1) {
        			//console.log('A, B & D');
        			i = a;
    				}

    				//SCORE IS TIED AT A, C & D
    				if (score.indexOf(a)+1 && score.indexOf(c)+1 && score.indexOf(d)+1) {
        			//console.log('A, C & D');
        			i = a;
    				}

    				//SCORE IS TIED AT B, C & D
    				if (score.indexOf(b)+1 && score.indexOf(c)+1 && score.indexOf(d)+1) {
        			//console.log('B, C & D');
        			i = c;
    				}

    				return dataService.JSONDiagnosticResult[i].title,
									 dataService.JSONDiagnosticResult[i].image,
									 dataService.JSONDiagnosticResult[i].description;

					}

					//Else determine which final result to display
	        else if(numberOfQuestions[i] === score[j]){
	            matches.push(numberOfQuestions[i]);

	            //console.log(score);

	            return dataService.JSONDiagnosticResult[i].title,
										 dataService.JSONDiagnosticResult[i].image,
										 dataService.JSONDiagnosticResult[i].description;
	        }
	    	}

			}
		}

		//Show question of clicked legend link
		function setActiveQuestion(index){
			vm.activeQuestion = index;
		}

		function reset(){
			quizMetrics.changeState('results', false); 
			//Reset the number of question corrects as we are startin again.
			quizMetrics.numCorrect = 0;
			quizMetrics.answerCount = null;
			quizMetrics.answerArray = [];
			quizMetrics.answermax = null,
			quizMetrics.answerResult = {},
			quizMetrics.duplicateResults = [];

			//Loop through all questions in JSON and reset all flags back to default
			for(var i = 0; i < dataService.JSONQuizData.length; i++){
				var data = dataService.JSONQuizData[i];

				data.selected = null;
				data.correct = null;
			}
		}

		vm.quizMetrics = quizMetrics;
		vm.dataService = dataService;
		vm.reset = reset;
		vm.setActiveQuestion = setActiveQuestion;
		vm.calculateDiagnosticScore = calculateDiagnosticScore;
		vm.activeQuestion = 0;

	}

	angular
		.module('quizFramework')
		.controller('resultsCtrl', ResultsController);

	ResultsController.$inject = ['quizMetrics', 'dataService'];

})();