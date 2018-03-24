import React, { Component } from "react";
import io from "socket.io-client";

class SocketClient extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8888",
      playerName: "",
      roomId: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }

// need to do this when the user presses enter on the form 
  componentDidMount() {
    const { endpoint } = this.state;
    this.socket = io(endpoint);
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit(e){
      const body = e.target.value;
      console.log(body);

      var data = {
      // needs to be elements from the forms, not random data
        roomId : this.state.roomId,
        playerName : this.state.playerName
      };

      // Send the gameId and playerName to the server
      
      this.socket.emit('playerJoinGame', data);
      e.target.value = '';
    }
  

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              Not a Valid room Key: {response} 
            </p>
          : <p>Enter Room Key</p>}

        <div className="container mb-3">
        <div className="col-sm-4 offset-sm-4 border pb-3 pt-4 mb-3">
          <h3>Get Started</h3>
          <form action="" className="mb-3">
            <div className="form-group">
              <label>Room Code</label>
              <input type="text" className="form-control" placeholder="Enter Name..." onChange={this.handleChange('playerName')}/>
              <input type="text" className="form-control" placeholder="Enter code..." onChange={this.handleChange('roomId')}/>

            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Enter</button>
          </form>
        </div>
      </div>
      </div>
    );
  }
}
export default SocketClient;