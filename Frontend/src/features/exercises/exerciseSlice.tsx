import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exercises: [],
    bodypart: "all",
    likedExercises:[]
}

export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        setExercises: (state, action) => {
            state.exercises = action.payload
        },
        setBodyPart:(state , action)=>{
            state.bodypart = action.payload
        },
        setLikedExercises:(state , action)=>{
            state.likedExercises = action.payload
        },

        //reset liked
        resetLikedExercises:(state)=>{
            state.likedExercises = []
        }
        
    }

})

export const { setExercises , setBodyPart,  setLikedExercises ,  resetLikedExercises } = exerciseSlice.actions

export default exerciseSlice.reducer;