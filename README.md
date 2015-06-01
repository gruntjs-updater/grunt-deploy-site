# grunt-deploy-site

> Grunt plugin that deploys files to a remote git repository

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-deploy-site --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-deploy-site');
```

## The "deploy_site" task

### Overview

The `deploy-site` grunt package leverages git to copy a specified folder from within your project to a git repository.

#### Use Case

* managing a `gh-pages` site
* deploying applications
* continuous integration tasks

In your project's Gruntfile, add a section named `deploy_site` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  deploy_site: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.branch
Type: `String`
Default value: `master`

Remote branch to deploy

#### options.commit_msg
Type: `String`
Default value: `deployment`

A commit message to include for the deployment

#### options.deploy_url
Type: `String`
Default value: `N/A`

If set, the supplied URL will open in a browser window after the site is successfully deployed.

#### options.verbose
Type: `String`
Default value: false

Displays the output of git the commands used in the background when `verbose` is set to true

### Usage Examples

#### Default Options
In this example, the contents of the `dist` folder are deployed to the `gh-pages` branch of the remote repository `https://github.com/LonnyGomes/grunt-deploy-site.git`. A local reposiotry is created with in a folder named `.production_site` and after the site is deployed the URL _http://grunt-deploy-site.github.io_ will be opened up in a browser.

```js
grunt.initConfig({
   deploy_site: {
        produciton: {
            options: {
                branch: 'gh-pages',
                commit_msg: 'deployment',
                deploy_url: 'http://grunt-deploy-site.github.io'
            },
            base_path: 'dist',
            remote_url: 'https://github.com/LonnyGomes/grunt-deploy-site.git'
        }
    }
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
