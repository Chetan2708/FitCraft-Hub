import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exercises: [],
    bodypart: "all"
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
        }
        
    }

})

export const { setExercises , setBodyPart  } = exerciseSlice.actions

export default exerciseSlice.reducer;