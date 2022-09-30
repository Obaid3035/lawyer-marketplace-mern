import {NextFunction, Request, Response, Router} from "express";
import {IController} from "../interface";
import User, {ROLE} from "../model/user";
import Review from "../model/review";
import mongoose from "mongoose";

class LawyerController implements IController {

    router = Router();
    path = '/lawyer'
    constructor() {
        this.router
            .get(`${this.path}`, this.findAllLawyer)
            .get(`${this.path}/:id`, this.findLawyerById);

    }

    private findAllLawyer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pageNo = parseInt(<string>req.query.page);
            const limit = parseInt(<string>req.query.size);
            const {lat, lng} = req.query;
            const skip = limit * pageNo;
            const userPromise = User.find({
                role: ROLE.LAWYER,
                isVerified: true,
                location: {
                    $near: {
                        $maxDistance: 10000000000,
                        $geometry: {
                            type: 'Point',
                            coordinates: [lat, lng],
                        },
                    },
                },
            })
                .select('name bio profilePicture location address')
                .skip(skip)
                .limit(limit);

            const userCountPromise = User.find({
                role: ROLE.LAWYER,
                location: {
                    $near: {
                        $maxDistance: 10000000000,
                        $geometry: {
                            type: 'Point',
                            coordinates: [lat, lng],
                        },
                    },
                },
            }).count();
            const averageRatingPromise = User.aggregate([
                {
                    $match: {
                        role: ROLE.LAWYER,
                    },
                },
                {
                    $lookup: {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'lawyer',
                        as: 'review',
                    },
                },
                {
                    $unwind: {
                        path: '$review',
                    },
                },
                {
                    $group: {
                        _id: '$_id',
                        rating: {
                            $avg: '$review.rating',
                        },
                    },
                },
            ]);
            const [users, userCount, averageRating] = await Promise.all([
                userPromise,
                userCountPromise,
                averageRatingPromise,
            ]);

            console.log(users, userCount, averageRating)

            if (userCount > 0) {
                const response = {
                    data: users.map((user: any) => {
                        const rating = averageRating.find(rating => rating._id.toString() === user._id.toString());
                        console.log(rating)
                        if (rating) {
                            return {
                                ...user._doc,
                                averageRating: rating.rating,
                            };
                        } else  {
                            return {
                                ...user._doc,
                                averageRating: 0,
                            };
                        }
                    }),
                    count: userCount
                }
                res.status(200).json(response)
            } else {
                res.status(200).json([])
            }
        } catch (e) {
            next(e);
        }
    }

    private findLawyerById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const lawyer = await User.findOne({
                role: ROLE.LAWYER,
                _id: req.params.id,
            })
            const lawyerAverageRating = await Review.aggregate([
                {
                    $match: {
                        lawyer: new mongoose.Types.ObjectId(req.params.id),
                    }
                },
                {
                    $group: {
                        _id: null,
                        rating: {
                            $avg: "$rating"
                        }
                    }
                }
            ])
            let rating = 0;
            if (lawyerAverageRating.length > 0) {
                rating = lawyerAverageRating[0].rating
            }
            if (lawyer) {
                res.status(200).json({
                    lawyer,
                    rating
                });
            } else {
                res.status(200).json('No Lawyer found');
            }
        } catch (e) {
            next(e);
        }
    }

}

export default LawyerController;
