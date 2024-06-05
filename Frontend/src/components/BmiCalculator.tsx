import React, { useState } from "react";
import { Input } from "../utils/components/ui/input";
import { Button } from "../utils/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { fetchPostData } from "../utils/api";
import { baseURL } from "../utils/constants";
import { useSelector } from "react-redux";
import { UserRootState } from "../types/reduxTypes";




const BmiCalculator: React.FC = () => {




  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [fitnessType, setFitnessType] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const user = useSelector((state:UserRootState) => state.auth?.userData);

  const calculateBMI = async (event:any) => {
    event.preventDefault();
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);

    if (!height || !weight || heightValue <= 0 || weightValue <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter valid positive values for both height and weight!",
      });
      return;
    }

    // Convert height from cm to meters
    const heightMeters = heightValue / 100;

    // Calculate BMI
    const bmiValue = weightValue / (heightMeters * heightMeters);

    // Post to API
    const data = {
      height: heightValue,
      weight: weightValue,
      bmi: bmiValue
    };
    await fetchPostData(`${baseURL}/user/saveBmi`, data);

    // Update BMI state
    setBmi(bmiValue);

    // Determine fitness type and progress
    let progressValue: number;
    if (bmiValue < 18.5) {
      setFitnessType("Underweight");
      progressValue = (bmiValue / 18.5) * 25; // Underweight range
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setFitnessType("Normal weight");
      progressValue = ((bmiValue - 18.5) / (25 - 18.5)) * 25 + 25; // Normal weight range
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setFitnessType("Overweight");
      progressValue = ((bmiValue - 25) / (30 - 25)) * 25 + 50; // Overweight range
    } else if (bmiValue >= 30 && bmiValue < 35) {
      setFitnessType("Obese");
      progressValue = ((bmiValue - 30) / (35 - 30)) * 25 + 75; // Obese range
    } else {
      setFitnessType("Extremely Obese");
      progressValue = 100; // Extremely Obese range
    }
    setProgress(Math.min(progressValue, 100));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 mt-10">
      <h1 className="text-3xl sm:text-5xl font-semibold text-red-800">BMI Calculator</h1>
      {user?.bmi ? (
        <h2 className="text-xl sm:text-2xl font-medium text-gray-700">
          Your previous BMI was: <span className="font-bold">{user.bmi.toFixed(2)}</span>
        </h2>
      ) : (
        <h2 className="text-xl sm:text-2xl font-medium text-gray-700">
          You have no previous BMI recorded.
        </h2>
      )}
      <form className="flex flex-col gap-6" onSubmit={calculateBMI}>
        <label className="text-2xl font-medium mb-4">
          Height (cm):
          <Input
            type="number"
            name="height"
            value={height}
            min="0"
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <label className="text-2xl mb-4 font-medium">
          Weight (kg):
          <Input
            type="number"
            name="weight"
            value={weight}
            min="0"
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <Button
          type="submit"
          className="sm:p-10 text-2xl"
        >
          Calculate BMI
        </Button>
      </form>
      <AnimatePresence>
        {bmi !== null && (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.svg
              viewBox="0 0 100 50"
              className="w-[200px] h-[200px]"
              initial={{ strokeDasharray: '0, 100' }}
              animate={{ strokeDasharray: `${progress}, 100` }}
              transition={{ duration: 1 }}
            >
              <path
                d="M 10,50 A 40,40 0 0 1 90,50"
                fill="none"
                stroke="#ddd"
                strokeWidth="10"
              />
              <path
                d="M 10,50 A 40,40 0 0 1 90,50"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="10"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "blue", stopOpacity: 1 }} />
                  <stop offset="25%" style={{ stopColor: "green", stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: "yellow", stopOpacity: 1 }} />
                  <stop offset="75%" style={{ stopColor: "orange", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "red", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </motion.svg>
            <motion.div
              className=" font-medium mt-4 text-xl sm:text-3xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p>Your BMI is: {bmi.toFixed(2)}</p>
              <p>Fitness type: {fitnessType}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BmiCalculator;
