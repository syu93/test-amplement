'use strict';

const fs = require('fs');

module.exports = (app) => {

    setPrototypes();

    return app.helpers = {
        readFile
    };

    /**
     * Read the input file
     * @param  {string} path The path to the input file
     * @return {object}      A promise that resolve on file readed
     */
    function readFile (path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (error, data) => {
                if (error) { reject(error) };

                let entries = data
                    .toString()
                    .trim()
                    .split("\n");

                if (entries) { resolve(entries) };
            });
        });
    }

    function setPrototypes () {
        Object.prototype.toString = _objectToString;
    }

    function _objectToString () {
        return `x : ${this.x}; y : ${this.y}: dir : ${this.dir}`;
    }
};