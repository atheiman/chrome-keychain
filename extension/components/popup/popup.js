(function () {
  angular.module('popup', ['commonServices'])

  .controller('SitesCtrl', ['$scope', 'getSites', function ($scope, getSites) {
    var promise = getSites;
    promise.then(function (payload) {
      $scope.sites = payload.data;
    });

    $scope.openBackground = function () {
      chrome.tabs.create({"url": "/components/background/index.html"});
    };
  }])
  ;
})();
