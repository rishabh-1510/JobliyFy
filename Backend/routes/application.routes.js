import express from "express";
import auth from "../middleware/auth.js";
import { updateStatus,getApplicants,getAppliedJobs,applyJob } from "../controller/application.controller.js";

const Router = express.Router();

Router.post("/apply/:id",auth,applyJob);
Router.get("/getAppliedjobs",auth,getAppliedJobs);
Router.get("/:id/applicants",auth,getApplicants );
Router.post("/status/:id/update",auth,updateStatus);

export default Router;