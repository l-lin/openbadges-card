(function() {
	'use strict';
	angular.module('openbadgesApp', ['ngResource']).
	value('OB_USER_API_URL', 'http://beta.openbadges.org/displayer/convert/email').
	controller('appCtrl', function($scope, $resource, OB_USER_API_URL) {
		$scope.email = '';

		$scope.findMyGroups = function findMyGroups() {
			var UserInfo = $resource(OB_USER_API_URL);

			UserInfo.save({email: $scope.email}).$promise.then(function(userInfo) {
				$scope.userId = userInfo.userId;
			});
		};
	});
})();
