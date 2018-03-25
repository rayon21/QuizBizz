import React, { Component } from "react";
import io from "socket.io-client";

class PlayerRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:8888",
      roomId: window.location.pathname.split("/")[2],
      playerName: window.location.pathname.split("/")[3]
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }

// need to do this when the user presses enter on the form 
  componentDidMount() {
    const { endpoint } = this.state;
    this.socket = io(endpoint);
    console.log(this.state.roomId + " , " + this.state.playerName);
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
    this.socket.emit('playerPushButton',data);

  }

  render() {
    const { validId } = this.state;
    var errColor = {color:"red"};
    return (
      <div style={{ textAlign: "center" }}>

        <div className="container mb-3">
        <div className="col-sm-4 offset-sm-4 border pb-3 pt-4 mb-3">
          <h3>Get Started</h3>

            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Enter</button>
          
        </div>
      </div>
      </div>
    );
  }
}
export default PlayerRoom;

