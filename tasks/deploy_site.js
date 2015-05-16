/*jslint node: true */
/*
 * grunt-deploy-site
 * https://github.com/lonnygomes/grunt-deploy-site
 *
 * Copyright (c) 2015 Lonny Gomes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('deploy_site', 'Grunt plugin that leverages git to deploy a web site', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
                branch: 'master'
            }),
            config = [this.name, this.target].join('.'),
            requiredParams = [
                'base_path',
                'remote_url'
            ];
        
        //first check that all required fields are supplied
        requiredParams.forEach(function (curParam) {
            grunt.config.requires([this.name, this.target, curParam].join('.'));
        }.bind(this));

    });

};