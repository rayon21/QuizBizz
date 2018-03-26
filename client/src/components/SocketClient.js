import React, { Component } from "react";
import io from "socket.io-client";

class SocketClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: "http://localhost:8888",
      playerName: "",
      roomId: "",
      validId: true
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
    e.preventDefault();
    const body = e.target.value;
    console.log(body);

    var data = {
    // needs to be elements from the forms, not random data
      roomId : this.state.roomId,
      playerName : this.state.playerName
    };

    // Send the gameId and playerName to the server
    var isValid;
    var r = this;

    this.socket.emit('playerJoinGame', data, function(data){
      if(data.valid){
        // show the button linked to the socket
        console.log("VALID");
        r.props.history.push("/play/" + r.state.roomId + "/@" + r.state.playerName);

      } else {
        console.log("NOT VALID");
        isValid = false;
      }
    });

    this.setState({validId: isValid});
  }

  render() {
    const { validId } = this.state;
    var errColor = {color:"red"};
    return (
      <div style={{ textAlign: "center" }} className="joinRoomBox room-code-bg">

        <div className=" mb-3 mt-4">
        <div className="col-sm-4 offset-sm-4 border pb-3 pt-4 mb-3 room-code-container">
          <h3>Get Started</h3>
          <form action="" className="mb-3">
            <div className="form-group">
              <label>Room Code</label>
              <input type="text" className="form-control" placeholder="Enter Name..." onChange={this.handleChange('playerName')}/>
              <input type="text" className="form-control" placeholder="Enter code..." onChange={this.handleChange('roomId')}/>

            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Enter</button>
          </form>
          {validId
            ? <p>(4 character code)</p>
            : <p style={errColor}>Not Valid</p>

          }
        </div>
      </div>
      </div>
    );
  }
}
export default SocketClient;