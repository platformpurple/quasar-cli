'use strict';

var exec = require('child_process').exec;

module.exports = function(command, callback) {
    exec('git '+command, function(err, stdout, stderr) {
        if (err) {
            throw new Error('@ git '+command+';\n\n'+err);
        }

        callback && callback();
    });
};