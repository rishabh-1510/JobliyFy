import express from "express"
import { postJob , getAdminJobs ,getJobById , getAllJobs } from "../controller/job.controller.js"
import auth from "../middleware/auth.js"
import { isRecruiter } from "../middleware/auth.js"
const Router = express.Router()

Router.post("/postJob",auth,isRecruiter,postJob);
Router.get("/getAllJobs",auth,getAllJobs);
Router.get("/getJobById/:id",auth,getJobById);
Router.get("/getAdminJobs",auth,getAdminJobs);

export default Router;