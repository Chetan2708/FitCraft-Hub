import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import WatchList from "../models/WatchList.model.js";

const addWatchList = asyncHandler(async (req, res, next) => {
    const { exerciseID } = req.body;

    if (!exerciseID) {
        throw new ApiError(400, "Exercise ID is required");
    }

    // Save id in the exercises array in schema
    const watchList = await WatchList.findOneAndUpdate(
        {userId:req.user._id},
        {
            $addToSet: {  
                exercises: { exerciseID }
            }
        },
        { new: true, upsert: true } // upsert: true creates a new document if none exists
    );

    if (!watchList) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, watchList, "Added to watchlist successfully"));
});

//Get all wwatchlist

const getWatchList = asyncHandler(async (req, res, next) => {
    const watchList = await WatchList.findOne({ userId: req.user._id }).populate("userId")
    if (!watchList) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, watchList, "Watchlist fetched successfully"));
});


//Remove from watchlist
const removeWatchList = asyncHandler(async(req, res )=>{
    const { exerciseID } = req.body;
    if (!exerciseID) {
        throw new ApiError(400, "Exercise ID is required");
    }
    const watchList = await WatchList.findOneAndUpdate(
        {userId:req.user._id},
        {
            $pull: {  
                exercises: { exerciseID }
            }
        },
        { new: true, upsert: true } // upsert: true creates a new document if none exists
    );

    if (!watchList) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, watchList, "Removed from watchlist successfully"));
    
})




export { addWatchList , getWatchList , removeWatchList};
