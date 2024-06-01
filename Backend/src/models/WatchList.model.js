import mongoose from "mongoose"


const WatchListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exercises: [{
        exerciseID: {
            type: String,
            required:true
        }
    }],
},

    { timestamps: true });

 export default mongoose.model("WatchList", WatchListSchema)