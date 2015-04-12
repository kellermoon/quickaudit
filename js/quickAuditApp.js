var quickAudit = angular.module("quickAudit", ["firebase"]);

quickAudit.controller("quickAuditController", function($scope, $firebaseObject) {
	var quickAuditDataRef = new Firebase("https://quickaudit.firebaseio.com");
	var quickAuditSyncArray = $firebaseObject(quickAuditDataRef);
	
	quickAuditSyncArray.$bindTo($scope, "quickAudit");
	var responses = quickAuditDataRef.child("responses");
	
	$scope.response = [];
	quickAuditSyncArray.$loaded().then(function() {
		angular.forEach($scope.quickAudit.questions, function() {
			$scope.response.push("no");
		});
	});
	$scope.started = false;
	$scope.start = function() {
		$scope.started = true;
	}
	$scope.submit = function() {
		$scope.started = false;
		responses.push($scope.response);
		//responses.push("no");
	}
	
});