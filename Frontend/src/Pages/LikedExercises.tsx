
import { fetchData } from '../utils/api';
import { baseURL } from '../utils/constants';
import { getAuthHeaders } from '../utils/api/options';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import ExerciseCard from '../components/Home/ExerciseCard';

const LikedExercises = () => {
  const {
    error,
    isLoading,
    data,
  } = useQuery({
    queryKey: ["watchList"],
    queryFn: () => fetchData(`${baseURL}/watchList/getWatchlist`, getAuthHeaders()),
  });
  const likedExercisesIds = data?.data?.exercises?.map((exercise) => exercise.exerciseID);
  console.log(likedExercisesIds)  
  const exercises = useSelector((state) => state.exercise.exercises);
  const likedExercises = exercises.filter(exercise => likedExercisesIds?.includes(exercise.id));
  console.log(likedExercises);


  return (
    <div className='grid 
    md:grid-cols-2
    lg:grid-cols-3
    '>
      {
        likedExercises.map((exercises)=>
        {
          return (
            <ExerciseCard
            key={exercises.id} 
            exercise={exercises} />
          )
        })
      }

    </div>
  )
}

export default LikedExercises