import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade,  Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-fade";
interface SwiperCarouselProps {
  items: { src: string; alt: string }[];
}
const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ items }) => {
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
      {items.map((item, index) => (
        <SwiperSlide key={index} >
          <div  >
          <img src={item.src} alt={item.alt} className=" h-[900px] p-2 rounded-3xl " />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCarousel;
