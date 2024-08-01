import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    // Initially the state login is false meanse no user are login // 
    initialState:{isLoggedIn:false,role:'user'},

    // Reducers function for login the user and change it's role //
    reducers:{
        login(state){
            state.isLoggedIn = true
        },
        logout(state){
            state.isLoggedIn = false
        },
        changeRole(state,action){
             const role = action.payload;
             state.role = role;

        }
    }
});

export const authAction = authSlice.actions;
export default authSlice.reducer;