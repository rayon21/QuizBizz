import React, { Component } from 'react';
import Header from './Header.js';


class Timer extends Component {
    constructor() {
        super();
        this.state = { 
            seconds: 5 
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
        return([
            <Header/>,
            <div className="height-screen pt-5 bg-primarytwo">
                {this.startTimer()}
                <div className="vertical-top text-center text-danger timer "> 
                    {this.state.seconds} 
                    <audio id="audio" ><source src="http://www.orangefreesounds.com/wp-content/uploads/2014/08/Wrong-answer-sound-effect.mp3?_=1" type="audio/mpeg" /></audio>
                </div>
            </div>
        ]);
    }

}

export default Timer;