import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectroomId } from '../features/appSlice'
import ChatInput from './ChatInput'
import {  useCollection, useDocument } from 'react-firebase-hooks/firestore'
import {   collection, doc, orderBy, query } from 'firebase/firestore';
import { db } from './Firebase';
import Message from './Message'

function Chat() {
    const ChatRef=useRef(null)

    const roomId=useSelector(selectroomId)
    const [roomDetails]=useDocument(
        roomId && doc(db,'room',roomId)
    )
    const [roomMessages,loading]=useCollection(
        roomId&& query(collection(db,'room',roomId,'Messages'),orderBy('timestamp','asc'))

    )
    useEffect(()=>{
       
        ChatRef?.current?.scrollIntoView({
            behavior:'smooth'
        })
    },[roomId,loading])
  


  return (
    
   
    <ChatContainer>
     {roomDetails && roomMessages&&( 
          <>
    <Header>
        <HeaderLeft>
            <h4>
                <strong>#{roomDetails?.data().name}</strong>
            </h4>
            <StarBorderOutlined/>
        </HeaderLeft>
        <HeaderRight>
            <p>
                <InfoOutlined/>Details
            </p>
        </HeaderRight>
       
    </Header>
    <ChatMessages>
        {roomMessages?.docs.map(doc=>{
            const {message,  timestamp,user,userImg} =doc.data()
            return(
                <Message
                key={doc.id}
                id={doc.id}
                message={message}
                timestamp={timestamp}
                user={user}
                userImg={userImg}
                />
            )

        })}
        <ChatBottom ref={ChatRef}/>
    </ChatMessages>
    <ChatInput
    ChatRef={ChatRef}
    roomId={roomId} 
    channelName={roomDetails?.data().name}/>
    </>)}
   
    
</ChatContainer>)

  
}

export default Chat
const ChatContainer=styled.div`
flex: .7;
flex-grow: 1;
overflow-y: scroll;
margin-top: 60px;
`
const Header=styled.div`
display: flex;
justify-content:space-between;
padding: 20px;
border-bottom:1px solid lightgray`;
const HeaderLeft=styled.div`
display: flex;
align-items: center;
>h4{
    display: flex;
    text-transform:lowercase;
    margin-right: 10px;

}
>h4>.MuiSvgIcon-root{
    margin-left: 10px;
    font-size: 10px;
}`
const HeaderRight=styled.div`
>p{
    display: flex;
    align-items: center;
    font-size: 14px;
}
>p>.MuiSvgIcon-root{
    margin-right: 5px !important;
    font-size: 16px;
}`
const ChatMessages=styled.div``
const ChatBottom=styled.div`
padding: 200px;
`