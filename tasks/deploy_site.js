/*jslint node: true */
/*
 * grunt-deploy-site
 * https://github.com/lonnygomes/grunt-deploy-site
 *
 * Copyright (c) 2015 Lonny Gomes
 * Licensed under the MIT license.
 */

'use strict';

var Q = require('q'),
    path = require('path');

module.exports = function (grunt) {

    function willSpawn(cmd, args, opts) {
        return function () {
            var defer = Q.defer(),
                msg = ['Running', cmd];

            if (args) {
                msg = msg.concat(args);
            }

            if (opts) {
                msg = msg.concat(', ', JSON.stringify(opts));
            }

            grunt.verbose.ok(msg.join(' '));
            grunt.util.spawn({
                cmd: cmd,
                args: args,
                opts: opts
            }, function (error, result, code) {
                if (code !== 0) {
                    console.log('failing');
                    defer.reject(error.stderr);
                } else {
                    console.log('winning');
                    defer.resolve();
                }
            });
            return defer.promise;
        };
    }

    function willInitRepo(repoPath) {
        return function () {
            var defer = Q.defer();

            if (!grunt.file.isDir(repoPath)) {
                willSpawn('git', ['init', repoPath])()
                    .then(function () {
                        defer.resolve();
                    }, function (err) {
                        defer.reject(err);
                    });
            } else {
                //repo is already initialized
                process.nextTick(defer.resolve);
            }

            return defer.promise;
        };
    }

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
            ],
            localRepoPath = path.resolve('.' + this.target + '_site'),
            commit_msg = 'default message',
            workTree,
            done;

        //first check that all required fields are supplied
        requiredParams.forEach(function (curParam) {
            grunt.config.requires([this.name, this.target, curParam].join('.'));
        }.bind(this));

        //confirm base_path is correct
        if (!grunt.file.isDir(this.data.base_path)) {
            grunt.fail.fatal('Invalid path supplied for `base_path` value!');
        }

        workTree = path.resolve(this.data.base_path);

        done = this.async();

        //execute commands
        return [
            willInitRepo(localRepoPath),
            willSpawn('git', ['config', 'core.worktree', workTree], {cwd: localRepoPath}),
            willSpawn('git', ['add', '-A'], {cwd: workTree}),
            willSpawn('git', ['commit', '-m', commit_msg], {cwd: workTree})
        ].reduce(function (prev, curFunc) {
            console.log('In reduce');
            return prev.then(curFunc);
        }, new Q())
            .then(function () {
                grunt.log.writeln('Successfully deployed ' + this.target);
                done();
            }, function (err) {
                grunt.fail.fatal('Failed: ' + err);
            });

    });

};
