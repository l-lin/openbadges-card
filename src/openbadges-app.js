(function() {
	'use strict';
	angular.module('openbadgesApp', ['ngResource']).
	value('OB_GROUPS_API_URL', 'http://beta.openbadges.org/displayer/:userId/groups.json').
	controller('appCtrl', function($scope, $resource, OB_GROUPS_API_URL) {
		$scope.currentStep = 1;

		$scope.isActive = function isActive(step) {
			return $scope.currentStep === step;
		};

		$scope.findMyGroups = function findMyGroups() {
			var UserInfo = $resource(OB_GROUPS_API_URL, {userId: '@id'});

			UserInfo.get({userId: $scope.userId}).$promise.then(function(groupsInfo) {
				$scope.groups = groupsInfo.groups;
				$scope.currentStep = 2;
			});
		};

		$scope.selectGroup = function selectGroup(groupId) {
			$scope.groupId = groupId;
			$scope.currentStep = 3;
		};

		$scope.accessToStep = function accessToStep(step) {
			switch (step) {
			case 1:
				$scope.currentStep = 1;
				break;
			case 2:
				if ($scope.userId) {
					$scope.currentStep = 2;
				}
				break;
			case 3:
				if ($scope.userId && $scope.groupId) {
					$scope.currentStep = 3;
				}
				break;
			}
		};
	});
})();
