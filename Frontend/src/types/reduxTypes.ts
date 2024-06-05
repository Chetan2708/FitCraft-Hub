interface User {
    _id: string;
    name: string;
    email: string;
    pic: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    refreshToken: string;
    height:number;
    weight:number;
    bmi:number;
  }
  
export interface UserRootState {
    auth: {
      userData: User | null;
    };
  }




  export interface Exercise {
    id: string;
    _id: string;
    bodyPart: string;
    equipment: string;
    gifUrl: string;
    name: string;
    instructions: string[];
    secondaryMuscles: string[];
    target: string;
    __v: number; 
  }
  
  export interface ExerciseRootState {
    exercise: {
      exercises: Exercise[];
      bodypart: string;
    };
  }


  interface LikedExcercise {
    exerciseID: string;
    _id:string;
  }
  export interface LikedExerciseRootState {
    exercise: {
      likedExercises: LikedExcercise[];
    };
  }