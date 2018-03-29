import React, { Component } from "react";
import io from "socket.io-client";

class PlayerRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: '/',
      roomId: window.location.pathname.split("/")[2],
      playerName: window.location.pathname.split("/")[3],
      pushButton: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }

// need to do this when the user presses enter on the form 
  componentDidMount() {
    const { endpoint } = this.state;
    this.socket = io(endpoint);
    var data = {
    // needs to be elements from the forms, not random data
      roomId : this.state.roomId,
      playerName : this.state.playerName
    };

    var r = this;

    this.socket.emit('playerJoinGame', data, function(data){});


    this.socket.on('playerEnableBuzzer', function(){
            console.log("VALID BUZZER")
            r.setState({
              pushButton: true
            });
      }
    );
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    var data = {
        roomId: this.state.roomId,
        playerName: this.state.playerName
    };
    if(this.state.pushButton){
      this.socket.emit('playerPushButton',data);
    }
    this.setState({pushButton: false});
  }

  render() {
    const pushButton = this.state.pushButton;
    var color = pushButton ? ({backgroundColor:"green"}) : ({backgroundColor:"red"});
    return (
      <div style={{ textAlign: "center" }} className="height-screen pt-5 bg-primarytwo">

        <div className="container mb-3">
        <div className="col-sm-4 offset-sm-4 buzzer-container pb-3 pt-4 mb-3">
          <div className="col-md-12 text-center">
          </div>
  
            <button type="submit" style={color} className="btn btn-primary col-md-12 pt-5 pb-5 mt-4" onClick={this.handleSubmit}>BUZZ</button>
          
        </div>
      </div>
      </div>
    );
  }
}
export default PlayerRoom;

