import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class SocketClient extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:8888"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
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
              <input type="text" className="form-control" placeholder="Enter code..." onChange={this.handleEmail}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.register}>Enter</button>
          </form>
        </div>
      </div>
      </div>
    );
  }
}
export default SocketClient;