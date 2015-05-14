(function() {
  angular.module("myApp", ["myService"]).controller("MainController", function($rootScope, $scope) {
    return console.log('MainController launched');
  });

}).call(this);
