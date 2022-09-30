import {IController} from "../interface";
import {NextFunction, Request, Response, Router} from "express";
import Review from "../model/review";
import auth from "../middleware/auth";
import {ROLE} from "../model/user";

class ReviewController implements IController{
    router = Router();
    path = '/review'
    constructor() {
        this.router
            .get(`${this.path}/:id`, this.index)
            .post(`${this.path}/:id`, auth(ROLE.CARE_GIVER), this.create)
    }


    private index = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const size = parseInt(<string>req.query.size);
            const skip = size * pageNo;
            const limit = size;

            const lawyerId = req.params.id;
            const reviewsPromise = Review.find({
                lawyer: lawyerId
            }).populate('caregiver').skip(skip).limit(limit)

            const reviewsCountPromise = Review.find({
                lawyer: lawyerId
            }).count()

            const [reviews, reviewsCount] = await Promise.all([reviewsPromise, reviewsCountPromise])


            res.status(200).json({
                data: reviews,
                count: reviewsCount
            })

        } catch (e) {
            console.log(e);
            next(e);
        }
    }
    private create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lawyerId = req.params.id;
            const caregiverId = req.user._id;
            await Review.create({
                rating: req.body.rating,
                description: req.body.description,
                caregiver: caregiverId,
                lawyer: lawyerId
            })

            res.status(201).json({
                message: "Review created successfully!"
            })

        } catch (e) {
            next(e);
        }
    }
}

export default ReviewController;
