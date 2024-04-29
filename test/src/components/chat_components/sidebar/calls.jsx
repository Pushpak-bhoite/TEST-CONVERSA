import React, { useEffect, useState } from "react";
import SingleChat from "./single_chat";
import { useDispatch, useSelector } from "react-redux";
import { SocketContextProvider, useSocketContext } from "../../../socket/socketConnection";
import { load_chats, set_messages, set_selected_chatid } from "../../actions/actions";
import SingleCall from "./single_call";

function Calls(){
  const search_users=useSelector(state=>state.search_user);
  const user_data=useSelector(state=>state.user_data);
  const {socket,online_users}=useSocketContext();
  const dispatch=useDispatch();
  const chats=useSelector(state=>state.chats);
   
  let [messages,setMessages]=useState("")
  let[chat_id,setChatID]=useState("")

  useEffect(()=>{},[chats])

useEffect(()=>{
  socket.emit("get_chats",user_data._id);
  socket.on("get_user_chats",data=>{dispatch(load_chats(data))})
},[user_data])

useEffect(()=>{
  if(chats){
    if(chats.length!==0){
      chats.forEach((item)=>{
        const details={login_user:user_data._id,chat_id:item._id}
        socket.emit("get_messages_user",details)
        socket.on("receive_messsages",data=>{if(data!==null){setChatID(data.chat_id);setMessages(data.messages)}});
      });
    }
  }
},[chats])

useEffect(()=>{
    dispatch(set_messages(messages,chat_id))
},[messages])

  useEffect(()=>{},[search_users])

  if(Object.keys(search_users).length!==0){
    return (
      <div className="chat-sidebar-channel scroller mt-4 pl-3">
        <ul className="iq-chat-ui nav flex-column nav-pills">
          {Object.values(search_users).map((item)=>{return <SingleCall item={item} user={user_data}/>})}
        </ul>
      </div>
    );
  }
  else if(chats){
    if(chats.length!==0){
    return (
      <div className="chat-sidebar-channel scroller mt-4 pl-3">
        <ul className="iq-chat-ui nav flex-column nav-pills">
          {chats.map((item)=>{return <SingleCall item={item} user={user_data}/>})}
        </ul>
      </div>
    );
    }
  }
  else{
    return (
        <div></div>
    );}
}

export default Calls;