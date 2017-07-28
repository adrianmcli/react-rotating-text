var React = require('react');
var PropTypes = require('prop-types');

class ReactRotatingText extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      output: '',
      substrLength: 0,
    };
    this.timeouts = [];
  }

  componentDidMount() {
    this._animate.bind(this)();   // begin the animation loop
  }

  componentWillUnmount() {
    this.timeouts.map(x => clearTimeout(x));  // stop all the loops
  }

  _loop(loopingFunc, pause) {
    // save the timeouts so we can stop on unmount
    const timeout = setTimeout(loopingFunc, pause);
    this.timeouts.push(timeout);

    // prevent memory leak
    const maxTimeouts = 100;
    if (this.timeouts.length > maxTimeouts) {
      clearTimeout(this.timeouts[0]);
      this.timeouts.shift();
    }
  }

  _type(text, callback) {
    const { output } = this.state;
    const { typingInterval } = this.props;
    const loopingFunc = this._type.bind(this, text, callback);

    // set the string one character longer
    this.setState({output: text.substr(0, output.length + 1)});

    // if we're still not done, recursively loop again
    if (output.length < text.length) {
      this._loop(loopingFunc, typingInterval);
    } else {
      callback();
    }
  }

  _erase(callback) {
    const { output } = this.state;
    const { deletingInterval } = this.props;
    const loopingFunc = this._erase.bind(this, callback);

    // set the string one character shorter
    this.setState({output: output.substr(0, output.length - 1)});

    // if we're still not done, recursively loop again
    if (output.length !== 0) {
      this._loop(loopingFunc, deletingInterval);
    } else {
      callback();
    }
  };

  _overwrite(text, callback) {
    const { output, substrLength } = this.state;
    const { deletingInterval } = this.props;
    const loopingFunc = this._overwrite.bind(this, text, callback);

    this.setState({
      output: text.substr(0, substrLength) + output.substr(substrLength),
      substrLength: substrLength + 1,
    });

    if (text.length !== substrLength) {
      this._loop(loopingFunc, deletingInterval);
    } else {
      this.setState({
        output: text,
        substrLength: 0,
      });
      callback();
    }
  };

  _animate() {
    const { index } = this.state;
    const { items, pause, emptyPause, eraseMode } = this.props;
    const type = this._type;
    const erase = this._erase;
    const overwrite = this._overwrite;
    const loopingFunc = this._animate.bind(this);
    const nextIndex = index === items.length - 1 ? 0 : index + 1;

    const nextWord = () => {
      this.setState({index: nextIndex});
      this._loop(loopingFunc, emptyPause);
    };

    type.bind(this)(items[index], () => {
      if (eraseMode === 'overwrite') {
        this._loop(overwrite.bind(this, items[nextIndex], nextWord), pause);
      } else {
        this._loop(erase.bind(this, nextWord), pause);
      }
    });
  };

  render() {
    const {
      color,
      cursor,
      deletingInterval,
      emptyPause,
      items,
      pause,
      eraseMode,
      typingInterval,
      ...other
    } = this.props;

    return (
      <span style={{ color }} {...other}>
        { this.state.output }
        { cursor ? <span className="react-rotating-text-cursor">|</span> : null }
      </span>
    );
  }
}

ReactRotatingText.propTypes = {
  color: PropTypes.string,
  cursor: PropTypes.bool,
  deletingInterval: PropTypes.number,
  emptyPause: PropTypes.number,
  eraseMode: PropTypes.string,
  items: PropTypes.array,
  pause: PropTypes.number,
  typingInterval: PropTypes.number,
};

ReactRotatingText.defaultProps = {
  color: 'inherit',
  cursor: true,
  deletingInterval: 50,
  emptyPause: 1000,
  eraseMode: 'erase',
  items: ['first', 'second', 'third'],
  pause: 1500,
  typingInterval: 50,
};

export default ReactRotatingText;
