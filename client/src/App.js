import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Chat/Sidebar";
import Pusher from 'pusher-js';
import axios from './axios';
function App() {
  const [messages, setMessages] = useState([]);
  useEffect(()=>{
    axios.get('/messages/sync').then(response=>{
      setMessages(response.data);
    })
  },[])
  useEffect(()=>{
    //Pusher.logToConsole = true;

    const pusher = new Pusher('994c074305c3d6b5e741', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages,newMessage]);
      console.log(messages);
    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };
  },[messages]);
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>      
  );
}

export default App;
