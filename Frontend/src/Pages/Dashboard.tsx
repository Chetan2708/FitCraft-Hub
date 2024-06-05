import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import like from "../assets/images/Like.jpg";
import BMI from "../assets/images/BMI.jpg";
import Pt from "../assets/images/Pt.jpg";

const Dashboard :React.FC = () => {
  return (
    <section className="bg-neutral-950 p-4 md:p-8 min-h-screen">
      <div className="mx-auto max-w-5xl">
        <Link
          heading="Liked Exercises"
          subheading="View and manage your liked exercises!"
          imgSrc={like}
          to="liked-exercises"
        />
        <Link
          heading="BMI Calculator"
          subheading="Calculate your Body Mass Index easily"
          imgSrc={BMI}
          to="bmi-calculator"
        />
      
        <Link
          heading="Personal Trainer"
          subheading="Chat with your personal trainer"
          imgSrc={Pt}
          to="coming-soon"
          
        />
      </div>
    </section>
  );
};

const Link = ({ heading, imgSrc, subheading, to }) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleClick = () => {
    navigate(to);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      initial="initial"
      whileHover="whileHover"
      className="mt-20 group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8 cursor-pointer"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative  block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute  h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative p-4"
      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
