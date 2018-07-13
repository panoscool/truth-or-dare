import React, { Component } from 'react';

class CountdownTimer extends Component {
  constructor() {
    super();
    this.state = {
      time: {}, seconds: 0 
    }
    this.timer = 0;
  }

  incrementSeconds = () => {
    this.setState({seconds: this.state.seconds +10})
  }

  decrementSeconds = () => {
    this.setState({seconds: this.state.seconds -10})
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
  }

  startTimer = () => {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
      clearInterval(this.timer);
    }
  }

  render() {
    return (
        <div className="CountdownTimer">
            <div className="timer">
              <button className="btn-timer" onClick={this.decrementSeconds}>-</button>
                {this.state.seconds}
              <button className="btn-timer" onClick={this.incrementSeconds}>+</button> 
              <br />
              <button className="btn-start" onClick={this.startTimer}>Start</button>
            </div>
        </div>
    );
  }
}

export default CountdownTimer;
