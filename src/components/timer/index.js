import React, { Component } from "react";

class CountdownTimer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 0
    };
  }

  incrementSeconds = () => {
    this.setState({ seconds: this.state.seconds + 10 });
  };

  decrementSeconds = () => {
    let seconds = this.state.seconds;
    if (seconds > 0) {
      this.setState({ seconds: this.state.seconds - 10 });
    }
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    let { seconds } = this.state;
    this.setState({ seconds: this.state.seconds - 1 });
    // if seconds = 0 stop timer
    if (seconds === 1) {
      this.stopTimer();
    }
  };

  startTimer = () => {
    let seconds = this.state.seconds;
    if (!this.timer && seconds > 0) {
      this.timer = setInterval(this.tick, 1000);
    }
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.timer = undefined;
  };

  render() {
    return (
      <div className="CountdownTimer">
        <div className="title">Countdown Timer</div>
        <div className="timer">
          <button className="btn-t" onClick={this.decrementSeconds}>
            -
          </button>
          {this.state.seconds}
          <button className="btn-t" onClick={this.incrementSeconds}>
            +
          </button>
          <br />
          <button className="btn-t" onClick={this.startTimer}>
            Start
          </button>
          <button className="btn-t" onClick={this.stopTimer}>
            Stop
          </button>
        </div>
      </div>
    );
  }
}

export default CountdownTimer;
