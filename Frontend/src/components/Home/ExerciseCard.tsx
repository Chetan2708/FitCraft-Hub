import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../utils/components/ui/button";
import TiltCard from "./TiltCard";
import { FcLike } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";
import { fetchPostData, fetchData } from "../../utils/api";
import { baseURL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLikedExercises } from "../../features/exercises/exerciseSlice";
import { getAuthHeaders } from "../../utils/api/options";
import { useQuery } from "@tanstack/react-query";
import {
  LikedExerciseRootState,
  UserRootState,
} from "../../types/reduxTypes";

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

  // Initial fetch only once
  const { data } = useQuery({
    queryKey: ["watchList"],
    queryFn: () =>
      fetchData(`${baseURL}/watchList/getWatchlist`, getAuthHeaders()),
  });

  useEffect(() => {
    if (data) {
      dispatch(setLikedExercises(data.data.exercises));
    }
  }, [data, dispatch]);

  const likedExercises = useSelector(
    (state: LikedExerciseRootState) => state.exercise.likedExercises
  );
  const user = useSelector((state: UserRootState) => state.auth.userData);
  const likedExercisesIds = likedExercises?.map((ex) => ex.exerciseID);

  useEffect(() => {
    if (!user) {
      setLiked(false);
      return;
    }
    setLiked(likedExercisesIds?.includes(exercise.id) || false);
  }, [likedExercisesIds, exercise.id, user]);

  const toggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!user) {
      navigate("/auth");
      return;
    }

    // 🟢 Optimistically update UI + Redux
    setLiked((prev) => !prev);
    dispatch(
      setLikedExercises(
        liked
          ? likedExercises.filter((ex) => ex.exerciseID !== exercise.id)
          : [...likedExercises, { exerciseID: exercise.id }]
      )
    );

    try {
      if (!liked) {
        await fetchPostData(`${baseURL}/watchList/addWatchlist`, {
          exerciseID: exercise.id,
        });
      } else {
        await fetchPostData(`${baseURL}/watchList/removeWatchlist`, {
          exerciseID: exercise.id,
        });
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);

      // 🔴 Revert UI if API fails
      setLiked((prev) => !prev);
      dispatch(
        setLikedExercises(likedExercises) // revert to previous list
      );
    }
  };

  const handleExercise = () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    navigate(`/exercise/${exercise.id}`);
  };

  return (
    <TiltCard>
      <div
        className="relative rounded-2xl shadow-lg bg-white m-4 overflow-hidden transform transition duration-300 min-w-[280px]"
        onClick={handleExercise}
      >
        <div className="relative">
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            loading="lazy"
            className="w-full h-72 object-contain"
          />
        </div>

        <div className="flex justify-between p-8 flex-wrap">
          <div className="flex gap-4 items-center">
            <Button className="bg-[#FCC757]">
              {exercise.target.toUpperCase()}
            </Button>
            <Button className="bg-[#ee9eab]">
              {exercise.bodyPart.toUpperCase()}
            </Button>
          </div>

          <div className="mt-4 sm:mt-0">
            <Button onClick={handleExercise}>View Exercise</Button>
          </div>
          <button
            onClick={(e) => toggleLike(e as any)}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label={liked ? "Unlike exercise" : "Like exercise"}
          >
            {liked ? <FcLike className="w-6 h-6" /> : <IoMdHeartEmpty className="w-6 h-6 text-gray-400" />}
          </button>
        </div>
      </div>
    </TiltCard>
  );
};

export default ExerciseCard;
