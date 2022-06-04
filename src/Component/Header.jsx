import { Avatar } from '@material-ui/core';
import { AccessTime, HelpOutline, Search } from '@material-ui/icons';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth } from './Firebase';
import { signOut } from 'firebase/auth'


function Header() {
    const [user]=useAuthState(auth)

    
  return (
    <HeaderContainer>
        <HeaederLeft>
           <HeaderAvatar onClick={()=>signOut(auth)} src={user?.photoURL}
           alt={user?.displayName}/>
            <AccessTime/>
        </HeaederLeft>
        <HeaderSearch>
            <Search/>
            <input type="text" placeholder='Search...' />
        </HeaderSearch>
        <HeaderRight>
            <HelpOutline/>
        </HeaderRight>
    </HeaderContainer>
  )
}

export default Header;

const HeaderContainer= styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px 0;
position: fixed;
width: 100%;
color: white;
background-color: var(--slack-clore);
`
const HeaederLeft= styled.div`
flex:0.3;
display:flex;
align-items:center;

margin-left: 20px;
> .MuiSvgIcon-root{
    margin-left: auto;
    margin-right: 30px;

}`;

const HeaderAvatar=styled(Avatar)`
cursor: pointer;
 :hover{
     opacity: 0.8;
 }`;

 const HeaderSearch=styled.div`
 flex:0.4;
 opacity: 1;
 border-radius:6px;
 background-color: #421f44;
 text-align:center;
 display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;
  > input{
      background-color: transparent;
      border: none;
      text-align: center;
      min-width: 30vw;
      outline: 0;
      color: white;
  }
 `
 const HeaderRight=styled.div`
 flex:0.8;
 display: flex;
 align-items:flex-end;
 > .MuiSvgIcon-root{
     margin-left: auto;
     margin-right: 20px;
 }`