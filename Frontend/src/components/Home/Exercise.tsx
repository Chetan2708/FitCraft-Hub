import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExerciseCard from "./ExerciseCard";
import Loader from "../../utils/extras/Loader";
import { motion } from "framer-motion";
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

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  function capitalizeFirstLetter(string) {
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
      <div className="flex justify-center m-8">
        <ul className="flex flex-wrap space-x-4 justify-center">
          <li className="flex items-center justify-center shrink-0 bg-gray-300 w-10 h-10 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-gray-400"
              viewBox="0 0 55.753 55.753"
            >
              <path
                d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                data-original="#000000"
              />
            </svg>
          </li>
          {[...Array(Math.ceil(exercises.length / exercisesPerPage))].map(
            (_, index) => (
              <li
                key={index}
                className={`flex items-center justify-center shrink-0 ${
                  currentPage === index + 1
                    ? "bg-blue-500 border-2 border-blue-500 cursor-pointer text-base font-bold text-white"
                    : "hover:bg-gray-50 border-2 cursor-pointer text-base font-bold text-[#333]"
                } w-10 h-10 rounded-lg`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </li>
            )
          )}
          <li className="flex items-center justify-center shrink-0 hover:bg-gray-50 border-2 cursor-pointer w-10 h-10 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-gray-400 rotate-180"
              viewBox="0 0 55.753 55.753"
            >
              <path
                d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                data-original="#000000"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Exercise;
