import { async } from '@firebase/util';
import { Button } from '@material-ui/core';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, {  useState } from 'react'
import styled from 'styled-components'
import { auth, db } from './Firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({roomId,channelName, ChatRef }) {
    const [input,setinput]=useState('')
    const [user]=useAuthState(auth)
    const sendMessage= async e=>{
        e.preventDefault()
        
        if(!roomId){
            return false ;
        }
  await addDoc(collection(db,'room',roomId,'Messages'),{
           message:input,
           timestamp:Timestamp.fromDate(new Date),
           user:user.displayName,
           userImg:user.photoURL

       })
       setinput('')
       ChatRef?.current.scrollIntoView({
        behavior:'smooth'
    })
    }
  return (
    <ChatInputContainer>
        <form >
            <input type="text" value={input} onChange={e=>setinput(e.target.value)}
             placeholder={`Message #${channelName}`}/>
           <Button hidden type='submit' onClick={sendMessage}> Send</Button>
        </form>
    </ChatInputContainer>
  )
}

export default ChatInput
const ChatInputContainer=styled.div`
border-radius:20px;
>form{
    position: relative;
    display: flex;
    justify-content: center;

}
>form>input{
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
}
>form>button{
    display: none !important;
}`