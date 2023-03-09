import React, { useEffect, useState } from 'react'
import Scrolltobottom from "react-scroll-to-bottom"
const Chat = ({socket ,username, room}) => {
    const [currentmessage,setcurrentmessage]= useState("")
    const [messagelist,setmessagelist]= useState([])
    const sendmessage = async () => {
        if( !currentmessage== "") {
         const messagedata = {
            room:room,
            author:username,
            message:currentmessage,
            time :
           new Date().toLocaleTimeString()
         }

         await socket.emit("send_message",messagedata)
         setmessagelist((list) => [ ...list, messagedata])
         setcurrentmessage('')
        }
    }
    useEffect ( () =>{
        socket.on("recieve_message", (data) =>{
       setmessagelist((list) => [ ...list, data])

        })
    },[socket])
  return (
    <div className='chat-window'>
      <div className="chat-header"> 
      <p> Live chat</p> </div>
      <div className="chat-body">
        <Scrolltobottom className="message-container">
        {messagelist.map ( (m) => {
            return (
                <div className="message"
                id={username== m.author ? "you" : "other"}
                >
                    <div>
                        <div className="message-content">
                            <p> {m.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{m.time}</p>
                            <p id ="author"> {m.author}</p>
                        </div>
                    </div>
                </div>
        )}
        )}
        </Scrolltobottom>
      </div>
      <div className="chat-footer">
        <input type="text" value={currentmessage} placeholder="type a message ..." onChange={(event) => {setcurrentmessage(event.target.value)}}></input>
        <button onClick={sendmessage}>&#9658;</button>
        
      </div>
      
    </div>
  )
}

export default Chat
