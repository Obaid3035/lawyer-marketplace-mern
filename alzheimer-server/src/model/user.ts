import mongoose, {Model, Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {IUser} from "../interface";
import NotFound, {BadRequest} from "../utils/errorCode";

export enum ROLE  {
    LAWYER = "lawyer",
    CARE_GIVER ="caregiver",
    ADMIN = "admin",
}

interface UserModel extends Model<IUser> {
    userExists(email: string): Promise<boolean>,
    authenticate(email: string, password: string): Promise<IUser>,
    hashPassword(password: string): Promise<string>
}

const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Username"],
    },
    email: {
        type: String,
        required: [true, "Enter User Email"],
    },
    password: {
        type: String,
        required: [true, "Enter User Password"],
    },
    phoneNumber: {
        type: String,
        maxLength: [15, "phone cannot ne exceeded from 15 characters"],
    },
    address: {
      type: String,
    },
    nic: {
        type: String,
    },
    role: {
        type: String,
        enum: [ROLE.LAWYER, ROLE.CARE_GIVER, ROLE.ADMIN],
        required: true,
    },
    bio: {
        type: String,
    },
    firmName: {
      type: String,
    },
    firmUrl: {
        type: String,
    },
    expertise: [
        {
            type: String,
        }
    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    location: {
        type: {
            type: String,
        },
        coordinates: [
            {
                type: Number,
            },
        ],
    },
    profilePicture: {
        url: String,
        cloudinary_id: String,
    },
    resume: {
        url: String,
        cloudinary_id: String,
    },
});


UserSchema.index({ location: "2dsphere" });

UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.password && user.isNew) {
        this.password = await User.hashPassword(user.password);
        next()
    }
})


UserSchema.statics.hashPassword = async function (password: string) {
    return await bcrypt.hash(password, 10)
}

UserSchema.methods.isLawyerVerified = function () {
    const user =  this;
    if(user.role === ROLE.LAWYER) {
        if (!user.isVerified) {
            throw new BadRequest('Lawyer is not verified')
        }
    }
}

UserSchema.methods.generateToken = function () {
    const user = this;
    delete user.password;
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
}

UserSchema.statics.userExists = async function (email: string ) {
    let user = await User.findOne({ email });
    if (user) {
        throw new Error("User already exists with this email");
    }
    return true;
};

UserSchema.methods.comparePassword = async function (oldPassword: string) {
    const isMatch =  await bcrypt.compare(oldPassword, this.password)
    if (!isMatch) {
        throw new BadRequest("Current password is incorrect");
    } else {
        return this
    }
}


UserSchema.statics.authenticate = async function (email: string, password: string) {
    const user: IUser = await User.findOne({
        email
    });
    if (!user) {
        throw new NotFound("Unable too login. Please registered yourself");
    }
    return user.comparePassword(password);
}

const User = mongoose.model<IUser, UserModel>('user', UserSchema);

export default User;
