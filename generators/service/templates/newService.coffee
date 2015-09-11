###
# here we do stuff
###
angular.module "<%= app_name %>", []
.service "<%= service_name %>", ($scope)->
  return {
    'tadam' : (arg)->
      console.log('argument', arg)
  }
