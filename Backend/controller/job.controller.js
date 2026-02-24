import { Job } from "../models/job.model.js";
//admin
export const postJob = async(req,res)=>{
    try{
        const{title , description , requirements , salary , location , jobType , experienceLevel , position , componyId} = req.body;
     
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !componyId){
            return res.status(401).json({   
                success:false,
                message:"Fill all the fields properly"
            })
        }
        const job = await Job.create({
            title ,
            description , 
            requirements:requirements.split(",") , 
            salary : Number(salary), 
            location , 
            jobType , 
            experienceLevel:Number(experienceLevel) , 
            position , 
            company:componyId,
            created_by:userId  
        })
        return res.status(201).json({
            success:true,
            message:"New Job Created Successfully",
            job
        })

    }catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"PRoblem in creating job",
        })
    }
}
//student
export const getAllJobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword , $options:"i"}},
                {description:{$regex:keyword , $options:"i"}}
            ]
        };
        const jobs = await Job.find(query).populate("company").sort({createdAt:-1});
        if(!jobs){
            return res.status(400).json({
            success:false,
            message:"JOB not Found"
            })
        }

        return res.status(201).json({
            success:true,
            message:"Jobs fetched successfully",
            jobs,
    })

    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Problem in fetching jobs"
        })
    }
}
//student
export const getJobById = async(req,res)=>{
    try{
        const jobId =req.params.id;
        const job = await Job.findById(jobId).populate("company").populate('applications');
        if(!job){
            return res.status(400).json({
            success:false,
            message:"JOB not Found"
            })
        }
        return res.status(201).json({
            success:true,
            message:"Jobs fetched successfully",
            job})
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"PRoblem in fetching job"
        })
    }
}

//get admin created jobs
export const getAdminJobs = async (req,res)=>{
    try{
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate("company")
        if(!jobs){
            return res.status(400).json({
                success:false,
                message:"Jobs not found"
            })
        }
        return res.status(200).json({
            success:true,
            messsage:"Jobs fetched successfully",
            jobs
        })
    }catch(err){
        console.log(err)
        return res.status(401).json({
            success:true,
            message:"Problem in fetching jobs",
            
        })
    }
}

// 2:37