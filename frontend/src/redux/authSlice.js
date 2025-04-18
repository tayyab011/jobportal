 import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
 name : "auth",
 initialState:{
    loading :false,
    user:null
 },
 reducers:{
    //action
    setLoading:(state,action)=>{
        state.loading =action.payload
    },
    setUser:(state,action)=>{
      state.user =action.payload
    }
 }
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
 
/* import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload?.token) {
        localStorage.setItem("token", action.payload.token); // Save token
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
 */