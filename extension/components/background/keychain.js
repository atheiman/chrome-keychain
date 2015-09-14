(function () {
  angular.module('keychain', ['commonServices', 'gDriveDataFileModule'])

  .controller('GDriveCtrl', ['$scope', 'gDriveDataFile', function ($scope, gDriveDataFile) {
    // $scope.gddf = gDriveDataFile;

    $scope.pre = '';
    $scope.getData = function () {
      gDriveDataFile.getData(function (data) {
        $scope.pre = JSON.stringify(data);
      });
    }

    $scope.update = function (k, v) {
      data = {};
      data[k] = v;
      gDriveDataFile.update(data);
    }

    $scope.delete = function () {
      gDriveDataFile._delete();
    }
  }])

  .controller('SitesCtrl', ['$scope', 'getSites', function ($scope, getSites) {
    var promise = getSites;
    promise.then(function (payload) {
      $scope.sites = payload.data;
    });
  }])
  ;
})();
