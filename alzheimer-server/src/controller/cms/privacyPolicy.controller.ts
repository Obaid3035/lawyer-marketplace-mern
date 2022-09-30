import {IController, IUploadMultiplePrivacy} from "../../interface";
import {NextFunction, Request, Response, Router} from "express";
import {CloudinaryService} from "../../utils/cloudinary/uploadImage";
import cloudinary from "../../utils/cloudinary/cloudinary";
import upload from "../../middleware/multer";
import PrivacyPolicy from "../../model/cms/privacyPolicy";


const uploadMultiplePrivacy = upload.fields([
    {name: 'section_1_image', maxCount: 1},

]);

class PrivacyPolicyController implements IController {
    public path = "/privacy-policy"
    public router = Router();
    private cloudinaryService: CloudinaryService

    constructor() {
        this.cloudinaryService = new CloudinaryService()
        this.router.get(`${this.path}`,this.getPrivacyPolicy)
        this.router.post(`${this.path}`,this.createPrivacyPolicy)
        this.router.put(`${this.path}`,this.updatePrivacyPolicy)
        this.router.put(`${this.path}/image`,uploadMultiplePrivacy,this.updatePrivacyPolicyWithImage)
    }

    private getPrivacyPolicy=async(_req:Request,res:Response,next:NextFunction)=>{
        try {
            const privacyPolicy =await PrivacyPolicy.find()

            res.status(200).json({
                privacyPolicy:privacyPolicy
            })
        } catch (e) {
            next(e)
        }
    }

    private createPrivacyPolicy=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const isPrivacyPolicy = await PrivacyPolicy.findOne()
            if(isPrivacyPolicy){
                res.status(403).json({
                    message: "Cannot create PrivacyPolicy again"
                })
            }
            else{

                const privacyPolicy =await PrivacyPolicy.create({...req.body})

                res.status(200).json({
                    message:"PrivacyPolicy Page created successfully",
                    privacyPolicy:privacyPolicy
                })
            }
        } catch (e) {
            next(e)
        }
    }

    private updatePrivacyPolicy=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const privacyPolicy: any = await PrivacyPolicy.findOne();
            if(privacyPolicy) {
                const section = req.body.section
                await PrivacyPolicy.findByIdAndUpdate(privacyPolicy._id, {
                    [section]:{
                        ...privacyPolicy[section],
                        ...req.body[section]
                    }

                },{new:true,runValidators:true})
                res.status(200).json({updated: true})
            }
            else{
                res.status(400).json({
                    message: "PrivacyPolicy page not found"
                })
            }
        } catch (e) {
            next(e)
        }
    }

    private updatePrivacyPolicyWithImage=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {body,files}=req

            const privacy = await PrivacyPolicy.findOne();

            let formData:any ={
                text: privacy.text,
                image: {
                    url:privacy.image.url,
                    cloudinary_id:privacy.image.cloudinary_id
                },
            }
            const { section_1_image} =
                files as unknown as IUploadMultiplePrivacy;
            if (section_1_image && section_1_image[0].fieldname) {
                if(privacy.image.cloudinary_id){
                    await cloudinary.v2.uploader.destroy(
                        privacy.image.cloudinary_id
                    )}
                const uploadImage1 = await this.cloudinaryService.uploadImage(section_1_image[0]);
                formData = {
                    ...formData,
                    text:body.text,
                    image: {
                        url: uploadImage1?.secure_url,
                        cloudinary_id: uploadImage1?.public_id
                    },
                }
            }
            await PrivacyPolicy.findByIdAndUpdate(privacy._id, formData,{new:true,runValidators:true});
            res.status(200).json({
                message: "Footer updated successfully!"
            })

        } catch (e) {
            next(e)
        }
    }



}

export default PrivacyPolicyController;
