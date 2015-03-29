var quickAudit = angular.module("quickAudit", ["firebase"]);

quickAudit.controller("quickAuditController", function($scope, $firebaseObject) {
  var quickAuditDataRef = new Firebase("https://quickaudit.firebaseio.com");
  var quickAuditSyncObject = $firebaseObject(quickAuditDataRef);

  quickAuditSyncObject.$bindTo($scope, "quickAudit");
});



/* Sample Questions

[
	{
		q: "What do you think?",
		a: null
	},
		{
		q: "What do you know?",
		a: null
	},	{
		q: "What have you heard?",
		a: null
	}
]

*/