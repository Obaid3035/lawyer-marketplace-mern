import multer from 'multer';
import {Request} from "express";

const storageEngine = multer.memoryStorage()

const fileFilter = (_req: Request, file: any, callback: any) => {

	if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF)$/)) {
		// upload only png and jpg format
		return callback(new Error('Please upload a Image'))
	}
	return callback(undefined, true)
};

const upload = multer ({
	storage: storageEngine,
	fileFilter
});

export default upload;
