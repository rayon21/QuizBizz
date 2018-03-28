import React, { Component } from 'react';


class Timer extends Component {
    constructor() {
        super();
        this.state = { 
            seconds: 60 
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
      }
    
      startTimer() {
        if (this.timer === 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
      }
    
      countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
          seconds: seconds,
        });
        
        if (seconds === 0) { 
          clearInterval(this.timer);
        }
      }
    
      render() {
        return(
            <div>
                {this.state.seconds} seconds left 
                <button onClick={this.startTimer}>Start</button>
            </div>
        );
      }

}

export default Timer;