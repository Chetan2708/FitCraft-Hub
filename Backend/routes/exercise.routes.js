import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getDistinctBodyParts, getAllExercise ,getExerciseByBodyPart,
    getExerciseById
    // , addExercise, updateExercise, deleteExercise 
} from "../controllers/exercise.controller.js";

const router = Router();

router.route('/getAllExercises').get( getAllExercise);
router.route('/getDistinctBodyParts').get( getDistinctBodyParts);

router.route('/getExerciseByBodyPart/:bodyPart').get( getExerciseByBodyPart);

//get specific ewxerice through id
router.route('/getExercise/:id').get( getExerciseById);

export default router