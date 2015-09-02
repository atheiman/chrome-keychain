(function() {
  angular.module('keychain', [])

  .factory('getSites', ['$http', function($http) {
    return $http.get('fake-sites.json');
  }])

  .controller('SitesCtrl', ['$scope', 'getSites', function($scope, getSites) {
    var promise = getSites;
    promise.then(function(payload) {
      $scope.sites = payload.data;
    })
  }])
  ;
})();
