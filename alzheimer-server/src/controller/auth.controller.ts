import {NextFunction, Request, Response, Router} from "express";
import {IController} from "../interface";
import User, {ROLE} from "../model/user";
import auth from "../middleware/auth";
import upload from "../middleware/multer";
import {CloudinaryService} from "../utils/cloudinary/uploadImage";

class AuthController implements IController {

    router = Router();
    path = '/auth'
    private cloudinaryService: CloudinaryService

    constructor() {
        this.cloudinaryService = new CloudinaryService()
        this.router
            .post(`${this.path}/caregiver/register`, this.caregiverSignUp)
            .post(`${this.path}/lawyer/register`, upload.single("resume"), this.lawyerSignUp)
            .put(`${this.path}/avatar`, auth('ALL'), upload.single("profilePicture"), this.uploadAvatar)
            .post(`${this.path}/login`, this.login)
            .put(`${this.path}/change-password`, auth('ALL'), this.changePassword)
            .get(`${this.path}/whoami`, auth('ALL'), this.whoami)
            .put(`${this.path}`, auth('ALL'), this.update)
    }

    private caregiverSignUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email} = req.body
            await User.userExists(email);
            const user = await User.create({
                ...req.body,
                role: ROLE.CARE_GIVER,
            })
            const token = user.generateToken();
            delete user.password;
            res.status(200).json({
                token,
                user
            })
        } catch (e) {
            console.log(e);
            next(e);
        }
    }


    private lawyerSignUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {location, email, expertise} = req.body
            await User.userExists(email);
            const cloudResume = await this.cloudinaryService.uploadImage(req.file);
            const user = await User.create({
                ...req.body,
                role: ROLE.LAWYER,
                resume: {
                    url: cloudResume.secure_url,
                    cloudinary_id: cloudResume.public_id
                },
                expertise: JSON.parse(expertise),
                location: JSON.parse(location)
            })
            const token = user.generateToken();
            delete user.password;
            res.status(200).json({
                token,
                user
            })
        } catch (e) {
            next(e);
        }
    }

    private changePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await req.user.comparePassword(req.body.oldPassword);
            req.user.password = await User.hashPassword(req.body.newPassword)
            await req.user.save();
            res.status(200).json({
                message: 'Password changed successfully!'
            })
        } catch (e) {
            next(e);
        }
    }

    private uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            let avatar;
            if (req.user.profilePicture) {
                avatar = await this.cloudinaryService.uploadImage(req.file, user.profilePicture.cloudinary_id);
            } else {
                avatar = await this.cloudinaryService.uploadImage(req.file);
            }
            user.profilePicture = {
                url: avatar.secure_url,
                cloudinary_id: avatar.public_id,
            };
            await user.save();
            res.status(200).json({
                url: avatar.secure_url,
                cloudinary_id: avatar.public_id,
                message: "Profile picture saved successfully updated!"
            })
        } catch (e) {
            next(e);
        }
    }

    private update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                ...req.body
            })
            res.status(200).json({
                message: "User updated successfully"
            })
        } catch (e) {
            next(e);
        }
    }

    private whoami = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(req.user)
        } catch (e) {
            next(e);
        }
    }

    private login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("********** Logging user ***********");
            const {email, password} = req.body
            const user = await User.authenticate(email, password);
            // user.isLawyerVerified()
            const token = user.generateToken();
            console.log("********** User logged in Successfully ***********");
            res.status(200).json({
                token,
                user
            })
        } catch (e) {
            next(e);
        }
    }

}

export default AuthController;
