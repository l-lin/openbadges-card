(function() {
    'use strict';
    angular.module('openbadgesCard', ['ngRoute', 'ngResource']).
    value('OB_GROUPS_URL_API', 'http://beta.openbadges.org/displayer/:userId/groups.json').
    value('OB_URL_API', 'http://beta.openbadges.org/displayer/:userId/group/:groupId.json').
    config(function($routeProvider) {
        $routeProvider.when('/displayer/:userId/group/:groupId', {
            templateUrl: 'src/openbadges-card.html',
            controller: 'obCtrl'
        }).
        otherwise({
            templateUrl: 'src/openbadges-error.html'
        });
    }).
    controller('obCtrl', function($q, $scope, $routeParams, $resource, $location, OB_URL_API, OB_GROUPS_URL_API) {
        var userId = parseInt($routeParams.userId, 10),
            groupId = parseInt($routeParams.groupId, 10),
            GroupsInfo = $resource(OB_GROUPS_URL_API, {
                userId: '@id'
            }),
            BadgeInfo = $resource(OB_URL_API, {
                userId: '@id',
                groupId: '@id'
            });

        $scope.names = '';
        $scope.badges = [];

        $q.all([
            GroupsInfo.get({
                userId: userId
            }).$promise,
            BadgeInfo.get({
                userId: userId,
                groupId: groupId
            }).$promise
        ]).then(function(result) {
            var groups = result[0].groups,
                badges = result[1].badges;
            for (var i = 0; i < groups.length; i++) {
                if (groups[i].groupId === groupId) {
                    $scope.name = groups[i].name;
                }
            }
            $scope.badges = badges;
        }, function(err) {
            $location.path('/error');
        });
    });
})();
