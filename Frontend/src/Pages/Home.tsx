import React from 'react';
// import  { useState } from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import SearchExercises from '../components/Home/SearchExercises';
import Exercise from '../components/Home/Exercise';

const Home : React.FC  = () => {  
  // const [bodyPart, setBodyPart] = useState("all");
  return (
    <div className=''>
      <HeroBanner />
      <SearchExercises
      // setExercise={setExercise}
      // bodyPart={bodyPart}
      // setBodyPart={setBodyPart}
      />
      <Exercise
            // setExercise={setExercise}
            // bodyPart={bodyPart}
            // exercise = {exercise}
            />
      </div>
  )
}

export default Home