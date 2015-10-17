/**
 * Created by Br0wn on 17.10.2015..
 */

(function (exports) {

    /**
     * Point
     *
     * @param {float} x
     * @param {float} y
     *
     * @constructor Point
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Paddle
     *
     * @param {Point} position Point of upper left corner
     * @param {int} width
     * @param {int} height
     *
     * @constructor Paddle
     */
    function Paddle(position, width, height) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    /**
     * Ball
     *
     * @param {Point} position Center of the ball
     * @param {float} radius
     *
     * @constructor Ball
     */
    function Ball(position, radius) {
        this.position = position;
        this.radius = radius;
    }

    /**
     * Field
     *
     * @param {int} width
     * @param {int} height
     *
     * @constructor Field
     */
    function Field(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * Export module
     *
     * @type {{Point: Point, Paddle: Paddle, Ball: Ball, Field: Field, Game: Game}}
     */
    exports.WPong = {
        Point: Point,
        Paddle: Paddle,
        Ball: Ball,
        Field: Field
    }

})(window);