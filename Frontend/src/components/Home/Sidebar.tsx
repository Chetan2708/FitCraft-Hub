import React from "react";
import { motion } from "framer-motion";

const SIDEBAR_VARIANTS = {
  open: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  closed: {
    x: "-100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  hover: {
    scale: 1.2,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 500,
    },
  },
};

const Sidebar = ({ isOpen, children }) => {
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={SIDEBAR_VARIANTS}
      className="fixed top-0 left-0 h-screen w-64 bg-gray-900 p-5 z-10 overflow-y-auto"
    >
      <ul className="text-white text-2xl flex flex-col items-center">
        {React.Children.map(children, (child) => (
          <motion.li
            variants={itemVariants}
            whileHover="hover"
            className="cursor-pointer"
          >
            {child}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;
