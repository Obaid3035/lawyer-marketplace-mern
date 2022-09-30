import {IController, IUploadMultipleHome} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import Home from "../../model/cms/home";
import upload from "../../middleware/multer";
import {CloudinaryService} from "../../utils/cloudinary/uploadImage";
import cloudinary from "../../utils/cloudinary/cloudinary";


const uploadMultipleHome = upload.fields([
    {name: 'section_1_image', maxCount: 1},
    {name: 'section_2_image', maxCount: 1},
    {name: 'section_3_image', maxCount: 1},

]);

class HomeController implements IController {
    public path = "/home"
    public router = Router();
    private cloudinaryService: CloudinaryService
    constructor() {
        this.cloudinaryService = new CloudinaryService()
        this.router.get(`${this.path}`, this.getHome)
        this.router.post(`${this.path}`, this.createHome)
        this.router.put(`${this.path}`, this.updateHome)
        this.router.put(`${this.path}/image`, uploadMultipleHome, this.updateHomeWithImage)
    }

    private getHome = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const home = await Home.find()
            if (!home) {
                res.status(400).json({
                    message: "Home page not found"
                })
            } else {
                res.status(200).json({
                    home
                })
            }

        } catch (e) {
            next(e)
        }
    }

    private createHome = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const home = await Home.findOne()
            if (home) {
                res.status(403).json({
                    message: "Cannot create Home again"
                })
            } else {
                const home = await Home.create({...req.body})
                res.status(200).json({
                    message: "Home page created successfully",
                    home: home
                })
            }
        } catch (e) {
            next(e)
        }
    }

    private updateHome = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const home: any = await Home.findOne();
            if (home) {
                const section = req.body.section
                await Home.findByIdAndUpdate(home._id, {
                    [section]: {
                        ...home[section],
                        ...req.body[section]
                    }
                }, {new: true, runValidators: true})
                res.status(200).json({updated: true})
            } else {
                res.status(400).json({
                    message: "Home page not found"
                })
            }
        } catch (e) {
            next(e);
        }
    }

    private updateHomeWithImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {body, files} = req
            const home = await Home.findOne();

            const formData: any = {
                section_1: {
                    heading: home.section_1.heading,
                    text: home.section_1.text,
                    image: {
                        url: home.section_1.image.url,
                        cloudinary_id: home.section_1.image.cloudinary_id
                    }
                },
                section_2: {
                    heading: home.section_2.heading,
                    subHeading: home.section_2.subHeading,
                    text: home.section_2.text,
                    image: {
                        url: home.section_2.image.url,
                        cloudinary_id: home.section_2.image.cloudinary_id
                    },
                    heading_2: home.section_2.heading_2,
                    text_2: home.section_2.text_2
                },
                section_3: {
                    heading: home.section_3.heading,
                    subHeading: home.section_3.subHeading,
                    text: home.section_3.heading,
                    image: {
                        url: home.section_3.image.url,
                        cloudinary_id: home.section_3.image.cloudinary_id
                    }
                },
            }

            const {section_1_image, section_2_image, section_3_image} =
                files as unknown as IUploadMultipleHome;

            if (section_1_image && section_1_image[0].fieldname) {
                if (home.section_1.image.cloudinary_id) {
                    await cloudinary.v2.uploader.destroy(
                        home.section_1.image.cloudinary_id
                    )
                }

                const uploadImage1 = await this.cloudinaryService.uploadImage(section_1_image[0]);
                formData.section_1 = {
                    ...formData.section_1,
                    image: {
                        url: uploadImage1?.secure_url,
                        cloudinary_id: uploadImage1?.public_id
                    },
                    heading: body.heading,
                    text: body.text
                }
            }
            if (section_2_image && section_2_image[0].fieldname) {
                if (home.section_2.image.cloudinary_id) {
                    await cloudinary.v2.uploader.destroy(
                        home.section_2.image.cloudinary_id
                    )
                }
                const uploadImage2 = await this.cloudinaryService.uploadImage(section_2_image[0]);
                formData.section_2 = {
                    ...formData.section_2,
                    image: {
                        url: uploadImage2?.secure_url,
                        cloudinary_id: uploadImage2?.public_id
                    },
                    heading: body.heading,
                    subHeading: body.subHeading,
                    text: body.text,
                    heading_2: body.heading_2,
                    text_2: body.text_2
                }
            }
            if (section_3_image && section_3_image[0].fieldname) {
                if (home.section_3.image.cloudinary_id) {
                    await cloudinary.v2.uploader.destroy(
                        home.section_3.image.cloudinary_id
                    )
                }

                const uploadImage3 = await this.cloudinaryService.uploadImage(section_3_image[0]);
                formData.section_3 = {
                    ...formData.section_3,
                    image: {
                        url: uploadImage3?.secure_url,
                        cloudinary_id: uploadImage3?.public_id
                    },
                    heading: body.heading,
                    subHeading: body.subHeading,
                    text: body.text,
                }
            }
            await Home.findByIdAndUpdate(home._id, formData, {new: true, runValidators: true});
            res.status(200).json({
                message: "Home Page updated successfully!"
            })

        } catch (e) {
            next(e);
        }
    }

}

export default HomeController;
