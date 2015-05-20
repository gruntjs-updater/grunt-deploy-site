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

    function willSpawn(cmd, args, opts, cmd_msg) {
        return function (d) {
            var defer = Q.defer(),
                msg = ['Running', cmd];

            if (args) {
                msg = msg.concat(args);
            }

            //print out command if --verbose is supplied
            grunt.verbose.ok(msg.join(' '));

            if (cmd_msg) {
                grunt.log.writeln(cmd_msg);
            }

            //execute command
            grunt.util.spawn({
                cmd: cmd,
                args: args,
                opts: opts
            }, function (error, result, code) {
                if (code !== 0) {
                    defer.reject(error);
                } else {
                    defer.resolve(d);
                }
            });
            return defer.promise;
        };
    }

    function willInitRepo(repoPath) {
        return function (d) {
            var defer = Q.defer(),
                relRepoPath,
                msg;

            if (!grunt.file.isDir(repoPath)) {
                relRepoPath = path.basename(repoPath);
                msg = "Initializing repository at ".cyan.bold + relRepoPath.magenta;

                grunt.log.writeln(msg);
                willSpawn('git', ['init', repoPath])()
                    .then(function () {
                        defer.resolve(d);
                    }, function (err) {
                        defer.reject(err);
                    });
            } else {
                //repo is already initialized
                process.nextTick(function () {
                    defer.resolve(d);
                });
            }

            return defer.promise;
        };
    }

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('deploy_site', 'Grunt plugin that leverages git to deploy a web site', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
                branch: 'master',
                commit_msg: 'deployment'
            }),
            config = [this.name, this.target].join('.'),
            requiredParams = [
                'base_path',
                'remote_url'
            ],
            localRepoPath = path.resolve('.' + this.target + '_site'),
            remoteRepoPath,
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

        //save the working tree for repo as the base path from the grunt config
        workTree = path.resolve(this.data.base_path);

        //set remote git url variable
        if (grunt.file.exists(path.resolve(this.data.base_path))) {
            //must be a local reference so resolve to absolute path
            remoteRepoPath = path.resolve(this.data.remote_url);
        } else {
            remoteRepoPath = this.data.remote_url;
        }

        done = this.async();

        //execute commands
        return [
            willInitRepo(localRepoPath),
            willSpawn('git',
                      ['config', 'core.worktree', workTree],
                      {cwd: localRepoPath}),
            willSpawn('git',
                      ['add', '-A'],
                      {cwd: localRepoPath},
                      'Adding files to deployment repo '.white + '...'.cyan),
            willSpawn('git',
                      ['commit', '-m', options.commit_msg],
                      {cwd: localRepoPath},
                      'Committing changes '.white + '...'.cyan),
            willSpawn('git',
                      ['push', '--force', '--quiet', remoteRepoPath, 'master:' + options.branch],
                      {cwd: localRepoPath},
                      'Pushing changes to the remote deployment repository'.white + '...'.cyan)
        ].reduce(function (prev, curFunc) {
            return prev.then(curFunc);
        }, new Q())
            .then(function (d) {
                var success_msg = 'Successfully deployed ' + this.target + ' site';
                grunt.log.writeln(success_msg.white.bold);
                done();
            }.bind(this), function (err) {
                grunt.fail.fatal(err);
            }).done();

    });

};
