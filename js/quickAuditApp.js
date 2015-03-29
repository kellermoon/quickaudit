var quickAudit = angular.module("quickAudit", ["firebase"]);

quickAudit.controller("quickAuditController", function($scope, $firebaseObject) {
	var quickAuditDataRef = new Firebase("https://quickaudit.firebaseio.com");
	var quickAuditSyncObject = $firebaseObject(quickAuditDataRef);
	
	quickAuditSyncObject.$bindTo($scope, "quickAudit");
	
	$scope.started = false;
	
	$scope.start = function() {
		$scope.started = true;
	}
	
	$scope.submit = function() {
		$scope.started = false;
	}
});