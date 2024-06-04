import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade,  Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-fade";
import { useQuery } from "@tanstack/react-query";
import { exercisedburl } from "../../utils/constants";
import { exerciseApiOptions } from "../../utils/api/options";
import { fetchData } from "../../utils/api";
import ExerciseCard from "../Home/ExerciseCard";

interface SwiperCarouselProps {
    data: string;
}

const SimilarCarousel: React.FC<SwiperCarouselProps> = ({ data }) => {
    const {
        error: exerciseError,
        isLoading: exerciseLoading,
        data: exerciseData,
      } = useQuery({
        queryKey: ["similarExercise", data],
        queryFn: () =>
          fetchData(
            `${exercisedburl}/exercises/target/${data}`,
            exerciseApiOptions
          ),
        staleTime: 20000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      });

    return (
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect={"fade"}
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
      >
        
      {exerciseData?.map((exercise) => (
        <SwiperSlide key={exercise.id}>
          <ExerciseCard exercise={exercise} /> 
        </SwiperSlide>
      ))}
      
      </Swiper>
    );
  };
  

export default SimilarCarousel