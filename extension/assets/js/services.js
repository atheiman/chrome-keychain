(function() {
  angular.module('commonServices', [])

  .factory('getSites', ['$http', function($http) {
    return $http.get('fake-sites.json');
  }])
  ;
})();
