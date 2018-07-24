import React, { Component } from 'react';

class CountdownTimer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 0,
    }
  }

  incrementSeconds = () => {
    this.setState({seconds: this.state.seconds +10})
  }

  decrementSeconds = () => {
    let seconds = this.state.seconds
    if(seconds > 0) {
      this.setState({seconds: this.state.seconds -10})
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  tick = () => {
    let seconds = this.state.seconds
    this.setState({seconds: this.state.seconds - 1})

    // Check if zero and stop timer.
    if(seconds === 1) { 
      clearInterval(this.timer)
    }
  }

  startTimer = () => {
    let seconds = this.state.seconds
    if(seconds > 0) {
      this.timer = setInterval(this.tick, 1000)
    }
  }

  stopTimer = () => {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div className="CountdownTimer">
          <div className="timer">
            <button className="btn-timer" onClick={this.decrementSeconds}>-</button>
              {this.state.seconds}
            <button className="btn-timer" onClick={this.incrementSeconds}>+</button> 
              <br />
            <button className="btn-s" onClick={this.startTimer}>Start</button>
            <button className="btn-s" onClick={this.stopTimer}>Stop</button>
          </div>
      </div>
    );
  }
}

export default CountdownTimer;
