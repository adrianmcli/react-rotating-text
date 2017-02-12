require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-rotating-text":[function(require,module,exports){
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

var ReactRotatingText = (function (_React$Component) {
  _inherits(ReactRotatingText, _React$Component);

  function ReactRotatingText(props) {
    _classCallCheck(this, ReactRotatingText);

    _get(Object.getPrototypeOf(ReactRotatingText.prototype), 'constructor', this).call(this, props);
    this.state = {
      index: 0,
      output: ''
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

      // set the string one character longer
      this.setState({ output: text.substr(0, output.length + 1) });

      // if we're still not done, recursively loop again
      if (output.length < text.length) {
        this._loop(loopingFunc, typingInterval);
      } else {
        callback();
      }
    }
  }, {
    key: '_erase',
    value: function _erase(callback) {
      var output = this.state.output;
      var deletingInterval = this.props.deletingInterval;

      var loopingFunc = this._erase.bind(this, callback);

      // set the string one character shorter
      this.setState({ output: output.substr(0, output.length - 1) });

      // if we're still not done, recursively loop again
      if (output.length !== 0) {
        this._loop(loopingFunc, deletingInterval);
      } else {
        callback();
      }
    }
  }, {
    key: '_animate',
    value: function _animate() {
      var _this = this;

      var index = this.state.index;
      var _props = this.props;
      var items = _props.items;
      var pause = _props.pause;
      var emptyPause = _props.emptyPause;

      var type = this._type;
      var erase = this._erase;
      var loopingFunc = this._animate.bind(this);

      var nextWord = function nextWord() {
        _this.setState({
          index: index === items.length - 1 ? 0 : index + 1
        });
        _this._loop(loopingFunc, emptyPause);
      };

      type.bind(this)(items[index], function () {
        _this._loop(erase.bind(_this, nextWord), pause);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var color = _props2.color;
      var cursor = _props2.cursor;
      var deletingInterval = _props2.deletingInterval;
      var emptyPause = _props2.emptyPause;
      var items = _props2.items;
      var pause = _props2.pause;
      var typingInterval = _props2.typingInterval;

      var other = _objectWithoutProperties(_props2, ['color', 'cursor', 'deletingInterval', 'emptyPause', 'items', 'pause', 'typingInterval']);

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
  color: React.PropTypes.string,
  cursor: React.PropTypes.bool,
  deletingInterval: React.PropTypes.number,
  emptyPause: React.PropTypes.number,
  items: React.PropTypes.array,
  pause: React.PropTypes.number,
  typingInterval: React.PropTypes.number
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

exports['default'] = ReactRotatingText;
module.exports = exports['default'];

},{"react":undefined}]},{},[]);
