import { createSlice } from "@reduxjs/toolkit";


export const appSlice=createSlice({
    name:'app',
    initialState:{
        roomId:null,
    },
    reducers:{
        EnterRoom:(state,action)=>{
            state.roomId=action.payload.roomId
        }
       
    }
})
export const {EnterRoom}=appSlice.actions
export const selectroomId=state=>state.app.roomId
export default appSlice.reducer