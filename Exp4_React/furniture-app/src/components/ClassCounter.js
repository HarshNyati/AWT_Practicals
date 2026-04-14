import React from 'react';

class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div className="counter-box class-counter">
        <h3>Class Counter (Using this.state)</h3>
        <p className="counter-display">{this.state.count}</p>
        <div className="counter-buttons">
          <button onClick={this.increment} className="btn btn-increment">
            + Increment
          </button>
          <button onClick={this.decrement} className="btn btn-decrement">
            - Decrement
          </button>
          <button onClick={this.reset} className="btn btn-reset">
            ↻ Reset
          </button>
        </div>
      </div>
    );
  }
}

export default ClassCounter;
