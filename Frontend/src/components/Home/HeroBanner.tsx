// import React from "react";
// import Carousel from "./SwiperCarousel";

// // Import your images
// import SwiperCarousel from "./SwiperCarousel";
// import { useQuery } from "@tanstack/react-query";
// import { fetchData } from "../../utils/api";
// import { baseURL } from "../../utils/constants";
// import { getAuthHeaders } from "../../utils/api/options";

// import { useDispatch } from "react-redux";

// // Create an array of image data
// const heroImages = [
//   { src: HeroBanner1, alt: "hero-banner-1" },
//   { src: HeroBanner2, alt: "hero-banner-2" },
//   { src: HeroBanner3, alt: "hero-banner-3" },
//   { src: HeroBanner4, alt: "hero-banner-3" },
//   { src: HeroBanner5, alt: "hero-banner-3" },
//   { src: HeroBanner6, alt: "hero-banner-6" },
// ];

// const HeroBanner: React.FC = () => {

//   return (
//     <div className="flex justify-center items-center mt-10 lg:justify-evenly">
//       <div className="flex flex-col justify-center items-center gap-8">
//         <h1 className="font-bold text-red-600 text-4xl lg:text-6xl">
//           FitCraft Hub
//         </h1>
//         <em className="font-semibold text-40 lg:text-30 mb-23 mt-30 text-2xl lg:text-4xl">
//           Strive for progress,
//           <br /> not perfection.
//         </em>
//         <p className="text-xl lg:text-2xl">
//           Check out the best muscle building exercises
//         </p>
//         <button className="bg-red-500 p-4 w-1/2 rounded-2xl text-white hover:bg-red-400">
//           Explore Exercises
//         </button>
//         <h1 className="font-bold text-red-700 opacity-10 text-8xl lg:text-[180px]">
//           Exercise
//         </h1>
//       </div>
//       <div className="w-full max-w-xl">
//         <SwiperCarousel items={heroImages} />
//       </div>
//     </div>
//   );
// };

// export default HeroBanner;

import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../../utils/components/ui/image-slider";
import HeroBanner1 from "../../assets/images/HeroBanner1.jpg";
import HeroBanner2 from "../../assets/images/HeroBanner2.jpg";
import HeroBanner3 from "../../assets/images/HeroBanner3.jpg";
import HeroBanner4 from "../../assets/images/HeroBanner4.jpg";
import HeroBanner5 from "../../assets/images/HeroBanner5.jpg";
import HeroBanner6 from "../../assets/images/HeroBanner6.jpg";
import { Link as ScrollLink } from "react-scroll";
const HeroBanner: React.FC = () => {
  const images = [
    HeroBanner1,
    HeroBanner2,
    HeroBanner3,
    HeroBanner4,
    HeroBanner5,
    HeroBanner6,
  ];
  return (
    <ImagesSlider className="h-[60rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <div className="flex justify-center items-center mt-10 lg:justify-evenly text-white">
          <div className="flex flex-col justify-center items-center gap-8">
            <motion.h1
              className="font-bold text-red-600 text-4xl lg:text-6xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              FitCraft Hub
            </motion.h1>

            <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
              Strive For Progress <br /> Not Perfection
            </motion.p>
            <p className="text-xl lg:text-2xl">
              Check out the best muscle <br />
              building exercises
            </p>
            <ScrollLink
              to="exercises"
              smooth={true}
              duration={1500}
              className="cursor-pointer"
            >
              <button className="bg-red-500 p-4 w-1/2 rounded-2xl text-white hover:bg-red-400 w-full">
                Explore Exercises
              </button>
            </ScrollLink>

            <h1 className="font-bold text-red-700 opacity-30 text-8xl lg:text-[180px]">
              Exercise
            </h1>
          </div>
        </div>
      </motion.div>
    </ImagesSlider>
  );
};

export default HeroBanner;
