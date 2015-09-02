(function() {
  console.log('loading popup module');
  angular.module('popup', ['commonServices'])

  .controller('SitesCtrl', ['$scope', 'getSites', function($scope, getSites) {
    var promise = getSites;
    promise.then(function(payload) {
      $scope.sites = payload.data;
    });

    $scope.openBackground = function() {
      console.log('opening background');
      chrome.tabs.create({"url": "/components/background/index.html"});
    };
  }])
  ;
})();
