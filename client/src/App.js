import io from "socket.io-client"
import { useState } from "react";
import Chat from "./Chat"
import './App.css';

const socket = io.connect("http://localhost:3001")
function App() {
  const [username,setusername]=useState("")
  const [room,setroom]=useState('')
  const [showchat,setshowchat]=useState(false)
  const joinroom = () => {
    if( username !== "" && room !== "") {
      socket.emit("join_room", room)
      setshowchat(true)
    }
    }
    return (
    <div className="App">
      { !showchat ? 
      <div className="joinChatContainer">
     <h3>Join a Room</h3>
     <input type="text" placeholder="john ... " onChange={(event) =>{setusername(event.target.value)}} />
     <input type="text" placeholder="Room ID ... " onChange={(event) =>{setroom(event.target.value)}} />
     <button onClick={joinroom}> Join a Room</button>
     </div>
     :
     <Chat socket ={socket} username={username} room={room}/>
      }
    </div>
  );
}

export default App;
