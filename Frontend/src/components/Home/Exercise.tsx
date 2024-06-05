import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExerciseCard from "./ExerciseCard";

import { motion } from "framer-motion";
import Pagination from "../../components/Pagination"; // Import the Pagination component

const Exercise: React.FC = () => {
  const exercises = useSelector((state) => state.exercise.exercises);
  const bodyPart = useSelector((state) => state.exercise.bodypart);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const exercisesPerPage: number = 9;

  // Calculate indexes for the exercises to display on the current page
  const indexOfLastExercise: number = currentPage * exercisesPerPage;
  const indexOfFirstExercise: number = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div id="exercises">
      <motion.h1
        className="text-5xl p-4 font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {`Showing ${capitalizeFirstLetter(bodyPart)} Exercises`}
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        paginate={paginate} 
      />
    </div>
  );
};

export default Exercise;
