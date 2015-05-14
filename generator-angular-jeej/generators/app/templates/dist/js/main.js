(function() {
  angular.module("myApp", ["myService"]).controller("MainController", function($rootScope, $scope) {
    console.log('MainController launched');
    return console.log('impressig!');
  });

}).call(this);
