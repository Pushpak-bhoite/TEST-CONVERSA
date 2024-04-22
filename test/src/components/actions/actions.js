
export const init_user=(user_data)=>({
    type:'INIT_USER',
    user_data
})

export const search_user=(search_user_data)=>({
    type:'SEARCHUSER',
    search_user_data
})

export const load_chats=(all_chats)=>({
    type:'LOADCHATS',
    all_chats
})

export const set_selected_chat=(selected_chat)=>({
    type:'SETSELECTEDCHAT',
    selected_chat
})

export const set_messages=(set_messages,chat_id)=>({
    type:'SETMESSAGES',
    set_messages,
    chat_id
})

export const set_selected_chatid=chat_id=>({
    type:'SELECTEDCHATID',
    chat_id
})