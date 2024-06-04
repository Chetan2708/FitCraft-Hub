import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  bodyPart: { type: String, required: true },
  equipment: { type: String, required: true },
  gifUrl: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  instructions: [{ type: String, required: true }],
  name: { type: String, required: true },
  secondaryMuscles: [{ type: String, required: true }],
  target: { type: String, required: true }
});

export default mongoose.model('Exercise', exerciseSchema);

