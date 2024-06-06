import React, { useRef } from "react";

import { motion, useTransform, useScroll } from "framer-motion";
import BodyPart from "./BodyPart";

interface HorizontalScrollBarProps {
  allBodyParts: string[];
}

const HorizontalScrollBar: React.FC<HorizontalScrollBarProps> = ({
  allBodyParts,
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

 
  return (
    <section ref={targetRef} className="relative h-[250vh] ">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {allBodyParts.map((item, index) => (
            <Card item={item} key={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card: React.FC<{ item: string }> = ({ item }) => {
  return (
    <div
      key={item}
      className="group relative h-[200px] w-[200px] sm:h-[300px] sm:w-[450px] overflow-hidden  rounded-2xl shadow-lg"
    >
      <BodyPart item={item} />
    </div>
  );
};

export default HorizontalScrollBar;
