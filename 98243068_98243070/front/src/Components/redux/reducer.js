//this is our reducer or event handler of state
//we have two action which can make change in store
//first is for theme
//second is for fetching last three search history and save them continuously in local storage with id s -> 0, 1, 2
import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';
const initialState ={
    login:JSON.parse(localStorage.getItem('logged')),
    holder:[],
    update:false,
    update1:false,
    update2:false,
    isStoreman:JSON.parse(localStorage.getItem('storeOwn'))
};
const cookies = new Cookies();
export const torob_Slice = createSlice({
    name: "slice_for_torob",
    initialState,
    reducers: {
        changeLoginState: (state,action) => {
            if(action.payload===1){
                console.log("in store");
                state.login =true ;
                state.isStoreman = cookies.get("isStoreOwner");
            }else{
                state.login = false;
            }
            window.localStorage.setItem('logged',JSON.stringify(state.login));
            window.localStorage.setItem('storeOwn',JSON.stringify(state.isStoreman));
          },
          filterAndSave: (state,action) => {
            state.holder = action.payload.arr.filter(a=>a._id!==action.payload.target);
            console.log(action.payload.arr);
            console.log("popopo");
          },
          updateCaategory: (state) => {
           state.update = state.update===true?false:true;
          },updateCaategory1: (state) => {
            state.update1 = state.update1===true?false:true;
           },updateCaategory2: (state) => {
            state.update2 = state.update2===true?false:true;
           }
      
    },
  });
  
  export const {changeLoginState,filterAndSave,updateCaategory,updateCaategory1,updateCaategory2} = torob_Slice.actions;
  
  export default torob_Slice.reducer;
  