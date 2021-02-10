import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './chat.css'
import ChatBody from './components/ChatBody'
import Sidebar from './components/Sidebar'
import io from 'socket.io-client'

export default function Chat() {
  const [activeChat, setActiveChat]=useState()
  const [contacts, setContacts]=useState([])
  const [messages, setMessages]=useState([])
  const history = useHistory();

  if(sessionStorage.getItem('user_token')){
    const socket = io('http://127.0.0.1:4000', {
    auth: {
      token:sessionStorage.getItem('user_token')
      }
    })
    socket.on('not logged in', ()=>{
      sessionStorage.clear()
      history.push('/login')
    })
    socket.on('disconnect', function () {
      socket.removeAllListeners();
    }); 
    return (
      <div className="chat">
        <Sidebar 
          socket={socket} 
          activeChat={activeChat} 
          changeActive={(name)=>setActiveChat(name)}
          contacts={contacts}
          setContacts={setContacts}/>
        <ChatBody 
          socket={socket} 
          activeChat={activeChat}
          contacts={contacts}
          setContacts={setContacts}/>
      </div>
    )
  }else{
    history.push('/login')
    return(
      <div>Please log in</div>
    )
  }
}
