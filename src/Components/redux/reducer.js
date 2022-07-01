//this is our reducer or event handler of state
//we have two action which can make change in store
//first is for theme
//second is for fetching last three search history and save them continuously in local storage with id s -> 0, 1, 2
import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    login:false
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
          }
      
    },
  });
  
  export const {changeLoginState} = torob_Slice.actions;
  
  export default torob_Slice.reducer;
  