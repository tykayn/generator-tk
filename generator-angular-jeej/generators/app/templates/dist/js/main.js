(function() {
  angular.module("myApp", ["myService"]).controller("MainCtrl", function($rootScope, $scope) {
    console.log('MainCtrl launched');
    return console.log('impressig!');
  });

}).call(this);
