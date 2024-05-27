import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../utils/components/ui/button";
import TiltCard from "./TiltCard";
import { FcLike } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";
import { fetchData, fetchPostData } from "../../utils/api";
import { baseURL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLikedExercises } from "../../features/exercises/exerciseSlice";
import { getAuthHeaders } from "../../utils/api/options";
import { useQuery } from "@tanstack/react-query";

interface Exercise {
  id: string;
  bodyPart: string;
  target: string;
  gifUrl: string;
  name: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  const {
    error,
    isLoading,
    data,
    refetch, 
  } = useQuery({
    queryKey: ["watchList"],
    queryFn: () => fetchData(`${baseURL}/watchList/getWatchlist`, getAuthHeaders()),
  });

  useEffect(() => {
    if (data) {
      dispatch(setLikedExercises(data.data.exercises));
    }
  }, [data, dispatch]);

  const likedExercises = useSelector((state) => state.exercise.likedExercises);
  const likedExercisesIds = likedExercises?.map((exercise) => exercise.exerciseID);

  useEffect(() => {
    if (likedExercisesIds?.includes(exercise.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likedExercisesIds, exercise.id]);

  const toggleLike = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setLiked((prevLiked) => !prevLiked);

    if (!liked) {
      await fetchPostData(`${baseURL}/watchList/addWatchlist`, { exerciseID: exercise.id });
    } else {
      
      await fetchPostData(`${baseURL}/watchList/removeWatchlist`, { exerciseID: exercise.id });
    }
    refetch();  
  };

  const handleExercise = () => {
    navigate(`/exercise/${exercise.id}`);
  };

  return (
    <TiltCard>
      <div className="rounded-2xl shadow-lg bg-white m-4 overflow-hidden transform transition duration-300">
        <div className="relative">
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            loading="lazy"
            className="w-full h-72 object-contain"
          />
        </div>
        <div className="flex justify-between items-center p-8">
          <div className="flex gap-4 items-center">
            <Button className="bg-[#FCC757]">{exercise.target.toUpperCase()}</Button>
            <Button className="bg-[#ee9eab]">{exercise.bodyPart.toUpperCase()}</Button>
          </div>
          <div className="flex gap-4 items-center">
            <Button onClick={handleExercise}>View Exercise</Button>
            <label className="like-container">
              <input type="checkbox" checked={liked} onChange={toggleLike} />
              <div className="flex items-center justify-center">
                {liked ? <FcLike /> : <IoMdHeartEmpty />}
              </div>
            </label>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default ExerciseCard;
