let initial_state={
    user_data:{},
    search_user:{},
    selected_chat:{},
    selected_chat_id:null,
    chats:[],
    messages:{},
    unseen_chats:{}
}
const reduce=(state=initial_state,action)=>{
    switch(action.type){
        case 'INIT_USER':
            return {...state,
                    user_data:{...action.user_data}
            }
        case 'SEARCHUSER':
            return {...state,search_user:{...action.search_user_data}}
        case 'SETSELECTEDCHAT':
            return {...state,selected_chat:{...action.selected_chat}}
        case 'LOADCHATS':
            return {...state,chats:action.all_chats}
        case 'SELECTEDCHATID':
            return {...state,selected_chat_id:action.chat_id}
        case 'SETSEEN':
            return {...state,unseen_chats:{...state.unseen_chats,[action.chat_id]:0}}
        case 'SETMESSAGES':
            const msgs=[]
            let chat_id;
            let new_unseen_chats=0;
            if(action.chat_id){
                chat_id=action.chat_id
            }
            else if(action.set_messages.chat_id){
                chat_id=action.set_messages.chat_id
            }

            if(action.set_messages===""){
                return {...state,messages:{}}
            }
            else{
                if(state.messages[chat_id]){
                    new_unseen_chats=action.set_messages.sender!==state.user_data._id?state.unseen_chats[chat_id]+1:state.unseen_chats[chat_id];
                    state.messages[chat_id].forEach((msg)=>{msgs.push(msg)})
                msgs.push(action.set_messages)
                return {...state,messages:{...state.messages,[chat_id]:msgs},unseen_chats:{...state.unseen_chats,[chat_id]:new_unseen_chats}}
            }

            (action.set_messages).forEach(item=>{
                if(!item.receivedAt){
                    if(item.sender!==state.user_data._id){
                        new_unseen_chats=new_unseen_chats+1;
                    }
                }
            })
            console.log("new_unseen_message",new_unseen_chats)
                return {...state,messages:{...state.messages,[chat_id]:action.set_messages},unseen_chats:{...state.unseen_chats,[chat_id]:new_unseen_chats===0?0:new_unseen_chats}}
            }
        default: return state
    }
}

export default reduce;