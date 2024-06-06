"use client";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, ReactNode } from "react";

interface ExerciseData {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  instructions: string[];
  name: string;
  secondaryMuscles: string[];
  target: string;
}

interface DetailProps {
  exerciseData: ExerciseData;
}

import BodyPartImage from "../../assets/icons/body-part.png";
import TargetImage from "../../assets/icons/target.png";
import EquipmentImage from "../../assets/icons/equipment.png";

const Detail: React.FC<DetailProps> = ({ exerciseData }) => {
  const extraDetail = [
    {
      icon: BodyPartImage,
      name: exerciseData.bodyPart,
      description: "Body Part"
    },
    {
      icon: TargetImage,
      name: exerciseData.target,
      description: "Target Muscle"
    },
    {
      icon: EquipmentImage,
      name: exerciseData.equipment,
      description: "Equipment"
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row p-10 justify-around items-center">
      <div>
        <img
          src={exerciseData.gifUrl}
          alt={exerciseData.name}
          className="bg-gradient-primary mix-blend-multiply "
        />
      </div>
      <div className="flex flex-col gap-6 lg:gap-16 max-w-lg">
        <h1 className="text-2xl lg:text-4xl">
          {exerciseData.name?.toUpperCase()}
        </h1>
        <h1 className="text-xl lg:text-2xl">
          Exercises keep you strong.{" "}
          <span style={{ textTransform: "capitalize" }}>
            {exerciseData.name}
          </span>{" "}
          is one of the best <br /> exercises to target your{" "}
          {exerciseData.target}. It will help you improve your <br /> mood and
          gain energy.
        </h1>

        {extraDetail.map((item) => (
          <div key={item.name} className="flex items-center mb-2 gap-10">
            <div
              className="flex items-center justify-center p-2 cursor-pointer rounded-md text-neutral-500 hover:text-neutral-100 font-medium relative data-[tooltip]:after:content-[attr(data-tooltip)] 
              data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-[calc(100%+4px)] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(50%_0,0_100%,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
              data-tooltip={item.description}
            >
              <img src={item.icon} alt={item.name} className="size-18" />
            </div>
            <p className="lg:text-3xl text-xl">{item.name?.toUpperCase()}</p>
          </div>
        ))}

        <div>
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">Instructions</h2>
          <ul className="list-disc pl-5 space-y-2 text-lg lg:text-xl">
            {exerciseData.instructions.map((instruction, index) => (
              <li key={index} className="ml-1">
                {instruction}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
