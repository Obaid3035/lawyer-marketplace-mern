import {IController, IUploadMultipleJoin} from "../../interface";
import {Router,Request,Response,NextFunction} from "express";
import cloudinary from "../../utils/cloudinary/cloudinary";
import upload from "../../middleware/multer";
import {CloudinaryService} from "../../utils/cloudinary/uploadImage";
import LawyerJoin from "../../model/cms/lawyerJoin";
const uploadMultipleJoin = upload.fields([
    {name: 'section_1_image', maxCount: 1},
    {name: 'section_2_image', maxCount: 1}
]);
class LawyerJoinController implements IController {
    public path = "/lawyer-join"
    public router = Router();
    private cloudinaryService: CloudinaryService

    constructor() {
        this.cloudinaryService = new CloudinaryService()
        this.router.get(`${this.path}`,this.getJoin)
        this.router.post(`${this.path}`,this.createJoin)
        this.router.put(`${this.path}`,this.updateJoin)
        this.router.put(`${this.path}/image`,uploadMultipleJoin,this.updateJoinWithImage)
    }

    private getJoin=async(_req:Request,res:Response,next:NextFunction)=>{
        try {
            const join =await LawyerJoin.find()
            res.status(200).json({
                join:join
            })
        } catch (e) {
            next(e)
        }
    }

    private createJoin=async(req:Request,res:Response,next:NextFunction) => {
        try {
            const isLawyerJoin = await LawyerJoin.findOne()
            if(isLawyerJoin){
                res.status(403).json({
                    message: "Cannot create Lawyer join again"
                })
            }
            else{
                const join =await LawyerJoin.create({...req.body})

                res.status(200).json({
                    message:"Lawyer Join Page created successfully",
                    join:join
                })
            }
        } catch (e) {
            next(e)
        }
    }

    private updateJoin=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const join: any = await LawyerJoin.findOne();
            if(join) {
                const section = req.body.section
                await LawyerJoin.findByIdAndUpdate(join._id, {
                    [section]:{
                        ...join[section],
                        ...req.body[section]
                    }
                },{new:true,runValidators:true})
                res.status(200).json({updated: true})
            }
            else{
                res.status(400).json({
                    message: "Lawyer Join page not found"
                })
            }
        } catch (e) {
            next(e)
        }
    }

    private updateJoinWithImage=async(req:Request,res:Response,next:NextFunction) =>{
        try {
            const {body,files}=req
            const join = await LawyerJoin.findOne();

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
                    point_3: join.section_2.point_3,
                    point_4: join.section_2.point_4,
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

            await LawyerJoin.findByIdAndUpdate(join._id, formData,{new:true,runValidators:true});
            res.status(200).json({
                message: "Join Page updated successfully!"
            })

        } catch (e) {
            next(e)
        }
    }



}

export default LawyerJoinController;
