import {IController, IUploadMultipleJoin} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import {CloudinaryService} from "../../utils/cloudinary/uploadImage";
import Join from "../../model/cms/join";
import cloudinary from "../../utils/cloudinary/cloudinary";
import upload from "../../middleware/multer";

const uploadMultipleJoin = upload.fields([
    {name: 'section_1_image', maxCount: 1},
    {name: 'section_2_image', maxCount: 1}
]);

class JoinController implements IController {
    public path = "/join"
    public router = Router();
    private cloudinaryService: CloudinaryService

    constructor() {
        this.cloudinaryService = new CloudinaryService()
        this.router.get(`${this.path}`, this.getJoin)
        this.router.post(`${this.path}`, this.createJoin)
        this.router.put(`${this.path}`, this.updateJoin)
        this.router.put(`${this.path}/image`, uploadMultipleJoin, this.updateJoinWithImage)
    }

    private getJoin = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const join = await Join.find()

            res.status(200).json({
                join
            })
        } catch (e) {
            next(e)
        }
    }

    private createJoin=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const isJoin = await Join.findOne()
            if(isJoin){
                res.status(403).json({
                    message: "Cannot create Join again"
                })
            }
            else{

                const join =await Join.create({...req.body})

                res.status(200).json({
                    message:"Join Page created successfully",
                    join:join
                })
            }
        } catch (e) {
            next(e)
        }
    }

    private updateJoin=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const join: any = await Join.findOne();
            if(join) {
                const section = req.body.section
                await Join.findByIdAndUpdate(join._id, {
                    [section]:{
                        ...join[section],
                        ...req.body[section]
                    }
                },{new:true,runValidators:true})
                res.status(200).json({updated: true})
            }
            else{
                res.status(400).json({
                    message: "Join page not found"
                })
            }
        } catch (e) {
            next(e)
        }
    }


    private updateJoinWithImage=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {body,files}=req
            const join = await Join.findOne();
            const formData:any ={
                section_1: {
                    image: {
                        url:join.section_1.image.url,
                        cloudinary_id:join.section_1.image.cloudinary_id
                    }
                },
                section_2: {
                    heading: join.section_2.heading,
                    text: join.section_2.text,
                    heading_2: join.section_2.heading_2,
                    image: {
                        url:join.section_2.image.url,
                        cloudinary_id:join.section_2.image.cloudinary_id
                    },
                    point_1: join.section_2.point_1,
                    point_2: join.section_2.point_2,
                    point_3: join.section_2.point_3
                },
                section_3: {
                    heading: join.section_3.heading,
                    text: join.section_3.heading,
                    point_1: join.section_3.point_1,
                    point_2: join.section_3.point_2,
                    point_3: join.section_3.point_3
                },
            }
            const { section_1_image, section_2_image} =
                files as unknown as IUploadMultipleJoin;
            if (section_1_image && section_1_image[0].fieldname) {
                if(join.section_1.image.cloudinary_id){
                    await cloudinary.v2.uploader.destroy(
                        join.section_1.image.cloudinary_id
                    )}
                const uploadImage1 = await this.cloudinaryService.uploadImage(section_1_image[0]);
                formData.section_1 = {
                    ...formData.section_1,
                    image: {
                        url: uploadImage1?.secure_url,
                        cloudinary_id: uploadImage1?.public_id
                    },
                }
            }
            if (section_2_image && section_2_image[0].fieldname) {
                if(join.section_2.image.cloudinary_id){
                    await cloudinary.v2.uploader.destroy(
                        join.section_2.image.cloudinary_id
                    )}
                const uploadImage2 = await this.cloudinaryService.uploadImage(section_2_image[0]);
                formData.section_2 = {
                    ...formData.section_2,
                    image: {
                        url: uploadImage2?.secure_url,
                        cloudinary_id: uploadImage2?.public_id
                    },
                    heading:body.heading,
                    text: body.text,
                    heading_2:body.heading_2,
                    point_1: body.point_1,
                    point_2: body.point_2,
                    point_3: body.point_3,
                    point_4: body.point_4
                }
            }

            await Join.findByIdAndUpdate(join._id, formData,{new:true,runValidators:true});
            res.status(200).json({
                message: "Join Page updated successfully!"
            })

        } catch (e) {
            next(e)
        }
    }
}

export default JoinController;
