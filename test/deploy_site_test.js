/*jslint node: true */
'use strict';

var grunt = require('grunt');
var fs = require('fs-extra');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.deploy_site = {
    setUp: function (done) {
        // setup here if necessary
        fs.removeSync('.staging_site');
        fs.removeSync('.production_site');
        done();
    },
    tearDown: function (done) {
//        fs.removeSync('.staging_site');
//        fs.removeSync('.production_site');
        done();
    },
    staging: function (test) {
        test.expect(1);

        var actual = '',
            expected = '';
        test.equal(actual, expected, 'should describe what the default behavior is.');

        test.done();
    },
    production: function (test) {
        test.expect(1);

        var actual = '',
            expected = '';
        test.equal(actual, expected, 'should describe what the default behavior is.');

        test.done();
    }
};
