var React = require('react');

class ReactRotatingText extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      output: '',
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

  _animate() {
    const { index } = this.state;
    const { items, pause, emptyPause } = this.props;
    const type = this._type;
    const erase = this._erase;
    const loopingFunc = this._animate.bind(this);

    const nextWord = () => {
      this.setState({
        index: index === items.length - 1 ? 0 : index + 1
      });
      this._loop(loopingFunc, emptyPause);
    };
    
    type.bind(this)(items[index], () => {
      this._loop(erase.bind(this, nextWord), pause);
    });
  };

  render() {
    const { color, cursor, ...other } = this.props;
    return (
      <span style={{color: color}} {...other}>
        { this.state.output }
        { cursor ? <span className="react-rotating-text-cursor">|</span> : null }
      </span>
    );
  }
}

ReactRotatingText.propTypes = {
  color: React.PropTypes.string,
  cursor: React.PropTypes.bool,
  deletingInterval: React.PropTypes.number,
  emptyPause: React.PropTypes.number,
  items: React.PropTypes.array,
  pause: React.PropTypes.number,
  typingInterval: React.PropTypes.number,
};

ReactRotatingText.defaultProps = {
  color: 'inherit',
  cursor: true,
  deletingInterval: 50,
  emptyPause: 1000,
  items: ['first', 'second', 'third'],
  pause: 1500,
  typingInterval: 50,
};

export default ReactRotatingText;