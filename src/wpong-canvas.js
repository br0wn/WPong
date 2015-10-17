/**
 * Created by Br0wn on 17.10.2015..
 */

(function (exports, WPong) {

    var FIELD_WIDTH = 500;
    var FIELD_HEIGHT = 300;
    var PADDLE_WIDTH = 10;
    var PADDLE_HEIGHT = 20;
    var PADDLE_FIELD_OFFSET = 20;
    var PADDLE_SPEED = 5; // 5 px per frame
    var BALL_RADIUS = 2;

    /**
     * Limit
     *
     * @param {Point} min
     * @param {Point} max
     *
     * @constructor Limit
     */
    function Limit(min, max) {
        this.min = min;
        this.max = max;
    }

    /**
     * Game
     *
     * @param options
     *
     * @constructor Game
     */
    function Game(options) {
        // set options if undefined
        options = options || {};

        /**
         * @type {{fieldHeight: (*|number), fieldWidth: (*|number), paddleHeight: (*|number), paddleWidth: (*|number), paddleFieldOffset: (*|number), paddleSpeed: (*|number), ballRadius: (*|number)}}
         */
        this.options = {
            fieldWidth: options.fieldWidth || FIELD_WIDTH,
            fieldHeight: options.fieldHeight || FIELD_HEIGHT,
            paddleWidth: options.paddleWidth || PADDLE_WIDTH,
            paddleHeight: options.paddleHeight || PADDLE_HEIGHT,
            paddleFieldOffset: options.paddleFieldOffset || PADDLE_FIELD_OFFSET,
            paddleSpeed: options.paddleSpeed || PADDLE_SPEED,
            ballRadius: options.ballRadius || BALL_RADIUS
        };
        /**
         * @type {null|float}
         */
        this.lastTime = null;
        /**
         * @type {object}
         */
        this.objects = {};
        this.limits = {};

        // init objects
        this.initField();
        this.initBall();
        this.initPaddles();

        // setup limits
        this.initLimits();

    }

    // =================================================================================================================
    //      MAIN
    // =================================================================================================================

    Game.prototype.run = function () {
    };

    Game.prototype.playLoop = function (time) {
        var diff = this.calcTimeDiff(time);


    };


    // =================================================================================================================
    //      INITIALIZATION
    // =================================================================================================================

    Game.prototype.initField = function () {
        /**
         * @type {Field}
         */
        this.objects.field = new WPong.Field(this.options.fieldWidth, this.options.fieldHeight);
    };

    Game.prototype.initBall = function () {
        var field = this.objects.field;
        var radius = this.options.ballRadius;
        var position = new WPong.Point(field.width / 2, field.height / 2);
        /**
         * @type {Ball}
         */
        this.objects.ball = new WPong.Ball(position, radius);
    };

    Game.prototype.initPaddles = function () {
        var field = this.objects.field;
        var paddleWidth = this.options.paddleWidth;
        var paddleHeight = this.options.paddleHeight;

        // left paddle
        var xLeft = this.options.paddleFieldOffset;
        var yLeft = (field.height - paddleHeight ) / 2;
        var positionLeft = new WPong.Point(xLeft, yLeft);
        /**
         * @type {Paddle}
         */
        this.objects.paddleLeft = new WPong.Paddle(positionLeft, paddleWidth, paddleHeight);

        // right paddle
        var xRight = field.width - this.options.paddleFieldOffset - paddleWidth;
        var yRight = (field.height - paddleHeight ) / 2;
        var positionRight = new WPong.Point(xRight, yRight);
        /**
         * @type {Paddle}
         */
        this.objects.paddleRight = new WPong.Paddle(positionRight, paddleWidth, paddleHeight);
    };

    Game.prototype.initLimits = function () {
        var field = this.objects.field;
        var ball = this.objects.ball;

        // ball
        var ballMin = new WPong.Point(ball.radius, ball.radius);
        var ballMax = new WPong.Point(field.width - ball.radius, field.height - ball.radius);
        /**
         * @type {Limit}
         */
        this.limits.ball = new Limit(ballMin, ballMax);

        // paddleLeft
    };


    // =================================================================================================================
    //      TIME HELPERS
    // =================================================================================================================

    /**
     *
     * @param time
     */
    Game.prototype.calcTimeDiff = function (time) {
        if (this.lastTime == null) {
            this.lastTime = time;
        }
    };


})(window, window.WPong);