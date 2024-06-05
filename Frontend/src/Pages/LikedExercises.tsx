
import { fetchData } from '../utils/api';
import { baseURL } from '../utils/constants';
import { getAuthHeaders } from '../utils/api/options';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import ExerciseCard from '../components/Home/ExerciseCard';
import Loader from '../utils/extras/Loader';
import { ExerciseRootState } from '../types/reduxTypes';

const LikedExercises:React.FC =  () => {
  const {
    error,
    isLoading,
    data,
  } = useQuery({
    queryKey: ["watchList"],
    queryFn: () => fetchData(`${baseURL}/watchList/getWatchlist`, getAuthHeaders()),
  });
  const likedExercisesIds = data?.data?.exercises?.map((exercise:any) => exercise.exerciseID);
  const exercises = useSelector((state:ExerciseRootState) => state.exercise.exercises);
  const likedExercises = exercises.filter(exercise => likedExercisesIds?.includes(exercise.id));
 
  if (isLoading) {
 return   <Loader/>
  }

  if (error) {
    return <div className="text-red-500 text-center">Error loading data</div>;
  }


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