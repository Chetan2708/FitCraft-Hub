import SimilarCarousel from "./SimilarCarousel";

interface ExerciseData {
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    id: string;
    instructions: string[];
    name: string;
    secondaryMuscles: string[];
    target: string;
  }
  
  interface SimilarExerciseProps {
    exerciseData: ExerciseData;
  }
const SimilarExercise:React.FC<SimilarExerciseProps> = ({exerciseData}) => {
  return (
    <div>
      <h1>
        Exercise targeting same muscle group 
      </h1>
      <div>
        {exerciseData.target.length && <SimilarCarousel data ={exerciseData.target}/>}
      </div>
    </div>
  )
}

export default SimilarExercise