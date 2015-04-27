var quickAudit = angular.module("quickAudit", ["firebase", "ngRoute"])

.controller("QuickAuditController", function($rootScope, $scope, $route, $routeParams, $location, $firebaseObject) {
	
	$rootScope.validQuestionsForm = false;
	
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;

	var quickAuditDataRef = new Firebase("https://quickaudit.firebaseio.com");
	var quickAuditSyncArray = $firebaseObject(quickAuditDataRef);
	var responses = quickAuditDataRef.child("responses");

	quickAuditSyncArray.$bindTo($scope, "quickAudit");

	$scope.started = false;
	$scope.submitted = false;
	$scope.response = [];
	$scope.btnContent = {}

	function setBtnContent() {
		var path = $location.path();
		switch(path) {
			case "/welcome":
				$scope.btnContent.text = "start";
				$scope.btnContent.href = "/questions";
				break;
			case "/questions":
				$scope.btnContent.text = "submit";
				$scope.btnContent.href = "/thankyou";
				break;
			case "/thankyou":
				$scope.btnContent.text = "done";
				$scope.btnContent.href = "/welcome";
				break;
			default:
				{}
		}
	}
	
	$scope.onClickBtn = function() {
		$location.path($scope.btnContent.href);
		if($scope.btnContent.text == "submit") {
			$scope.submitted = true;
			responses.push($scope.response);
			$scope.response = [];
		}
	}
	
	$scope.$on('$viewContentLoaded', function(){
		setBtnContent();
	});
	
	
	
})

.controller('WelcomeController', function($scope) {})

.controller('QuestionsController', function($rootScope, $scope) {
	$scope.$watch('questions.$valid', function(newVal) {
		$rootScope.validQuestionsForm = newVal;
	})					
})

.controller('ThankyouController', function($scope) {})

.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/welcome', {
				templateUrl: 'partials/welcome.html',
				controller: 'WelcomeController'
			})
			.when('/questions', {
				templateUrl: 'partials/questions.html',
				controller: 'QuestionsController'
			})
			.when('/thankyou', {
				templateUrl: 'partials/thankyou.html',
				controller: 'ThankyouController'
			})
			.otherwise(
				{redirectTo: '/welcome'}
			);
	}]);