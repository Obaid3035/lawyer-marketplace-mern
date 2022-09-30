import {IController, IUser} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import auth from "../../middleware/auth";
import User, {ROLE} from "../../model/user";

class AdminController implements IController {
    path = '/admin';
    router = Router()

    constructor() {
        this.router
            .post(`${this.path}/register`, this.createAdmin)
            .get(`${this.path}/users/:id`, auth(ROLE.ADMIN), this.getAllUser)
            .get(`${this.path}/lawyer/:id`, auth(ROLE.ADMIN), this.getLawyerById)
            .put(`${this.path}/lawyer/:id`, auth(ROLE.ADMIN), this.toggleLawyerVerification)
    }

    private getLawyerById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lawyer = await User.findById(req.params.id);
            res.status(200).json(lawyer)
        } catch (e) {
            next(e);
        }
    }


    private createAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const admin = await User.findOne({
                role: ROLE.ADMIN
            })
            if (admin) {
                res.status(200).json({
                    message: 'An admin is already registered'
                })
            } else {
                const user = await User.create({
                    ...req.body,
                })

                const token = user.generateToken();
                delete user.password;

                res.status(200).json({
                    token,
                    user
                })
            }

        } catch (e) {
            next(e);
        }
    }

    private getAllUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const skip = size * pageNo;
            const lawyerPromise = User.find({
                role: req.params.id,
            }).select('name email nic isVerified').skip(skip).limit(size);

            const lawyerCountPromise = User.find({
                role: req.params.id,
            }).count()

            const [lawyer, lawyerCount] = await Promise.all([lawyerPromise, lawyerCountPromise]);

            const formattedLawyer = lawyer.map((user: IUser) => {
                let obj = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    nic: user.nic,
                    isVerified: user.isVerified ? "Verified" : "Not-Verified",
                }
                return Object.values(obj)
            })
            res.status(200).json({
                data: formattedLawyer,
                count: lawyerCount
            })
        } catch (e) {
            next(e);
        }
    }

    private toggleLawyerVerification = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lawyerId = req.params.id;
            const lawyer = await User.findById(lawyerId)
            lawyer.isVerified = !lawyer.isVerified
            await lawyer.save();
            res.status(200).json({
                message: "Lawyer has been updated successfully!"
            })
        } catch (e) {
            next(e);
        }
    }
}

export default AdminController;
