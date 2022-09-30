import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import cloudinary from "./cloudinary";


export class CloudinaryService {
    async uploadImage(
        file: Express.Multer.File,
        public_id?: string
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.v2.uploader
                .upload_stream(
                    {
                        public_id,
                        overwrite: true,
                    },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    },
                )
                .end(file.buffer);
        });
    }
}
