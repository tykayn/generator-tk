
/*
 * here we do stuff
 */

(function() {
  angular.module("<%= app_name %>", []).controller("<%= ctrl_name %>", function($scope) {

    /*
     * scoped variables
     */
    $scope.demo = 'WOHOOO';

    /*
     * scoped functions
     */
    $scope.doStuff = function() {
      return console.log('impressig!');
    };
    $scope.doStuffWithArg = function(arg) {
      return console.log('wow such function!', arg);
    };

    /*
     * initilise everything
     */
    $scope.init = function() {
      return console.log('<%= ctrl_name %> initialised');
    };
    return $scope.init();
  });

}).call(this);
