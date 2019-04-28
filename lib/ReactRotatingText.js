'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var PropTypes = require('prop-types');
var toArray = require('lodash.toarray');

var ReactRotatingText = (function (_React$Component) {
  _inherits(ReactRotatingText, _React$Component);

  function ReactRotatingText(props) {
    _classCallCheck(this, ReactRotatingText);

    _get(Object.getPrototypeOf(ReactRotatingText.prototype), 'constructor', this).call(this, props);
    var _props = this.props;
    var items = _props.items;
    var random = _props.random;

    this.state = {
      index: random ? Math.floor(Math.random() * Math.floor(items.length)) : 0,
      output: '',
      substrLength: 0
    };
    this.timeouts = [];
  }

  _createClass(ReactRotatingText, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._animate.bind(this)(); // begin the animation loop
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.timeouts.map(function (x) {
        return clearTimeout(x);
      }); // stop all the loops
    }
  }, {
    key: '_loop',
    value: function _loop(loopingFunc, pause) {
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
    key: '_type',
    value: function _type(text, callback) {
      var output = this.state.output;
      var typingInterval = this.props.typingInterval;

      var loopingFunc = this._type.bind(this, text, callback);
      var word = toArray(text);

      // set the string one character longer
      this.setState({ output: word.slice(0, toArray(output).length + 1).join('') });

      // if we're still not done, recursively loop again
      if (output.length < word.length) {
        this._loop(loopingFunc, typingInterval);
      } else {
        if (typeof this.props.onTypingEnd == 'function') {
          this.props.onTypingEnd();
        }
        callback();
      }
    }
  }, {
    key: '_erase',
    value: function _erase(callback) {
      var output = this.state.output;
      var deletingInterval = this.props.deletingInterval;

      var loopingFunc = this._erase.bind(this, callback);
      var word = toArray(output);

      if (typeof this.props.onDeletingStart == 'function') {
        this.props.onDeletingStart();
      }
      // set the string one character shorter
      this.setState({ output: word.slice(0, word.length - 1).join('') });

      // if we're still not done, recursively loop again
      if (word.length !== 0) {
        this._loop(loopingFunc, deletingInterval);
      } else {
        if (typeof this.props.onDeletingEnd == 'function') {
          this.props.onDeletingEnd();
        }
        callback();
      }
    }
  }, {
    key: '_overwrite',
    value: function _overwrite(text, callback) {
      var _state = this.state;
      var output = _state.output;
      var substrLength = _state.substrLength;
      var deletingInterval = this.props.deletingInterval;

      var loopingFunc = this._overwrite.bind(this, text, callback);
      var word = toArray(text);
      var out = toArray(output);

      this.setState({
        output: word.slice(0, substrLength).concat(out.slice(substrLength)),
        substrLength: substrLength + 1
      });

      if (word.length !== substrLength) {
        this._loop(loopingFunc, deletingInterval);
      } else {
        this.setState({
          output: text,
          substrLength: 0
        });
        callback();
      }
    }
  }, {
    key: '_animate',
    value: function _animate() {
      var _this = this;

      var index = this.state.index;
      var _props2 = this.props;
      var items = _props2.items;
      var pause = _props2.pause;
      var emptyPause = _props2.emptyPause;
      var eraseMode = _props2.eraseMode;
      var random = _props2.random;

      var type = this._type;
      var erase = this._erase;
      var overwrite = this._overwrite;
      var loopingFunc = this._animate.bind(this);
      var nextIndex = undefined;
      if (random) {
        nextIndex = Math.floor(Math.random() * Math.floor(items.length));
      } else {
        nextIndex = index === items.length - 1 ? 0 : index + 1;
      }

      var nextWord = function nextWord() {
        _this.setState({ index: nextIndex });
        _this._loop(loopingFunc, emptyPause);
      };

      if (typeof this.props.onTypingStart == 'function') {
        this.props.onTypingStart();
      }

      type.bind(this)(items[index], function () {
        if (eraseMode === 'overwrite') {
          _this._loop(overwrite.bind(_this, items[nextIndex], nextWord), pause);
        } else {
          _this._loop(erase.bind(_this, nextWord), pause);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var color = _props3.color;
      var cursor = _props3.cursor;
      var deletingInterval = _props3.deletingInterval;
      var emptyPause = _props3.emptyPause;
      var items = _props3.items;
      var pause = _props3.pause;
      var eraseMode = _props3.eraseMode;
      var typingInterval = _props3.typingInterval;
      var random = _props3.random;

      var other = _objectWithoutProperties(_props3, ['color', 'cursor', 'deletingInterval', 'emptyPause', 'items', 'pause', 'eraseMode', 'typingInterval', 'random']);

      return React.createElement(
        'span',
        _extends({ style: { color: color } }, other),
        this.state.output,
        cursor ? React.createElement(
          'span',
          { className: 'react-rotating-text-cursor' },
          '|'
        ) : null
      );
    }
  }]);

  return ReactRotatingText;
})(React.Component);

ReactRotatingText.propTypes = {
  color: PropTypes.string,
  cursor: PropTypes.bool,
  deletingInterval: PropTypes.number,
  emptyPause: PropTypes.number,
  eraseMode: PropTypes.string,
  items: PropTypes.array,
  pause: PropTypes.number,
  typingInterval: PropTypes.number,
  random: PropTypes.bool,
  onTypingStart: PropTypes.func,
  onTypingEnd: PropTypes.func,
  onDeletingStart: PropTypes.func,
  onDeletingEnd: PropTypes.func
};

ReactRotatingText.defaultProps = {
  color: 'inherit',
  cursor: true,
  deletingInterval: 50,
  emptyPause: 1000,
  eraseMode: 'erase',
  items: ['first', 'second', 'third', 'fourth', 'fifth'],
  pause: 1500,
  typingInterval: 50,
  random: false
};

exports['default'] = ReactRotatingText;
module.exports = exports['default'];