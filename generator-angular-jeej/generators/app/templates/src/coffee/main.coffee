# main module
angular.module "myApp", ["myService"]
  .controller "MainController", ($rootScope, $scope)->
    console.log('MainController launched')
    console.log('impressig!')