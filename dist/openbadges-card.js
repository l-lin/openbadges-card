/*!
 * openbadges-card - v0.0.1
 * https://github.com/l-lin/openbadges-card
 */
/*!
 * openbadges-card - v0.0.1
 * https://github.com/l-lin/openbadges-card
 */
(function () {
  'use strict';
  angular.module('openbadgesCard', [
    'ngRoute',
    'ngResource'
  ]).value('OB_GROUPS_URL_API', 'http://beta.openbadges.org/displayer/:userId/groups.json').value('OB_URL_API', 'http://beta.openbadges.org/displayer/:userId/group/:groupId.json').config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/displayer/:userId/group/:groupId', {
        templateUrl: 'src/openbadges-card.html',
        controller: 'obCtrl'
      }).otherwise({ templateUrl: 'src/openbadges-error.html' });
    }
  ]).controller('obCtrl', [
    '$q',
    '$scope',
    '$routeParams',
    '$resource',
    '$location',
    'OB_URL_API',
    'OB_GROUPS_URL_API',
    function ($q, $scope, $routeParams, $resource, $location, OB_URL_API, OB_GROUPS_URL_API) {
      var userId = parseInt($routeParams.userId, 10), groupId = parseInt($routeParams.groupId, 10), GroupsInfo = $resource(OB_GROUPS_URL_API, { userId: '@id' }), BadgeInfo = $resource(OB_URL_API, {
          userId: '@id',
          groupId: '@id'
        });
      $scope.names = '';
      $scope.badges = [];
      $q.all([
        GroupsInfo.get({ userId: userId }).$promise,
        BadgeInfo.get({
          userId: userId,
          groupId: groupId
        }).$promise
      ]).then(function (result) {
        var groups = result[0].groups, badges = result[1].badges;
        for (var i = 0; i < groups.length; i++) {
          if (groups[i].groupId === groupId) {
            $scope.name = groups[i].name;
          }
        }
        $scope.badges = badges;
      }, function () {
        $location.path('/error');
      });
    }
  ]);
}());
angular.module('openbadgesCard').run([
  '$templateCache',
  function ($templateCache) {
    'use strict';
    $templateCache.put('src/openbadges-card.html', '<article class="ob-group ob-default" ng-cloak>\r' + '\n' + '\t<header class="ob-header">\r' + '\n' + '\t\t<span class="ob-mozilla">\r' + '\n' + '\t\t\t<a href="https://backpack.openbadges.org/" target="_blank">\r' + '\n' + '\t\t\t\t<img src="images/openbadges-icon.png" title="Mozilla Backpack" />\r' + '\n' + '\t\t\t</a>\r' + '\n' + '\t\t</span>\r' + '\n' + '\t\t<label class="ob-label">{{ name }}</label>\r' + '\n' + '\t</header>\r' + '\n' + '\t<div class="ob-img clear">\r' + '\n' + '\t\t<a ng-repeat="badge in badges | limitTo:3" href="{{ badge.assertion.badge.criteria }}" target="_blank">\r' + '\n' + '\t\t\t<img class="faa-float animated-hover" src="{{ badge.imageUrl }}" width="64px" title="{{ badge.assertion.badge.name }}" />\r' + '\n' + '\t\t</a>\r' + '\n' + '\t</div>\r' + '\n' + '</article>');
    $templateCache.put('src/openbadges-error.html', '<article class="ob-group ob-danger" ng-cloak>\r' + '\n' + '\t<header class="ob-header">\r' + '\n' + '\t\t<span class="ob-mozilla">\r' + '\n' + '\t\t\t<a href="https://backpack.openbadges.org/">\r' + '\n' + '\t\t\t\t<img src="images/openbadges-icon.png" title="Mozilla Backpack" />\r' + '\n' + '\t\t\t</a>\r' + '\n' + '\t\t</span>\r' + '\n' + '\t\t<label class="ob-label ob-danger">Error! <i class="fa fa-frown-o"></i></label>\r' + '\n' + '\t</header>\r' + '\n' + '\t<section class="ob-report">\r' + '\n' + '\t\t<a href="https://github.com/l-lin/openbadges-card/issues" class="btn btn-danger" target="_blank">\r' + '\n' + '\t\t\tPlease report the <i class="fa fa-bug"></i>!\r' + '\n' + '\t\t</a>\r' + '\n' + '\t</section>\r' + '\n' + '</article>');
  }
]);