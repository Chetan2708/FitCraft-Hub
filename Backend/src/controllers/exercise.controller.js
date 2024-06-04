import axios from 'axios';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Exercise from "../models/exercise.model.js";

const getDistinctBodyParts = asyncHandler(async (req, res, next) => {
   
   
    const distinctBodyParts = await Exercise.distinct("bodyPart");

    if (!distinctBodyParts) {
        throw new ApiError(404, "Body parts not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, distinctBodyParts, "Body parts fetched successfully"));




});
const getAllExercise = asyncHandler(async (req, res, next) => {
   
   
    const allExercises = await Exercise.find();

    if (!allExercises) {
        throw new ApiError(404, "Exercises not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, allExercises, "Exercises fetched successfully"));
        



});
const getExerciseByBodyPart = asyncHandler(async (req, res, next) => {
   
    const { bodyPart } = req.params;

    if (!bodyPart) {
        throw new ApiError(404, "Body part not found");
    }

    const exercises = await Exercise.find({ bodyPart });

    if (!exercises) {
        throw new ApiError(404, "Exercises not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, exercises, "Exercises fetched successfully"));



});
const getExerciseById = asyncHandler(async (req, res, next) => {
   
    const { id } = req.params;

    if (!id) {
        throw new ApiError(404, "Exercise not found");
    }

    const exercise = await Exercise.findOne({id});

    if (!exercise) {
        throw new ApiError(404, "Exercise not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, exercise, "Exercise fetched successfully"));

});



export {getDistinctBodyParts , getAllExercise , getExerciseByBodyPart , getExerciseById};