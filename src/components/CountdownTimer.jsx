import React, { useState } from 'react';

function CountdownTimer() {
  const [state, setState] = useState({
    seconds: 0,
    countdown: false
  })

  const incrementSeconds = () => {
    this.setState({ seconds: this.state.seconds + 10 });
  };

  const decrementSeconds = () => {
    let seconds = this.state.seconds;
    if (seconds > 0) {
      this.setState({ seconds: this.state.seconds - 10 });
    }
  };

  const tick = () => {
    let { seconds } = this.state;
    this.setState({ seconds: this.state.seconds - 1 });
    // if seconds = 0 stop timer
    if (seconds === 1) {
      this.stopTimer();
    }
  };

  const startTimer = () => {
    let seconds = this.state.seconds;
    if (!this.timer && seconds > 0) {
      this.timer = setInterval(this.tick, 1000);
    }
    this.setState({ countdown: true });
  };

  const stopTimer = () => {
    clearInterval(this.timer);
    this.timer = undefined;
    this.setState({ countdown: false });
  };

  return (
    <div className="timer">
      <div className="title">Challenge Timer</div>
      <div className="controls mt-1">
        <button className="btn mr-2" onClick={this.decrementSeconds}>
          -
          </button>
        <h4>{this.state.seconds}</h4>
        <button className="btn ml-2" onClick={this.incrementSeconds}>
          +
          </button>
        {this.state.countdown === false && this.state.seconds > 0 ? (
          <button className="btn ml-2" onClick={this.startTimer}>
            Start
            </button>
        ) : (
            <button className="btn ml-2" onClick={this.stopTimer}>
              Stop
            </button>
          )}
      </div>
    </div>
  );
}

export default CountdownTimer;
