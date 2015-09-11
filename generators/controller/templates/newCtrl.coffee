###
# here we do stuff
###
angular.module "<%= app_name %>", []
.controller "<%= ctrl_name %>", ($scope)->

  ###
  # scoped variables
  ###
  $scope.demo = 'WOHOOO'

  ###
  # scoped functions
  ###
  $scope.doStuff = ->
    console.log('impressig!')
  $scope.doStuffWithArg = (arg)->
    console.log('wow such function!', arg)

  ###
  # initilise everything
  ###
  $scope.init = ->
    console.log('<%= ctrl_name %> initialised');
  $scope.init()
