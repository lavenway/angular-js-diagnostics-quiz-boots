(function() {

	'use strict';

	function QuizController(quizMetrics, dataService) {
		// VM = Virtual model
		var vm = this,
				currentProgress = 1,
				numQuestionsAnswered = 0;

		//if the back button is clicked determine if we can go back and hide the button accordingly
		function backQuestion(index){

			vm.activeQuestion--;
			numQuestionsAnswered--;
			currentProgress--;

			vm.backProgress();

			dataService.JSONQuizData[vm.activeQuestion].selected = null;

			/*console.log('SELECTED' + dataService.JSONQuizData[vm.activeQuestion].selected);

			console.log('BACK - ACTIVE QUESTION' + vm.activeQuestion);

			console.log('BACK - NO QUESTIONS ANSWERED' + numQuestionsAnswered);*/

			if(vm.activeQuestion < 1){
				vm.back = false;
			}

		}

		//Set the selected answer to the index of the question
		function selectAnswerClass(index){
			dataService.JSONQuizData[vm.activeQuestion].selected = index;

			console.log(index);

			console.log(dataService.JSONQuizData[vm.activeQuestion].selected);
		}

		//if this function is running then not all questions have been answered so go to the next unanswered question
		function setActiveQuestion(index){
			if(index === undefined){
				//Take one off the length to match number of questions, array starts at 0
				var quizLength = dataService.JSONQuizData.length - 1;

				/*console.log('FORWARD - SET ACTIVE QUESTION' + vm.activeQuestion);*/

				vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;
			} else {
				vm.activeQuestion = index;
			}

		}


		function questionAnswered(index){

			var quizLength = dataService.JSONQuizData.length;

			dataService.JSONQuizData[vm.activeQuestion].selected = index;

			vm.back = true;

			/*console.log('FORWARD - NO QUESTIONS ANSWERED' + numQuestionsAnswered);*/

			//If the current question has been answered increment the number of total questions
			if(dataService.JSONQuizData[vm.activeQuestion].selected !== null){
				numQuestionsAnswered++;


				if(numQuestionsAnswered >= quizLength){
					//finish quiz
					for(var i = 0; i < quizLength; i++){
						if(dataService.JSONQuizData[i].selected === null){
							setActiveQuestion(i);
							return;
						}
					}
					finaliseAnswers();
					return;
				}

			}
			vm.setActiveQuestion();
			currentProgress++;
			vm.forwardProgress();

		}

		//Update the progress bar class
		function backProgress(){

			//console.log('BACK UPDATING PROGRESS');
			
			var progressBarPosition = document.querySelectorAll('.progressBtn'),
					findClassname = 'btn-progress';

			//console.log('BACK Current progress: ' + currentProgress);
			//console.log('BACK Current QUESTION: ' + vm.activeQuestion);

			[].forEach.call(progressBarPosition, function(findClassname) {
				findClassname.className = findClassname.className.replace(' btn-progress','');
			});

		}

		//Update the progress bar class
		function forwardProgress(){

			//console.log('FORWARD UPDATING PROGRESS');

			var progressBarPosition = document.querySelectorAll('.progressBtn'),
					quizLength = dataService.JSONQuizData.length;

			//console.log('FORWARD Current progress: ' + currentProgress);
			//console.log('FORWARD Current QUESTION: ' + vm.activeQuestion);

			for(var i = 0; i < quizLength; i++){
				if(currentProgress >= vm.activeQuestion){
					
					for(var j = 0; j < currentProgress; j++){

						//console.log(j);

						if(!progressBarPosition[j].className.match('btn-progress')) { 

							//progressBarPosition[j].style.backgroundColor = "green";

							progressBarPosition[j].className += ' btn-progress';
						}

					}

				}
			}

		}

		function resetProgressBar(){
			var progressBarPosition = document.querySelectorAll('.progressBtn'),
					findClassname = 'btn-progress';

			[].forEach.call(progressBarPosition, function(findClassname) {
				findClassname.className = findClassname.className.replace(' btn-progress','');
			});
		}

		function resetScrollBarPosition(){
			$('.diagnostic-quiz .inner-container').mCustomScrollbar('scrollTo','top');
		}


		//Reset everything
		function finaliseAnswers(){
			vm.back = false;
			currentProgress = 1;
			vm.resetProgressBar();
			numQuestionsAnswered = 0;
			vm.activeQuestion = 0;
			quizMetrics.reviewQuiz();
			quizMetrics.changeState('quiz', false);
			//trigger the results page
			quizMetrics.changeState('results', true);
		}

		//GIVE ACCESS TO QUIZMETRICS IN QUIZ CONTROLLER & BIND TO VM
		vm.quizMetrics = quizMetrics;
		//Get access to dataService object in our view
		vm.dataService = dataService;
		//Named function syntax
		vm.questionAnswered = questionAnswered;
		//Set the active question
		vm.setActiveQuestion = setActiveQuestion;
		//Set the answer class on the submit button
		vm.selectAnswerClass = selectAnswerClass;
		//Go back a question
		vm.backQuestion = backQuestion;
		//Finalise answers
		vm.finaliseAnswers = finaliseAnswers;
		//Set the starting question
		vm.activeQuestion = 0;
		//Back link after first question answered
		vm.back = false;
		//Update the progress when clicking back
		vm.backProgress = backProgress;
		//Update the progress when going forward
		vm.forwardProgress = forwardProgress;
		//Reset the progress bar
		vm.resetProgressBar = resetProgressBar;
		//Reset the scrollbar position
		vm.resetScrollBarPosition = resetScrollBarPosition;
	}

	angular
		.module('quizFramework')
		.controller('quizCtrl', QuizController)
		.filter('character',function(){
	    return function(input){
	        return String.fromCharCode(64 + parseInt(input,10));
	    };
		});

	QuizController.$inject = ['quizMetrics', 'dataService'];

})();