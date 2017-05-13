'use strict';

module.exports = () => {
    const app = {};
    // North
    // West
    // South
    // East
    const directions = ['N', 'W', 'S', 'E'];

    return {
        run
    };

    /**
     * Main run method
     * @return {none}
     */
    function run () {
        app.helpers = this.helpers;
        app.outputs = this.outputs;

        this.helpers.readFile('./inputs')
            .then((data) => {
                // The size of the map (top and right corner)
                let size = data[0].split(' ');
                let map = {};
                let startPosition = {};

                if (typeof size[0] !== 'undefined' && typeof size[1] !== 'undefined') {
                    map = {x: size[0], y: size[1]};
                } else { throw("Map is not correct! :'("); }

                data.forEach((el, idx) => {
                    if (idx!= 0 && idx%2 != 0) {
                        // Bot start position
                        let coor = data[idx].split(' ');
                        if (typeof coor[0] !== 'undefined' && typeof coor[1] !== 'undefined' && typeof coor[2] !== 'undefined') {
                            startPosition = {x: coor[0], y: coor[1], dir: coor[2]};
                        } else { throw("Map is not correct! :'("); }

                        this.outputs.output("[New mower]");
                        _move(startPosition, data[idx + 1], map);
                    };
                });
            })
            .catch(this.outputs.error);

    }

    /**
     * Main move method
     * @param  {object} position The start position object
     * @param  {string} inputs   The inputs to be applied to the mower
     * @return {none}
     */
    function _move (position, inputs, map) {
        app.outputs.outputStart(position.toString());

        // Make of copy of the position object
        let tempPosition = Object.assign({}, position);

        inputs.split('').forEach((input) => {
            if (input == 'D' || input == 'G') {
                // Rotate
                tempPosition = _rotate(tempPosition, input);

            } else if (input == 'A') {
                // Advance
                tempPosition = _moveForward(tempPosition);
            } else {
                throw ("Invalid inputs!");
            }
        });

        if (tempPosition && _isInside(map, tempPosition)) {
            position = tempPosition;
        } else {
            app.outputs.error(tempPosition.toString());
            throw ("Mower out the the map!");
        }

        app.outputs.outputEnd(position.toString());
    }

    /**
     * Move the mower forward regarding the direction
     * @param  {object} currentPosition The mower current position object
     * @return {object}                 The new new position object
     */
    function _moveForward (currentPosition) {
        switch (currentPosition.dir) {
            case ('N') :
                currentPosition.y++;
                break;
            case ('S') :
                currentPosition.y--;
                break;
            case ('E') :
                currentPosition.x++;
                break;
            default :
                currentPosition.x--;
                break;
        }
        return currentPosition;
    }

    /**
     * Rotate the position of the mower
     * G : +1
     * D : -1
     * @param  {object} currentPosition The current position of the mower
     * @param  {string} input           The input to apply to the mower
     * @return {object}                 The updated position if the mower
     */
    function _rotate (currentPosition, input) {
        let currentDirectionIdx = directions.indexOf(currentPosition.dir);

        // console.log('current', directions[currentDirectionIdx]);

        let tmpIdx = ('G' == input) ? ++currentDirectionIdx : --currentDirectionIdx;
        let nextDirectionIdx = _roundDirection(tmpIdx);

        // console.log('next', directions[nextDirectionIdx]);

        return {x: currentPosition.x, y: currentPosition.y, dir: directions[nextDirectionIdx]};
    }

    /**
     * Reset the index if we loop out of the array
     * @param  {number} directionIdx The current direction index
     * @return {number}              The reseted direction index
     */
    function _roundDirection (directionIdx) {
        return (directionIdx >= directions.length) ? 0 : (directionIdx < 0) ? directions.length -1 : directionIdx;
    }

    /**
     * Check if the computed position slip out the canvas
     * @param  {object}  map      The map max coordinates
     * @param  {object}  position The mower current position
     * @return {Boolean}          Booean value that represent if the mower is in or out of the map
     */
    function _isInside (map, position) {
        const origin = {x: 0, y: 0};

        return (origin.x <= position.x && origin.y <= position.y && map.x >= position.x && map.y >= position.y);
    }

};

