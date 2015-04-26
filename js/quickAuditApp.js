var quickAudit = angular.module("quickAudit", ["firebase", "ngRoute"])

.controller("QuickAuditController", function($scope, $route, $routeParams, $location, $firebaseObject) {
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
	
	$scope.start = function() {
		$scope.started = true;
		$location.path("/questions");
	}
	$scope.submit = function() {
		$scope.submitted = true;
		responses.push($scope.response);
		$scope.response = [];
		$location.path("/thankyou");
	}
})

.controller('WelcomeController', function($scope, $routeParams) {
	$scope.name = "WelcomeController";
	$scope.params = $routeParams;
})

.controller('QuestionsController', function($scope, $routeParams) {
	$scope.name = "QuestionsController";
	$scope.params = $routeParams;
})

.controller('ThankyouController', function($scope, $routeParams) {
	$scope.name = "ThankyouController";
	$scope.params = $routeParams;
})

.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/welcome', {
				templateUrl: 'partials/welcome.html',
				controller: 'WelcomeController',
				resolve: {
					delay: function($q, $timeout) {
						var delay = $q.defer();
						$timeout(delay.resolve, 1000);
						return delay.promise;
					}
				}
			})
/*			.when('/', {redirectTo: '/welcome'} )
*/			.when('/questions', {
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