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
import { LikedExerciseRootState, UserRootState } from "../../types/reduxTypes";

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
  const {  data, refetch } = useQuery({
    queryKey: ["watchList"],
    queryFn: () =>
      fetchData(`${baseURL}/watchList/getWatchlist`, getAuthHeaders()),
  });

  useEffect(() => {
    if (data) {
      dispatch(setLikedExercises(data.data.exercises));
    }
  }, [data, dispatch]);

  const likedExercises = useSelector((state:LikedExerciseRootState) => state.exercise.likedExercises);
  const user = useSelector((state:UserRootState) => state.auth.userData);
  const likedExercisesIds = likedExercises?.map(
    (exercise) => exercise.exerciseID
  );

  useEffect(() => {
    //if no user empty all likes
    if (!user) {
      setLiked(false);
      return;
    }
    if (likedExercisesIds?.includes(exercise.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likedExercisesIds, exercise.id]);

  const toggleLike = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    //if user instead signup page
    if (!user) {
      navigate("/auth");
      return;
    }

    setLiked((prevLiked) => !prevLiked);

    if (!liked) {
      await fetchPostData(`${baseURL}/watchList/addWatchlist`, {
        exerciseID: exercise.id,
      });
    } else {
      await fetchPostData(`${baseURL}/watchList/removeWatchlist`, {
        exerciseID: exercise.id,
      });
    }
    refetch();
  };

  const handleExercise = () => {
    navigate(`/exercise/${exercise.id}`);
  };

  return (
    <TiltCard>
      <div className="relative rounded-2xl shadow-lg bg-white m-4 overflow-hidden transform transition duration-300 min-w-[280px]">
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
          <div
            className="absolute top-0 right-0 p-3  mr-1    bg-slate-200 "
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 49% 53%, 0 100%, 0 0)",
            }}
          >
            <label className="like-container ">
              <input type="checkbox" checked={liked} onChange={toggleLike} />
              
                {liked ? <FcLike  className="mb-4"/> : <IoMdHeartEmpty className="mb-4" />}
              
            </label>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default ExerciseCard;
