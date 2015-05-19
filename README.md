# grunt-deploy-site

> Grunt plugin that leverages git to deploy a web site

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

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
   deploy_site: {
        staging: {
            options: {
                branch: 'gh-pages',
                commit_msg: 'Deployment commit'
            },
            base_path: 'dist',
            remote_url: 'test/fixtures/remotes/staging'
        },
    }
});
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  deploy_site: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
