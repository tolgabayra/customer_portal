import {createSlice} from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user:  localStorage.getItem("bayi_id") ?? false, 
        token: "",
        name: "",
        adminuser: localStorage.getItem("admin") ?? false
        
    },

    reducers:{
       login: (state) =>{
          state.user = true
       },
       admin_login: (state)=>{
         state.adminuser = true
       },
       logout: (state) =>{
          state.user = false
       },
       setToken :(state, action)=>{
          state.token = action.payload
       },
       setName :(state, action)=>{
         state.name = action.payload
      },
       
    }
});

export const {login, logout, setToken, setName, admin_login} = authSlice.actions
export default authSlice.reducer