import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import gym from "../../assets/icons/gym.png";
import { setBodyPart, setExercises } from "../../features/exercises/exerciseSlice";
import { useQuery } from "@tanstack/react-query";
import { fetchBackendData } from "../../utils/api";

import { Link as ScrollLink } from "react-scroll";
import { baseURL } from "../../utils/constants";
import Loader from "../../utils/extras/Loader";
import { ExerciseRootState } from "../../types/reduxTypes";

interface BodyPartProps {
  item: string;
}

const BodyPart: React.FC<BodyPartProps> = ({ item }) => {
  const bodyPart = useSelector((state:ExerciseRootState)=>state.exercise.bodypart)
  const dispatch = useDispatch();

  const fetchExercises = async (bodyPart: string) => {
    
    const url =
      bodyPart === "all"
        ? `${baseURL}/exerciseData/getAllExercises`
        : `${baseURL}/exerciseData/getExerciseByBodyPart/${bodyPart}`;
    return fetchBackendData(url);
  };

  const { error, isLoading, data } = useQuery({
    queryKey: ["exercises", bodyPart],
    queryFn: ()=>fetchExercises(bodyPart),
    staleTime: Infinity,
    refetchOnMount:false,
  });

  useEffect(() => {
    if (data) {
      dispatch(setExercises(data));
    }
  }, [data, dispatch]);

  const handleClick = () => {
    dispatch(setBodyPart(item));
  };

  if(isLoading){
    return <div className="flex items-center justify-center">
      <Loader/>
      </div>
  }

  if(error){
    return <div className="text-red-500 text-center">Error loading data</div>;
  }
  return (
    <ScrollLink
    to="exercises"
    smooth={true}
    duration={1500}
    className="cursor-pointer"
  >
    
    <div
      onClick={handleClick}
      >
      <div
        className={`flex justify-center items-center p-10 cursor-pointer ${
          bodyPart === item ? "border-t-4 border-red-400" : ""}`}
          >
        <div className="flex justify-center items-center h-20 w-20 bg-gray-200 rounded-full">
          <img src={gym} alt={item} className="size-10" />
        </div>
      </div>
      <p className="text-center text-[#3A1212] lg:text-2xl font-bold">
        {item.toUpperCase()}
      </p>
    </div>
        </ScrollLink>
  );
};

export default BodyPart;
