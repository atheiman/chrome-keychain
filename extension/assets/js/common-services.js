(function () {
  angular.module('commonServices', [])

  .factory('getSites', ['$http', function ($http) {
    return $http.get('/assets/js/fake-sites.json');
  }])

  // .factory('driveFactory', [$http])

  // .factory('GDriveFile', ['$resource', function ($resource) {
  //   return $resource('https://www.googleapis.com/drive/v2/files/:fileId')
  // }])

  // .factory('loadDriveApi', [function (loadDriveApi) {
  //   var manifest = chrome.runtime.getManifest();
  //   gapi.load('auth', function () {
  //     gapi.auth.authorize(
  //       {"client_id": manifest.oauth2.client_id,
  //        "scope": manifest.oauth2.scopes[0]},
  //       function (tokenObj) {
  //         console.log('gapi authorized in loadDriveApi(). tokenObj:', tokenObj);
  //       }
  //     )
  //   });

  //   // return a promise - https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientloadname--------version-callback
  //   return gapi.client.load('drive', 'v2');
  // }])
  ;
})();
