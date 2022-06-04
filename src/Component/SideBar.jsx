import { Add, Apps, BookmarkBorder, Create, Drafts, ExpandLess, ExpandMore, FiberManualRecord, FileCopy, Inbox, InsertComment, PeopleAlt } from '@material-ui/icons'
import { collection } from 'firebase/firestore'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { auth, db } from './Firebase'
import SidebarOption from './SidebarOption'
function SideBar() {
    const [channels]=useCollection(collection(db,'room'))
    const [user]=useAuthState(auth)
 
   
   
  return (
    <SidebarContainer>
        <SideBarHeader>
            <SideBarInfo>
                <h2>PAPA FAM HQ</h2>
                <h3>
                    <FiberManualRecord/>
                    {user?.displayName}
                </h3>
            </SideBarInfo>
            <Create/>
        </SideBarHeader>


        <SidebarOption Icon={InsertComment} title='Threads'/>
        <SidebarOption Icon={Inbox} title='Mention & Reaction'/>
        <SidebarOption Icon={Drafts} title='Saved items'/>
        <SidebarOption Icon={BookmarkBorder} title='Channel Browser'/>
        <SidebarOption Icon={PeopleAlt} title='People & user groupe'/>
        <SidebarOption Icon={Apps} title='Apps'/>
        <SidebarOption Icon={FileCopy} title='File browser'/>
        <SidebarOption Icon={ExpandLess} title='Show Less'/>

        <hr/>
        <SidebarOption Icon={ExpandMore} title='Show More'/>
        <hr />
        <SidebarOption Icon={Add} addChannelOption title='Add Channel'/>
        {channels?.docs.map((doc)=>{
           
           return ( <SidebarOption key={doc.id}  title={doc.data().name} id={doc.id}/>)
          
        })}
       
    </SidebarContainer>
  )
}

export default SideBar

const SidebarContainer=styled.div`
color: #ffff;
background-color: var(--slack-clore);
flex: .3;
border-top: 1px solid #49274b;
max-width: 260px;
margin-top: 60px;
`
const SideBarHeader=styled.div`
display: flex;
border-bottom: 1px solid #49274b;
padding: 13px;
> .MuiSvgIcon-root{
    padding: 8px;
    color: #49274b;
    font-size: 16px;
    background-color: #fff;
    border-radius: 999px;
    
}
>hr{
    margin-top: 10px;
    margin-bottom: 10px;
    border:1px solid #49274b;
}
`
const SideBarInfo=styled.div`
flex: 1;
>h2{
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;

}
>h3>.MuiSvgIcon-root{
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
}
`
