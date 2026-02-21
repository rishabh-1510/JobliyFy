import User from '../models/user.model.js';
import cloudinary from '../utils/cloudinary.js';
import getDataUri from '../utils/datauri.js';

export const updateProfile=async(req,res)=>{
    try{
        const{fullName , email , mobileNumber ,bio="" ,skills ="" } = req.body;
        const file  = req.file;
        const userId = req.id;
        //cloudinary
        if(file){
            const fileUri = getDataUri(file);
            var cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
                 resource_type: "raw",
            });
        }

        console.log("FILE:", req.file);
        const skillsArray = skills.split(",");
        let user = await User.findById(userId);
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not exist"
            })
        };

        if(fullName){
            user.fullName = fullName;
        }
        if(email)
            user.email = email; 
        if(mobileNumber)
            user.mobileNumber = mobileNumber;
        if(bio)
            user.profile.bio = bio;
        if(skills)
            user.profile.skills =skillsArray
        if(cloudResponse){
            
            user.profile.resume = cloudResponse.secure_url + "#view=FitH";
            user.profile.resumeOriginalName = file?.originalname
        }

        await user.save();

        user={
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            mobileNumber:user.mobileNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"Profile updated succcessfully",
            success:true,
            user
        })
    }catch(err){
        console.log(err);
        return res.status(404).json({
            success:false,
            message:err.message
        })
    }
}