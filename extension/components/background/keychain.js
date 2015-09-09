(function () {
  angular.module('keychain', ['commonServices'])

  .config(function ($httpProvider) {
    chrome.identity.getAuthToken({interactive: true}, function (token) {
      $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + token;
    })
  })

  .controller('GDriveCtrl', ['$scope', '$http', function ($scope, $http) {
    var gDriveBaseURL = 'https://www.googleapis.com/drive/v2/files/'
    var gDriveUploadURL = 'https://www.googleapis.com/upload/drive/v2/files?uploadType=media'
    var respError = function (resp) { console.log('error resp received:', resp); };

    $scope.getAppFolder = function () {
      var promise = $http.get(gDriveBaseURL + 'appfolder');
      promise.then(function (resp) { $scope.resp = resp; }, respError);
    };

    $scope.listAppFolder = function () {
      var promise = $http.get(gDriveBaseURL + 'appfolder/children');
      promise.then(function (resp) { $scope.resp = resp; }, respError);
    };

    $scope.generateAppFolderIds = function () {
      var promise = $http.get(gDriveBaseURL + 'generateIds?maxResults=1&space=appDataFolder');
      promise.then(function (resp) { $scope.resp = resp; }, respError);
    }

    $scope.createDataFile = function () {
      // get fileId using generateAppFolderIds, then post to create it
      var body = {'id': fileId};
      var promise = $http.post(gDriveBaseURL + 'appfolder/children', body);
      promise.then(function (resp) { $scope.resp = resp; }, respError);

      // // just creates file, need to specify appfolder as parent
      // var metadata = {'parents': [{'id': 'appfolder'}]};
      // var body = {'some key': 'some value'};
      // var promise = $http.post(gDriveUploadURL, body);
      // promise.then(function (resp) { $scope.resp = resp; }, respError);
    }


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
