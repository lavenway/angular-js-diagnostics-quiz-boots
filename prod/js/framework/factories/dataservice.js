(function() {

	'use strict';

	function DataFactory($http) {

		/*var urlBase = 'http://www.json-generator.com/api/json/get/bQkWdPSKMi?indent=2';*/
		/*var urlBase = 'HTMLResources/json/quiz-data.json?callback=JSON_CALLBACK';*/ 
		var urlBase = document.getElementById('jsonURL').title;

		console.log(urlBase);

		var JSONQuizData = [];
		var JSONDiagnosticResult = [];

		var dataObj = {
			JSONQuizData: JSONQuizData,
			JSONDiagnosticResult: JSONDiagnosticResult
		};

    $http.get(urlBase).success(function(data) {
        dataObj.JSONQuizData = data.JSONQuizData,
        dataObj.JSONDiagnosticResult = data.JSONDiagnosticResult;
    });

  	return dataObj;
	}

	angular
		.module('quizFramework')
		.factory('dataService', DataFactory);

	DataFactory.$inject = ['$http'];
		
})();