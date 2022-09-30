import {IController, IUploadMultipleFooter} from "../../interface";
import {Router,Request,Response,NextFunction} from "express";
import Footer from "../../model/cms/footer";
import cloudinary from "../../utils/cloudinary/cloudinary";
import {CloudinaryService} from "../../utils/cloudinary/uploadImage";
import upload from "../../middleware/multer";

const uploadMultipleFooter = upload.fields([
    {name: 'section_1_image', maxCount: 1},
]);

class FooterController implements IController {
    public path = "/footer"
    public router = Router();
    private cloudinaryService: CloudinaryService
    constructor() {
        this.cloudinaryService = new CloudinaryService()
        this.router.get(`${this.path}`,this.getFooter)
        this.router.post(`${this.path}`,this.createFooter)
        this.router.put(`${this.path}`,this.updateFooter)
        this.router.put(`${this.path}/image`,uploadMultipleFooter,this.updateFooterWithImage)
    }

    private getFooter=async(_req:Request,res:Response,next:NextFunction)=>{
        try {
            const footer =await Footer.find()
            res.status(200).json({
                footer:footer
            })
        } catch (e) {
            next(e)
        }
    }
    private createFooter=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const isFooter = await Footer.findOne()
            if(isFooter){
                res.status(403).json({
                    message: "Cannot create Footer again"
                })
            }
            else{

                const footer = await Footer.create({...req.body})

                res.status(200).json({
                    message:"Footer created successfully",
                    footer:footer
                })
            }
        } catch (e) {
            next(e)
        }
    }
    private updateFooter=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const footer: any = await Footer.findOne();
            if(footer) {
                const section = req.body.section
                await Footer.findByIdAndUpdate(footer._id, {
                    [section]:{
                        ...footer[section],
                        ...req.body[section]
                    }
                },{new:true,runValidators:true})
                res.status(200).json({updated: true})
            }
            else{
                res.status(400).json({
                    message: "Footer page not found"
                })
            }
        } catch (e) {
            next(e)
        }
    }


    private updateFooterWithImage=async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {body,files}=req
            const footer = await Footer.findOne();

            const formData:any ={
                section_1: {
                    heading: footer.section_1.heading,
                    image: {
                        url:footer.section_1.image.url,
                        cloudinary_id:footer.section_1.image.cloudinary_id
                    },
                },
                section_2: {
                    text: footer.section_2.text,
                    phone_number: footer.section_2.phone_number,
                    email: footer.section_2.email,
                    location: footer.section_2.location
                },
            }
            const { section_1_image} =
                files as unknown as IUploadMultipleFooter;
            if (section_1_image && section_1_image[0].fieldname) {
                if(footer.section_1.image.cloudinary_id){
                    await cloudinary.v2.uploader.destroy(
                        footer.section_1.image.cloudinary_id
                    )}
                const uploadImage1 = await this.cloudinaryService.uploadImage(section_1_image[0]);
                formData.section_1 = {
                    ...formData.section_1,
                    image: {
                        url: uploadImage1?.secure_url,
                        cloudinary_id: uploadImage1?.public_id
                    },
                    heading:body.heading,
                }
            }
            await Footer.findByIdAndUpdate(footer._id, formData,{new:true,runValidators:true});
            res.status(200).json({
                message: "Footer updated successfully!"
            })

        } catch (e) {
            next(e)
        }
    }

}

export default FooterController;
