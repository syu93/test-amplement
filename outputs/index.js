'use strict';

const colors = require('colors');

module.exports = (app) => {
    return app.outputs = {
        output,
        outputStart,
        outputEnd,
        error,
        _debug
    };

    function output (data) {
        console.log(`${data}` . magenta);
    }

    function outputStart (data) {
        console.log("   [START]" . red, `${data}` . blue);
    }

    function outputEnd (data) {
        console.log("   [END]" . cyan, `${data}` . blue);
    }

    function error (error) {
        console.log(`[Application error] ${error}` . red);
    }

    function _debug (data) {
        console.log(data);
    }
};