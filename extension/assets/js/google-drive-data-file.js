(function () {
  angular.module('gDriveDataFileModule', [])

  .config(function ($httpProvider) {
    chrome.identity.getAuthToken({interactive: true}, function (token) {
      $httpProvider.defaults.headers.common.Authorization = 'Bearer ' + token;
    })
  })

  .service('gDriveDataFile', ['$http', function ($http) {
    var gDriveBaseURL = 'https://www.googleapis.com/drive/v2/files';
    var gDriveUploadURL = 'https://www.googleapis.com/upload/drive/v2/files/';
    var dataFileIdKey = '_dataFileId';
    var appfolderIdKey = '_appfolderId';

    var respHandler = function (resp) {
      console.info('Resp received:', resp);
    }
    var errRespHandler = function (resp) {
      console.error('Error resp received:', resp);
    };

    var _gddf = this;

    this._getAppfolderId = function () {
      return 'appfolder';
      // var appfolderIdKey = '_appfolderId';

      // if (typeof _gddf[appfolderIdKey] !== 'undefined') {
      //   // check if appfolder id is cached
      //   return _gddf[appfolderIdKey];
      // } else {
      //   $http.get(gDriveBaseURL + '/appfolder')
      //   .then(function (resp) {
      //     respHandler.call(this, resp);
      //     // cache appfolder id
      //     _gddf[appfolderIdKey] = resp['data']['id'];
      //   }, function (errResp) {
      //     errRespHandler.call(this, errResp);
      //   })
      //   // don't wait for appfolder metadata resp (g api will redirect)
      //   return 'appfolder';
      // }
    };

    this._createDataFile = function () {
      // returns http promise which holds data file metadata
      //
      // creates file with metadata and no data
      var metadata = {'title': 'chrome-keychain-app-data.json',
                      'mimeType': 'application/json',
                      'parents': [{'id': _gddf._getAppfolderId()}]}
      return $http.post(gDriveBaseURL, metadata);
    };

    this.getData = function (callback) {
      // callback (optional) accepts data (obj) stored in g drive
      _gddf._getDataFileId(function (dataFileId) {
        $http.get(gDriveBaseURL + '/' + dataFileId + '?alt=media')
        .then(function (resp) {
          respHandler.call(this, resp);
          if (typeof callback !== 'undefined')
            callback.call(this, resp['data']);
        }, function (errResp) {
          errRespHandler.call(this, errResp);
        })
      })
    };

    this._getDataFileId = function (callback) {
      // - callback accepts data file id (string)

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
            // data file does not exist, create data file
            _gddf._createDataFile()
            .then(function (createResp) {
              respHandler.call(this, createResp);
              // cache data file id
              _gddf[dataFileIdKey] = createResp['data']['id'];
              // execute callback
              callback.call(this, _gddf[dataFileIdKey]);
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

    this.update = function (data, callback) {
      // data file is updated to data (obj)
      // callback (optional) accepts the drive api response
      _gddf._getDataFileId(function(dataFileId) {
        $http.put(gDriveUploadURL + dataFileId + '?uploadType=media', data)
        .then(function (resp) {
          respHandler.call(this, resp);
          if (typeof callback !== 'undefined')
            callback.call(this, resp);
        }, function (errResp) {
          errRespHandler.call(this, errResp);
        })
      })
    };

    this._clearCache = function () {
      delete _gddf[dataFileIdKey];
      delete _gddf[appfolderIdKey];
    }

    this._delete = function (callback) {
      // callback (optional) accepts the drive api response
      _gddf._getDataFileId(function (dataFileId) {
        $http.delete(gDriveBaseURL + '/' + dataFileId)
        .then(function (resp) {
          respHandler.call(this, resp);
          if (typeof callback !== 'undefined')
            callback.call(this, resp);
          _gddf._clearCache();
        }, function (errResp) {
          errRespHandler.call(this, errResp);
        });
      });
    };
  }])
  ;
})();
