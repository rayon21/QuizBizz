import React, { Component } from 'react';


class Timer extends Component {
    constructor() {
        super();
        this.state = { 
            seconds: 2 
        };
        this.timer = -1;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.complete = this.complete.bind(this);
    }

    startTimer() {
        if (this.timer === -1) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            seconds: seconds,
        });
        
        if (this.state.seconds === 0) {this.complete()}
    }

    complete() {
        clearInterval(this.timer);
        let audio = document.getElementById("audio");
        audio.play(); 
    }
    
    render() {
        return(
            <div>
                {this.state.seconds} seconds left 
                <button onClick={this.startTimer}>Start</button>
                <audio id="audio" ><source src="http://www.orangefreesounds.com/wp-content/uploads/2014/08/Wrong-answer-sound-effect.mp3?_=1" type="audio/mpeg" /></audio>
            </div>
        );
    }

}

export default Timer;