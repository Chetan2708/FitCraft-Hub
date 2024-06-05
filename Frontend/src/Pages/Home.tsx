import React from 'react';
import HeroBanner from '../components/Home/HeroBanner';
import SearchExercises from '../components/Home/SearchExercises';
import Exercise from '../components/Home/Exercise';

const Home : React.FC  = () => {  
 
  return (
    <div >
      <HeroBanner />
      <SearchExercises/>
      <Exercise/>
      </div>
  )
}

export default Home