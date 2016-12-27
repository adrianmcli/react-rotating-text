'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactRotatingText = function (_React$Component) {
  _inherits(ReactRotatingText, _React$Component);

  function ReactRotatingText(props) {
    _classCallCheck(this, ReactRotatingText);

    var _this = _possibleConstructorReturn(this, (ReactRotatingText.__proto__ || Object.getPrototypeOf(ReactRotatingText)).call(this, props));

    _this.state = {
      index: 0,
      output: ''
    };
    _this.timeouts = [];
    return _this;
  }

  _createClass(ReactRotatingText, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.animate.bind(this)(); // begin the animation loop
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.timeouts.map(function (x) {
        return clearTimeout(x);
      }); // stop all the loops
    }
  }, {
    key: 'loop',
    value: function loop(loopingFunc, pause) {
      // save the timeouts so we can stop on unmount
      var timeout = setTimeout(loopingFunc, pause);
      this.timeouts.push(timeout);

      // prevent memory leak
      var maxTimeouts = 100;
      if (this.timeouts.length > maxTimeouts) {
        clearTimeout(this.timeouts[0]);
        this.timeouts.shift();
      }
    }
  }, {
    key: 'type',
    value: function type(text, callback) {
      var output = this.state.output;
      var typingInterval = this.props.typingInterval;

      var loopingFunc = this.type.bind(this, text, callback);

      // set the string one character longer
      this.setState({ output: text.substr(0, output.length + 1) });

      // if we're still not done, recursively loop again
      if (output.length < text.length) {
        this.loop(loopingFunc, typingInterval);
      } else {
        callback();
      }
    }
  }, {
    key: 'erase',
    value: function erase(callback) {
      var output = this.state.output;
      var deletingInterval = this.props.deletingInterval;

      var loopingFunc = this.erase.bind(this, callback);

      // set the string one character shorter
      this.setState({ output: output.substr(0, output.length - 1) });

      // if we're still not done, recursively loop again
      if (output.length !== 0) {
        this.loop(loopingFunc, deletingInterval);
      } else {
        callback();
      }
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _this2 = this;

      var index = this.state.index;
      var _props = this.props,
          items = _props.items,
          pause = _props.pause,
          emptyPause = _props.emptyPause;

      var type = this.type;
      var erase = this.erase;
      var loopingFunc = this.animate.bind(this);

      var nextWord = function nextWord() {
        _this2.setState({
          index: index === items.length - 1 ? 0 : index + 1
        });
        _this2.loop(loopingFunc, emptyPause);
      };

      type.bind(this)(items[index], function () {
        _this2.loop(erase.bind(_this2, nextWord), pause);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          color = _props2.color,
          cursor = _props2.cursor,
          other = _objectWithoutProperties(_props2, ['color', 'cursor']);

      return _react2.default.createElement(
        'span',
        _extends({ style: { color: color } }, other),
        this.state.output,
        cursor ? _react2.default.createElement(
          'span',
          { className: 'react-rotating-text-cursor' },
          '|'
        ) : null
      );
    }
  }]);

  return ReactRotatingText;
}(_react2.default.Component);

ReactRotatingText.propTypes = {
  color: _react2.default.PropTypes.string,
  cursor: _react2.default.PropTypes.bool,
  deletingInterval: _react2.default.PropTypes.number,
  emptyPause: _react2.default.PropTypes.number,
  items: _react2.default.PropTypes.array, // eslint-disable-line react/forbid-prop-types
  pause: _react2.default.PropTypes.number,
  typingInterval: _react2.default.PropTypes.number
};

ReactRotatingText.defaultProps = {
  color: 'inherit',
  cursor: true,
  deletingInterval: 50,
  emptyPause: 1000,
  items: ['first', 'second', 'third'],
  pause: 1500,
  typingInterval: 50
};

exports.default = ReactRotatingText;