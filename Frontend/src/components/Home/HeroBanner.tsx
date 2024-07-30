

import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../../utils/components/ui/image-slider";
import { Link as ScrollLink } from "react-scroll";
const HeroBanner: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/flagged/photo-1564740930826-1aabf6c8a776?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
"https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
