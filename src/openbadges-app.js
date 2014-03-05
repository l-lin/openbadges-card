(function() {
	'use strict';
	angular.module('openbadgesApp', ['ngResource']).
	value('OB_GROUPS_API_URL', 'http://beta.openbadges.org/displayer/:userId/groups.json').
	controller('appCtrl', function($scope, $resource, OB_GROUPS_API_URL) {
		$scope.userId = '';

		$scope.findMyGroups = function findMyGroups() {
			var UserInfo = $resource(OB_GROUPS_API_URL, {userId: '@id'});

			UserInfo.get({userId: $scope.userId}).$promise.then(function(groupsInfo) {
				$scope.groups = groupsInfo.groups;
			});
		};
	});
})();
