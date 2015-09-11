(function () {
  angular.module('gDriveDataFile')

  .config(function ($httpProvider) {
    chrome.identity.getAuthToken({interactive: true}, function (token) {
      $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + token;
    })
  })

  .service('gDriveDataFile', ['$http', function ($http) {
    var gDriveBaseURL = 'https://www.googleapis.com/drive/v2/files';
    var gDriveUploadURL = 'https://www.googleapis.com/upload/drive/v2/files/';
    var respHandler = function (resp) {
      console.log('Resp received:', resp);
    }
    var errRespHandler = function (resp) {
      console.log('Error resp received:', resp);
    };

    var _gddf = this;

    this._getAppfolderId = function () {
      var appfolderIdKey = '_appfolderId';

      if (typeof _gddf[appfolderIdKey] !== 'undefined') {
        // check if appfolder id is cached
        return _gddf[appfolderIdKey];
      } else {
        $http.get(gDriveBaseURL + '/appfolder')
        .then(function (resp) {
          respHandler.call(this, resp);
          // cache appfolder id
          _gddf[appfolderIdKey] = resp['data']['id'];
        }, function (errResp) {
          errRespHandler.call(this, errResp);
        })
        // don't wait for appfolder metadata resp (g api will redirect)
        return 'appfolder';
      }
    }

    this._createDataFile = function () {
      // returns http promise which holds data file metadata
      //
      // creates file with metadata and no data
      var metadata = {'title': 'chrome-keychain-app-data.json',
                      'mimeType': 'application/json',
                      'parents': [{'id': _gddf._getAppfolderId()}]}
      return $http.post(gDriveBaseURL, metadata);
    };

    this._getData = function (callback) {
      // callback accepts data (obj) which is raw obj stored in g drive
      _gddf._getDataFileId(function (dataFileId) {
        $http.get(gDriveBaseURL + '/' + dataFileId + '?alt=media')
        .then(function (resp) {
          respHandler.call(this, resp);
          callback.call(this, resp['data']);
        }, function (errResp) {
          errRespHandler.call(this, errResp);
        })
      })
    };

    this._getDataFileId = function (callback) {
      // - callback accepts data file id (string)
      var dataFileIdKey = '_dataFileId';

      if (typeof _gddf['_dataFileId'] !== 'undefined') {
        // check if data file id is cached
        callback.call(this, _gddf[dataFileIdKey]);
      } else {
        // list appfolder
        $http.get(gDriveBaseURL + '/' + _gddf._getAppfolderId() + '/children')
        .then(function (listResp) {
          respHandler.call(this, listResp);
          if (listResp['data']['items'].length > 0) {
            // data file exists
            _gddf[dataFileIdKey] = listResp['data']['items'][0]['id'];
            // execute callback
            callback.call(this, _gddf[dataFileIdKey]);
          } else {
            // create data file
            _gddf._createDataFile()
            .then(function (createResp) {
              respHandler.call(this, createResp);
              // cache data file id
              _gddf[dataFileIdKey] = createResp['data']['id'];
              // execute callback
              callback.call(_gddf[dataFileIdKey]);
            }, function (errResp) {
              // if errResp from creating data file
              errRespHandler.call(this, errResp);
            });
          }
        }, function (errResp) {
          // if errResp from listing appfolder
          errRespHandler.call(this, errResp);
        });
      }
    };

    this._update = function (data, callback) {
      // data file is updated to data (obj)
      // callback (optional) accepts the drive api response
      _gddf._getDataFileId(function(dataFileId) {
        $http.put(gDriveUploadURL + dataFileId + '?uploadType=media', data)
        .then(function (resp) {
          respHandler.call(this, createResp);
          if (typeof callback !== 'undefined') {
            callback.call(this, resp);
          }
        }, function (errResp) {
          errRespHandler.call(this, errResp);
        })
      })
    };
  }])
  ;
})();
