import React, { useState } from 'react'
import { Lobby } from './Components/Lobby'
import {HttpTransportType, HubConnectionBuilder, LogLevel, } from "@microsoft/signalr";
import Chat from './Components/Chat';


const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const joinRoom = async (user, room)=>{
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44377/chat", {skipNegotiation:true, transport: HttpTransportType.WebSockets})
        .configureLogging(LogLevel.Information)
        .build();
      
      
      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
      });

      connection.on("UsersInRoom", (users)=>{
        setUsers(users);
      })

      connection.onclose(e=>{
        setConnection();
        setMessages([]);
        setUsers([]);
        setCurrentUser();
      })

      await connection.start();
      setCurrentUser(user);
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);

    } catch (error) {
      console.log("errora düştü")
      console.log(error.message)
    }
  }

  const closeConnection = async ()=>{
    try {
      await connection.stop()
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='app'>
        <h2>
          SignalR Chat
        </h2>
        <hr className='line' />
        
        {
          !connection 
          ? <Lobby joinRoom={joinRoom} />
          : <Chat messages={messages} sendMessage={sendMessage} closeConnection={closeConnection} users={users} currentUser={currentUser}/> 
        }
    </div>
  )
}

export default App
