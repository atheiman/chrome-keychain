(function () {
  angular.module('keychain', ['commonServices'])

  .config(function ($httpProvider) {
    chrome.identity.getAuthToken({interactive: true}, function (token) {
      $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + token;
    })
  })

  .controller('GDriveCtrl', ['$scope', '$http', function ($scope, $http) {
    var gDriveBaseURL = 'https://www.googleapis.com/drive/v2/files/'
    var gDriveSimpleUploadURL = 'https://www.googleapis.com/upload/drive/v2/files?uploadType=media'
    var gDriveMultipartUploadURL = 'https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart'
    var simpleRespHandler = function (resp) {
      console.log('resp received:', resp);
      $scope.resp = resp;
    };
    var respError = function (resp) {
      console.log('error resp received:', resp);
    };

    $scope.getFileMetadata = function (fileId) {
      fileId = fileId || 'appfolder';
      var promise = $http.get(gDriveBaseURL + fileId);
      promise.then(simpleRespHandler, respError);
    }

    $scope.listFolder = function (folderId) {
      folderId = folderId || 'appfolder';
      var promise = $http.get(gDriveBaseURL + folderId + '/children');
      promise.then(simpleRespHandler, respError);
    };

    var generateAppFolderIds = function () {
      var url = gDriveBaseURL + 'generateIds?maxResults=1&space=appDataFolder'
      // return generateId promise
      return $http.get(url);
    }

// // Set HTTP header per req
// // to apply config object to http post: $http.post(url, data, config)
// $http.get('www.google.com/someapi', {
//     headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
// });

    $scope.createDataFile = function () {
      var boundary = '-------314159265358979323846';
      var delimiter = "\r\n--" + boundary + "\r\n";
      var close_delim = "\r\n--" + boundary + "--";
      var contentType = 'application/json';

      var metadata = {'title': 'chrome-keychain-app-data.json',
                      'mimeType': 'application/json',
                      'parents': [{'id': 'appfolder'}]}

      var data = {'some key': 'some value'};

      var multipartRequestBody =
          delimiter +
          'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: ' + contentType + '\r\n' +
          '\r\n' +
          JSON.stringify(data) +
          close_delim;

      var config = {
        'headers': {
          'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        }
      }
      var promise = $http.post(gDriveMultipartUploadURL,
                               multipartRequestBody,
                               config);
      promise.then(simpleRespHandler, respError);

      // // creates file with no title in root drive dir
      // var idsPromise = generateAppFolderIds();
      // idsPromise.then(function (idsResp) {
      //   console.log('generateIds resp:', idsResp);
      //   var body = {'id': idsResp.data.ids[0],
      //               'parents': [{'id': 'appfolder'}],
      //               'title': 'chrome-keychain' + Date.now()};
      //   var promise = $http.post(gDriveSimpleUploadURL, body)
      // promise.then(simpleRespHandler, respError);
      // })

      // // just creates file, need to specify appfolder as parent
      // var metadata = {'parents': [{'id': 'appfolder'}]};
      // var body = {'some key': 'some value'};
      // var promise = $http.post(gDriveSimpleUploadURL, body);
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
