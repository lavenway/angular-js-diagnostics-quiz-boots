(function() {

	'use strict';

	function QuizMetrics(dataService) {

		function changeState(metric, state){
			if(metric === 'quiz'){
				quizObj.quizActive = state;
			} else if(metric === 'results') {
				quizObj.resultsActive = state;
			} else {
				return false;
			}		
		}

		//Count duplicate values and push into empty array
	  function finaliseResult(){

	  	quizObj.answerArray = [];

			for (var key in quizObj.duplicateResults) {
			    if (quizObj.duplicateResults.hasOwnProperty(key)) {
			      quizObj.answerArray.push(parseInt(quizObj.duplicateResults[key]));
			    }
			}

			//console.log(quizObj.answerArray);
	  }

		//Count each answer type
		function countAnswers() {

			for(var i = 0; i < quizObj.answerArray.length; ++i) {
			    if(!quizObj.answerResult[quizObj.answerArray[i]]) {
			    	quizObj.answerResult[quizObj.answerArray[i]] = 0;
			    }
			    ++quizObj.answerResult[quizObj.answerArray[i]];
			}

			//Find the highest value in the results array
			quizObj.answermax = Math.max.apply(null,Object.keys(quizObj.answerResult).map(function(x){ return quizObj.answerResult[x]; }));
			
			//Filter duplicate results
			quizObj.duplicateResults = Object.keys(quizObj.answerResult).filter(function(x){ return quizObj.answerResult[x] == quizObj.answermax; });

			//console.log(quizObj.answerResult);
			//console.log(quizObj.duplicateResults);
			//console.log(quizObj.answermax);

			finaliseResult();

	  }

		//Collate the answers
		function reviewQuiz(){
			for(var i = 0; i < dataService.JSONQuizData.length; i++){
	    	quizObj.answerArray.push(dataService.JSONQuizData[i].selected);

	    	//console.log(quizObj.answerArray);
		  }

		  countAnswers();
		}


		var quizObj = {
			quizActive: false,
			resultsActive: false,
			changeState: changeState,
			answerArray: [],
			reviewQuiz: reviewQuiz,
			numCorrect: 0,
			answermax: null,
			answerResult: {},
			duplicateResults: []
		};

		return quizObj;

	}

	angular
		.module('quizFramework')
		.factory('quizMetrics', QuizMetrics);

	QuizMetrics.$inject = ['dataService'];
		
})();