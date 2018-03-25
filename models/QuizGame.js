var io;
var gameSocket;
var {generateCode} = require('./roomCode');
var codeArr = ["bitch"];

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */


 exports.initQuizzes = function(sio, socket){
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', { message: "You are connected!" });

    // Host Events
    gameSocket.on('createNewQuiz', createNewQuiz);

    // Player Events
    gameSocket.on('playerJoinGame', playerJoinGame);
    gameSocket.on('playerPushButton', playerPushButton);

}

// CONNECT to Socket and emit 'createNewQuiz', it will return the socket id and the room code
function createNewQuiz() {

	var roomID = generateCode(codeArr);
	codeArr.push(roomID);
	console.log("room created " + roomID);

	this.emit('quizCreated', {roomID: roomID, mySocketId: this.id});
	this.join(roomID);
}

function playerJoinGame(data,fn) {
    console.log('Player ' + data.playerName + ' attempting to join game: ' + data.roomId );

    // A reference to the player's Socket.IO socket object
    var sock = this;

    // Look up the room ID in the Socket.IO manager object.
    //var room = gameSocket.rooms[data.gameId];

    // If the room exists...
    if(codeArr.includes(data.roomId)){
        // attach the socket id to the data object.
        data.mySocketId = sock.id;

        // Join the room
        sock.join(data.roomId);

        //console.log('Player ' + data.playerName + ' joining game: ' + data.gameId );

        // Emit an event notifying the clients that the player has joined the room.
        io.sockets.in(data.roomId).emit('playerJoinedRoom', data);
        fn({valid:true});

    } else {
        // Otherwise, send an error message back to the player.
        // this.emit('error',{message: "This room does not exist."} );
        console.log("ROOM: " + data.roomId + " DOES NOT EXIST");
        fn({valid:false});
    }
}

function playerPushButton(data) {
    // console.log('Player ID: ' + data.playerId + ' answered a question with: ' + data.answer);

    // Emit an event with the answer so it can be checked by the 'Host'
    io.sockets.in(data.roomId).emit('joinQuizQueue', data);
}






