angular.module "myApp", ["myService"]
  .controller "MainController", ($rootScope, $scope)->
    console.log('MainController launched')