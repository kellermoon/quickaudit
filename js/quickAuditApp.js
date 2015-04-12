var quickAudit = angular.module("quickAudit", ["firebase"]);

quickAudit.controller("quickAuditController", function($scope, $firebaseObject) {
	var quickAuditDataRef = new Firebase("https://quickaudit.firebaseio.com");
	var quickAuditSyncArray = $firebaseObject(quickAuditDataRef);
	
	quickAuditSyncArray.$bindTo($scope, "quickAudit");
	var response = quickAuditDataRef.child("responses");
	
	$scope.started = false;
	$scope.start = function() {
		$scope.started = true;
	}
	$scope.submit = function() {
		$scope.started = false;
		response.push({
			question1: "yes"
		});
	}
});