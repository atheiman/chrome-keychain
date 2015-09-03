(function() {
  angular.module('keychain', ['commonServices'])

  .controller('SitesCtrl', ['$scope', 'getSites', function($scope, getSites) {
    var promise = getSites;
    promise.then(function(payload) {
      $scope.sites = payload.data;
    })
  }])
  ;
})();
