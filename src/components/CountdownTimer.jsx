import React, { useState } from 'react';

function CountdownTimer() {
  const [state, setState] = useState({
    seconds: 0,
    countdown: false
  })

  const incrementSeconds = () => {
    setState({ seconds: state.seconds + 10 });
  };

  const decrementSeconds = () => {
    if (state.seconds > 0) {
      setState({ seconds: state.seconds - 10 });
    }
  };

  const tick = () => {
    setState({ seconds: state.seconds - 1 });
    // if seconds = 0 stop timer
    if (state.seconds === 1) {
      stopTimer();
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
    <div className="controls mt-1">
      <button className="btn mr-2" onClick={decrementSeconds}>
        -
          </button>
      <h4>{state.seconds}</h4>
      <button className="btn ml-2" onClick={incrementSeconds}>
        +
          </button>
      {state.countdown === false && state.seconds > 0 ? (
        <button className="btn ml-2" onClick={startTimer}>
          Start
            </button>
      ) : (
          <button className="btn ml-2" onClick={stopTimer}>
            Stop
            </button>
        )}
    </div>
  );
}

export default CountdownTimer;
