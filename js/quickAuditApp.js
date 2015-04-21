var quickAudit = angular.module("quickAudit", ["firebase"]);

quickAudit.controller("QuickAuditController", function($scope, $firebaseObject) {
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
});