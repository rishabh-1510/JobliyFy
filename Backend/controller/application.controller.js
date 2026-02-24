import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";


export const applyJob = async(req,res)=>{
    try{
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                success:false,
                message:"jobId Not found"
            })
        };
        // check if user have already applied for job or not  
        const existingApplication =await Application.findOne({job:jobId , applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                success:false,
                message:"User Already applied"
            })
        }
        const job= await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                success:false,
                message:"job Not found"
            })
        }
        //create new appliaction
        const newApplication =await Application.create({
            job:jobId,
            applicant:userId,
        })
        const updateJob = await Job.findByIdAndUpdate({_id:jobId},{$push:{applications:newApplication._id}},{new:true});

        return res.status(200).json({
            success:true,
            message:"Application created successfuly"
        })

    }catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
};
//for user
export const getAppliedJobs = async (req,res)=>{
    try{
        const userId = req.id;
        const appliaction = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }

        })
        if(!appliaction){ 
            return res.status(400).json({
                message:"No application ",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            appliaction,
        })

        
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"problem in fetching jobs"
        })
    }
}

//Get applicants
export const getApplicants = async (req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })
        if(!job){
            return res.status(400).json({
            success:false,
            message:"problem in fetching applicants"
            })
        };
        return res.status(200).json({
            success:true,
            job,
        })

    }catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"problem in fetching Applicatns"
        })
    }
}

export const updateStatus = async(req,res)=>{
    try{
        const {status} = req.body;
        const applicantionId = req.params.id;
        if(!status){
            return res.status(400).json({
                success:false,
                message:"problem in fetching applicants"
            })
        }
        const application =await Application.findByIdAndUpdate({_id:applicantionId},{status},{new:true});
        if(!application){
            return res.status(400).json({
                success:false,
                message:"Application not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"status updated successfully"
            
        })

    }catch(err){
       console.log(err);
        return res.status(400).json({
            success:false,
            message:"problem in updating status"
        })     
    }
}