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
	$scope.response = [];

	$scope.start = function() {
		$scope.started = true;
	}
	$scope.submit = function() {
		$scope.started = false;
		responses.push($scope.response);
		$scope.response = [];
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

.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/welcome', {
    templateUrl: '/quickaudit/partials/welcome.html',
    controller: 'WelcomeController',
    resolve: {
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 1000);
        return delay.promise;
      }
    }
  })
  .when('/questions', {
    templateUrl: '/quickaudit/partials/questions.html',
    controller: 'QuestionsController'
  })
  .when('/thankyou', {
    templateUrl: '/quickaudit/partials/thankyou.html',
    controller: 'ThankyouController'
  })
 .otherwise({redirectTo: '/welcome'});
 
  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});