
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            "Please add a name!"
        ]
    },
    email: {
        type: String,
        required: [
            true,
            "Please add an email!"
        ],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [
            true,
            "Please add a password!"
        ]
    },
    pic:{
        type: String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    refreshToken: {
        type: String
    },
    weight: {
        type: Number,
        min: 0
    },
    height: {
        type: Number,
        min: 0
    },
    bmi: {
        type: Number,
        min: 0
    }
},
    {
        timestamps: true
    }
)
// **** Methods for User Model ****/

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export default mongoose.model("User", userSchema)
