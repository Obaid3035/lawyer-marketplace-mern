import jwt from 'jsonwebtoken'
import User from "../model/user";
import {NextFunction, Response, Request} from "express";
import { StatusCodes} from "http-status-codes";
import {IUser} from "../interface";

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}

const auth = (role: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try{
			const token = req.headers.authorization.split(' ')[1];
			const decode = <any> jwt.verify(token, process.env.JWT_SECRET);
			if (role === 'ALL') {
				req.user = await User.findById(decode._id)
				next();
			} else {
				req.user = await User.findOne({
					_id: decode._id,
					role: role
				})
				next();
			}
			if (!req.user) {
				res.status(StatusCodes.UNAUTHORIZED).send({error: "Please Authorize Yourself"});
				next();
			}
		} catch (e) {
			res.status(StatusCodes.UNAUTHORIZED).send({error: "Please Authorize Yourself"});
		}
	};
}

export default auth;
