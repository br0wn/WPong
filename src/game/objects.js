/**
 * Point
 *
 * @class Point
 */
export class Point {
    /**
     * @param {float} x Coordinate X
     * @param {float} y Coordinate Y
     *
     * @constructor Point
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * Paddle
 *
 * @class Paddle
 */
export class Paddle {
    /**
     * @param {Point} position Point of upper left corner
     * @param {int} width
     * @param {int} height
     *
     * @constructor Paddle
     */
    constructor(position, width, height) {
        this.position = position;
        this.width = width;
        this.height = height;
    }
}

/**
 * Ball
 *
 * @class Ball
 */
export class Ball {
    /**
     * @param {Point} position Center of the ball
     * @param {float} radius
     *
     * @constructor Ball
     */
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
    }
}

/**
 * Field
 *
 * @class Field
 */
export class Field {
    /**
     * @param {int} width
     * @param {int} height
     *
     * @constructor Field
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}