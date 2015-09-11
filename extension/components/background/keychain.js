(function () {
  angular.module('keychain', ['commonServices'])

  .config(function ($httpProvider) {
    chrome.identity.getAuthToken({interactive: true}, function (token) {
      $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + token;
    })
  })

  .controller('GDriveCtrl', ['$scope', '$http', function ($scope, $http) {
    /**
     * Function to update data file
     * Function to retrieve data file and load data from response
     * Function to
     *
     */

    var gDriveBaseURL = 'https://www.googleapis.com/drive/v2/files/';
    var gDriveSimpleUploadURL = 'https://www.googleapis.com/upload/drive/v2/files?uploadType=media';
    var gDriveMultipartUploadURL = 'https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart';
    var gDriveMetadataURL = 'https://www.googleapis.com/drive/v2/files';
    var gDriveUploadURL = 'https://www.googleapis.com/upload/drive/v2/files/';

    var simpleRespHandler = function (resp) {
      console.log('resp received:', resp);
      $scope.resp = resp;
    };
    var respErrorHandler = function (resp) {
      console.log('error resp received:', resp);
    };

    $scope.getFileMetadata = function (fileId) {
      fileId = fileId || 'appfolder';
      var promise = $http.get(gDriveBaseURL + fileId);
      promise.then(simpleRespHandler, respErrorHandler);
    }

    $scope.listFolder = function (folderId) {
      folderId = folderId || 'appfolder';
      var promise = $http.get(gDriveBaseURL + folderId + '/children');
      promise.then(simpleRespHandler, respErrorHandler);
    };

    $scope.createDataFile = function () {
      var metadata = {'title': 'chrome-keychain-app-data.json',
                      'mimeType': 'application/json',
                      'parents': [{'id': 'appfolder'}]}
      var createPromise = $http.post(gDriveMetadataURL, metadata)
      createPromise.then(simpleRespHandler, respErrorHandler);
    }

    $scope.updateDataFile = function (fileId) {
      var data = {
        'holy': 'fucking shit'
      }
      var updatePromise = $http.put(gDriveUploadURL + fileId + '?uploadType=media', data);
      updatePromise.then(simpleRespHandler, respErrorHandler);
    }

    $scope.deleteDataFile = function (fileId) {
      var deletePromise = $http.delete(gDriveBaseURL + fileId);
      deletePromise.then(simpleRespHandler, respErrorHandler);
    }

    $scope.multipartCreateDataFile = function () {
      // the multipart create functionality is probably not preferred.
      // although it is slower to create the file with metadata in one request
      // then update the file in a separate request, it is much simpler

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
      promise.then(simpleRespHandler, respErrorHandler);
    }

    $scope.getDataFile = function () {
      $http.get(gDriveBaseURL + 'appfolder/children').then(
        function (resp) {
          var filePromise = $http.get(resp.data.items[0].childLink + '?alt=media');
          filePromise.then(simpleRespHandler, respErrorHandler);
        },
        respErrorHandler
      )
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
