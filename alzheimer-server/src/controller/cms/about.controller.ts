import {NextFunction, Request, Response, Router} from "express";
import {IController, IUploadMultipleAbout} from "../../interface";
import About from "../../model/cms/about";
import {CloudinaryService} from "../../utils/cloudinary/uploadImage";
import cloudinary from "../../utils/cloudinary/cloudinary";
import upload from "../../middleware/multer";

const uploadMultipleAbout = upload.fields([
    {name: 'section_1_image', maxCount: 1},
    {name: 'section_2_image', maxCount: 1},
    {name: 'section_5_image', maxCount: 1},

]);

class AboutController implements IController {
    public path = "/about"
    public router = Router();
    private cloudinaryService: CloudinaryService
    constructor() {
        this.cloudinaryService = new CloudinaryService()
        this.router.get(`${this.path}`, this.getAboutUs)
        this.router.post(`${this.path}`, this.createAboutUs)
        this.router.put(`${this.path}`, this.updateAboutUs)
        this.router.put(`${this.path}/image`, uploadMultipleAbout, this.updateAboutWithImage)
    }

    private getAboutUs = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const about = await About.find()
            res.status(200).json({
                about
            })
        } catch (error) {
            next(error)
        }
    }

    private createAboutUs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const isAbout = await About.findOne()
            if (isAbout) {
                res.status(403).json({
                    message: "Cannot create About again"
                })
            } else {

                const about = await About.create({...req.body})
                res.status(200).json({
                    message: "About page created successfully",
                    about: about
                })
            }
        } catch (error) {
            next(error)
        }
    }


    private updateAboutUs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const about: any = await About.findOne();
            if (about) {
                const section = req.body.section
                await About.findByIdAndUpdate(about._id, {
                    [section]: {
                        ...about[section],
                        ...req.body[section]
                    }
                }, {new: true, runValidators: true})
                res.status(200).json({updated: true})
            } else {
                res.status(400).json({
                    message: "About page not found"
                })
            }
        } catch (e) {
            next(e)
        }
    }

    private updateAboutWithImage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {body, files} = req

            const about = await About.findOne();

            const formData: any = {
                section_1: {
                    text: about.section_1.text,
                    image: {
                        url: about.section_1.image.url,
                        cloudinary_id: about.section_1.image.cloudinary_id
                    },
                },
                section_2: {
                    heading: about.section_2.heading,
                    image: {
                        url: about.section_2.image.url,
                        cloudinary_id: about.section_2.image.cloudinary_id
                    },
                    point_1: about.section_2.point_1,
                    point_2: about.section_2.point_2,
                    point_3: about.section_2.point_3,
                    point_4: about.section_2.point_4
                },
                section_3: {
                    heading: about.section_3.heading,
                    box_1: about.section_3.box_1,
                    box_2: about.section_3.box_2,
                    box_3: about.section_3.box_3,
                    box_4: about.section_3.box_4,
                    box_5: about.section_3.box_5,
                    box_6: about.section_3.box_6
                },
                section_4: {
                    heading: about.section_4.heading,
                    box_1: about.section_4.box_1,
                    box_2: about.section_4.box_2,
                    box_3: about.section_4.box_3,
                },
                section_5: {
                    heading: about.section_5.heading,
                    image: {
                        url: about.section_5.image.url,
                        cloudinary_id: about.section_5.image.cloudinary_id
                    },
                    point_1: about.section_5.point_1,
                    point_2: about.section_5.point_2,
                    point_3: about.section_5.point_3,
                }
            }
            const {section_1_image, section_2_image, section_5_image} =
                files as unknown as IUploadMultipleAbout;
            if (section_1_image && section_1_image[0].fieldname) {
                if (about.section_1.image.cloudinary_id) {
                    await cloudinary.v2.uploader.destroy(
                        about.section_1.image.cloudinary_id
                    )
                }
                const uploadImage1 = await this.cloudinaryService.uploadImage(section_1_image[0]);
                formData.section_1 = {
                    ...formData.section_1,
                    image: {
                        url: uploadImage1?.secure_url,
                        cloudinary_id: uploadImage1?.public_id
                    },
                    text: body.text,
                }
            }
            if (section_2_image && section_2_image[0].fieldname) {
                if (about.section_2.image.cloudinary_id) {
                    await cloudinary.v2.uploader.destroy(
                        about.section_2.image.cloudinary_id
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
                    text: body.text,
                    heading_2: body.heading_2,
                    point_1: body.point_1,
                    point_2: body.point_2,
                    point_3: body.point_3,
                    point_4: body.point_4
                }
            }
            if (section_5_image && section_5_image[0].fieldname) {
                if (about.section_5.image.cloudinary_id) {
                    await cloudinary.v2.uploader.destroy(
                        about.section_5.image.cloudinary_id
                    )
                }
                const uploadImage3 = await this.cloudinaryService.uploadImage(section_5_image[0]);
                formData.section_5 = {
                    ...formData.section_5,
                    image: {
                        url: uploadImage3?.secure_url,
                        cloudinary_id: uploadImage3?.public_id
                    },
                    heading: body.heading,
                    point_1: body.point_1,
                    point_2: body.point_2,
                    point_3: body.point_3,
                }
            }

            await About.findByIdAndUpdate(about._id, formData, {new: true, runValidators: true});
            res.status(200).json({
                message: "About Page updated successfully!"
            })

        } catch (e) {
            next(e)
        }
    }


}

export default AboutController;
