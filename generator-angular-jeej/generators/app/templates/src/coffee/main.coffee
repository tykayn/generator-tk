# main module
angular.module "myApp", ["myService"]
  .controller "MainCtrl", ($rootScope, $scope)->
    console.log('MainCtrl launched')
    console.log('impressig!')