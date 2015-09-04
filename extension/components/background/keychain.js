(function () {
  angular.module('keychain', ['commonServices'])

  .config(function ($httpProvider) {
    chrome.identity.getAuthToken({interactive: true}, function (token) {
      $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + token;
    })
  })

  .controller('GDriveCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.getAppFolder = function () {
      var promise = $http.get('https://www.googleapis.com/drive/v2/files/appfolder');
      console.log('promise created:', promise);
      promise.then(function (resp) {
        console.log('resp received:', resp);
        $scope.appFolder = resp.data;
      }, function (resp) {
        console.log('error resp received:', resp);
      });
    }
    console.log('GDriveCtrl loaded');
  }])

  // .controller('GDriveCtrl', ['$scope', 'GDriveFile', function ($scope, GDriveFile) {
  //   $scope.gDriveFile = GDriveFile.get({fileId: 'appfolder'}, function (gDriveFile) {
  //     console.log('received gDriveFile:', gDriveFile);
  //   });
  // }])

  // .controller('DriveCtrl', ['$scope', 'loadDriveApi', function ($scope, loadDriveApi) {
  //   $scope.printApplicationDataFolderMetadata = function () {
  //     var request = gapi.client.drive.files.get({
  //       'fileId': 'appfolder'
  //     });
  //     request.execute(function (resp) {
  //       console.log('Id: ' + resp.id);
  //       console.log('Title: ' + resp.title);
  //     });
  //   }
  // }])

  .controller('SitesCtrl', ['$scope', 'getSites', function ($scope, getSites) {
    var promise = getSites;
    promise.then(function (payload) {
      $scope.sites = payload.data;
    });
  }])
  ;
})();
