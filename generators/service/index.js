'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../../package.json');
  },
  prompting   : function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the supreme ' + chalk.red('AngularJeej') + ' generator! Aint nobody got time for that?'
    ));
    this.log(chalk.green('let\'s build dat controller'));
    var prompts = [
      {
        type   : 'input',
        name   : 'app_name',
        message: 'name of your angular app?',
        default: 'myApp',
        store  : true
      },
      {
        type   : 'input',
        name   : 'service_name',
        message: 'name of your new service? it should be unique',
        default: 'myController',
        store  : true
      }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var newObjectName = this.props.service_name + '-service.coffee';
      var newObjectPath = 'src/coffee/' + newObjectName;
      this.fs.copyTpl(
        this.templatePath('newService.coffee'),
        this.destinationPath(newObjectPath),
        {
          app_name : this.props.app_name,
          service_name: this.props.service_name
        }
      );
    }
  },

  install: function () {
    //this.installDependencies();
    this.log(chalk.green('wala! enjoy your new controller!'));
    this.log(chalk.green('Dont forget to include your service '+this.props.service_name+'-service.js in your app\'s template!'));
  }
});
