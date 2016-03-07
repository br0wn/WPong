/**
 * Created by br0wn on 3/7/16.
 */

import * as Objects from 'objects.js';

/**
 * Game states
 *
 * @type {{START: string, END: string, PAUSE: string, IN_PLAY: string}}
 */
export const State = {
    START: 'start',
    END: 'end',
    PAUSE: 'pause',
    IN_PLAY: 'in-play'
};


const FIELD_WIDTH = 500;
const FIELD_HEIGHT = 300;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 20;
const PADDLE_FIELD_OFFSET = 20;
const PADDLE_SPEED = 5; // 5 px per frame
const BALL_RADIUS = 2;

/**
 * Limit
 *
 * @class Limit
 */
class Limit {
    /**
     * @param {Point} min
     * @param {Point} max
     *
     * @constructor Limit
     */
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
}

/**
 * Game
 *
 * @class Game
 */
export class Game {
    /**
     *
     * @param {HTMLElement} container
     * @param {{fieldWidth: (*|int|float), fieldHeight: (*|int|float), paddleWidth: (*|int|float), paddleHeight: (*|int|float), paddleFieldOffset: (*|int|float), paddleSpeed: (*|int|float), ballRadius: (*|int|float)}} options
     */
    construct(container, options) {
        // set options if undefined
        options = options || {};

        // check if container valid
        if (!container || !(container instanceof HTMLElement)) {
            throw Error("Container not supplied or not a DOM element");
        }

        /**
         *
         * @type {{fieldWidth: (*|int|float), fieldHeight: (*|int|float), paddleWidth: (*|int|float), paddleHeight: (*|int|float), paddleFieldOffset: (*|int|float), paddleSpeed: (*|int|float), ballRadius: (*|int|float)}}
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
         * @type {HTMLElement}
         */
        this.container = container;
        /**
         * @type {null|float}
         */
        this.lastTime = null;
        /**
         * @type {object}
         */
        this.objects = {};
        /**
         * @type {object}
         */
        this.limits = {};
        /**
         * @type {string}
         */
        this.state = State.START;

        /*
         * Initialization
         */

        // init objects
        this._initField();
        this._initBall();
        this._initPaddles();

        // setup limits
        this._initLimits();
    }

    /*
     * Time
     */

    /**
     * Calculates time diff
     *
     * @param time
     *
     * @private
     */
    _calcTimeDiff(time) {
        if (this.lastTime == null) {
            return 0;
        }

        return time - this.lastTime;
    }

    /**
     * Updates lastTime
     *
     * @param time
     *
     * @private
     */
    _updateLastTime(time) {
        this.lastTime = time;
    }

    /*
     * Initialization
     */

    /**
     * Initializes field
     *
     * @private
     */
    _initField() {
        /**
         * @type {Field}
         */
        this.objects.field = new Objects.Field(this.options.fieldWidth, this.options.fieldHeight);
    }

    /**
     * Initializes ball
     *
     * @private
     */
    _initBall() {
        let field = this.objects.field;
        let radius = this.options.ballRadius;
        let position = new Objects.Point(field.width / 2, field.height / 2);
        /**
         * @type {Ball}
         */
        this.objects.ball = new Objects.Ball(position, radius);
    }

    /**
     * Initializes paddles
     *
     * @private
     */
    _initPaddles() {
        let field = this.objects.field;
        let paddleWidth = this.options.paddleWidth;
        let paddleHeight = this.options.paddleHeight;

        // left paddle
        let xLeft = this.options.paddleFieldOffset;
        let yLeft = (field.height - paddleHeight ) / 2;
        let positionLeft = new Objects.Point(xLeft, yLeft);
        /**
         * @type {Paddle}
         */
        this.objects.paddleLeft = new Objects.Paddle(positionLeft, paddleWidth, paddleHeight);

        // right paddle
        let xRight = field.width - this.options.paddleFieldOffset - paddleWidth;
        let yRight = (field.height - paddleHeight ) / 2;
        let positionRight = new Objects.Point(xRight, yRight);
        /**
         * @type {Paddle}
         */
        this.objects.paddleRight = new Objects.Paddle(positionRight, paddleWidth, paddleHeight);
    }

    /**
     * Initializes limits
     *
     * @private
     */
    _initLimits() {
        let field = this.objects.field;

        // ball
        let ball = this.objects.ball;
        let ballMin = new Objects.Point(ball.radius, ball.radius);
        let ballMax = new Objects.Point(field.width - ball.radius, field.height - ball.radius);
        /**
         * @type {Limit}
         */
        this.limits.ball = new Limit(ballMin, ballMax);

        // paddleLeft
        let paddleLeft = this.objects.paddleLeft;
        let paddleLeftMin = new Objects.Point(paddleLeft.x, 0);
        let paddleLeftMax = new Objects.Point(paddleLeft.x, field.height - paddleLeft.height);
        /**
         * @type {Limit}
         */
        this.limits.paddleLeft = new Limit(paddleLeftMin, paddleLeftMax);

        // paddleRight
        let paddleRight = this.objects.paddleRight;
        let paddleRightMin = new Objects.Point(field.width - paddleRight.x - paddleRight.width, 0);
        let paddleRightMax = new Objects.Point(field.width - paddleRight.x - paddleRight.width, field.height - paddleRight.height);
        /**
         * @type {Limit}
         */
        this.limits.paddleRight = new Limit(paddleRightMin, paddleRightMax);
    }
}

