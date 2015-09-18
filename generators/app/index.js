'use strict';
var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var yosay  = require('yosay');

module.exports = yeoman.generators.Base.extend({
	// note: arguments and options should be defined in the constructor.
	constructor : function () {
		generators.Base.apply(this, arguments);
		// This method adds support for a `--js` flag
		this.option('js');
		// And you can then access it later with this.options.js
		// it will be true if option is called
	},
	initializing: function () {
		this.pkg = require('../../package.json');
	},
	prompting: function () {
		var done    = this.async();
		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the supreme ' + chalk.red('AngularJeej') + ' generator! Aint nobody got time for that?'
		));
		this.log(chalk.green('let\'s build the world. This generator provides SASS, bootstrap, font awesome, wired up with Gulp'));
		var prompts = [
			{
				type   : 'input',
				name   : 'app_title',
				message: 'Title for the web page?',
				default: 'my awesome app, jeej, sass! harrr too many YTP FR!',
				store  : true
			},
			{
				type   : 'input',
				name   : 'githubMan',
				message: 'What\'s your Github username?',
				default: 'tykayn',
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

			this.fs.copy(
				this.templatePath('../../../README.md'),
				this.destinationPath('README.md')
			);
			this.fs.copy(
				this.templatePath('src'),
				this.destinationPath('src')
			);
			this.fs.copy(
				this.templatePath('dist'),
				this.destinationPath('dist')
			);
			this.fs.copy(
				this.templatePath('GulpFile.js'),
				this.destinationPath('GulpFile.js')
			);
			this.fs.copy(
				this.templatePath('karma.conf.js'),
				this.destinationPath('karma.conf.js')
			);
			this.fs.copy(
				this.templatePath('karma-e2e.conf.js'),
				this.destinationPath('karma-e2e.conf.js')
			);
			this.fs.copyTpl(
				this.templatePath('src/html/index.html'),
				this.destinationPath('src/html/index.html'),
				{
					app_title: this.props.myTitle,
					githubMan: this.props.githubMan
				}
			);
		},
		projectfiles: function () {
			this.fs.copy(
				this.templatePath('bower.json'),
				this.destinationPath('bower.json')
			);
			this.fs.copy(
				this.templatePath('../../../package.json'),
				this.destinationPath('package.json')
			);
			this.fs.copy(
				this.templatePath('.bowerrc'),
				this.destinationPath('.bowerrc')
			);
			this.fs.copy(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
			);
			this.fs.copy(
				this.templatePath('.jshintrc'),
				this.destinationPath('.jshintrc')
			);
		}
	},
	install: function () {
		this.installDependencies();
		this.log(chalk.green('wala! enjoy your app by running Gulp!'));
	}
})
;
