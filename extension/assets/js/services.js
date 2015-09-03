(function() {
  angular.module('commonServices', [])

  .factory('getSites', ['$http', function($http) {
    return $http.get('/assets/js/fake-sites.json');
  }])
  ;
})();
