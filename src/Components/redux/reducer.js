//this is our reducer or event handler of state
//we have two action which can make change in store
//first is for theme
//second is for fetching last three search history and save them continuously in local storage with id s -> 0, 1, 2
import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    login:JSON.parse(localStorage.getItem('logged')),
    holder:[]
};
export const torob_Slice = createSlice({
    name: "slice_for_torob",
    initialState,
    reducers: {
        changeLoginState: (state,action) => {
            if(action.payload===1){
                console.log("in store");
                state.login = true;
            }else{
                state.login = false;
            }
            window.localStorage.setItem('logged',JSON.stringify(state.login));
          },
          filterAndSave: (state,action) => {
            state.holder = action.payload.arr.filter(a=>a._id!==action.payload.target);
            console.log(action.payload.arr);
            console.log("popopo");
          }
      
    },
  });
  
  export const {changeLoginState,filterAndSave} = torob_Slice.actions;
  
  export default torob_Slice.reducer;
  