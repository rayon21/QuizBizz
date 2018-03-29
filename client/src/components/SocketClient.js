import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import io from "socket.io-client";

class SocketClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: '/',
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

    this.socket.emit('checkRoomId', data, function(data){
      if(data.valid){
        // show the button linked to the socket
        // console.log("VALID");
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

        <div className="pt-5 container d-flex col-md-12 justify-content-center">
        <div className="col-sm-4 pb-3 pt-4 mb-3 room-code-container">
          <h3>Join a Quiz</h3>
          <form action="" className="mb-3 mr-4 ml-4">
            <TextField
                fullWidth
                type="text"
                label="Enter your name"
                margin="normal"
                onChange={this.handleChange('playerName')}
              />
              <TextField
                fullWidth
                type="text"
                label="Room code"
                margin="normal"
                onChange={this.handleChange('roomId')}
              />
            <button type="submit" className="btn btn-primary text-center mt-3" onClick={this.handleSubmit}>Enter</button>
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