import express from "express"
import {logout, register} from "../controller/User.controller.js"
import  {login}  from "../controller/User.controller.js";
import {updateProfile} from "../controller/Profile.controller.js"
import auth from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";
const Router = express.Router();
Router.post("/register",singleUpload,register);
Router.post("/login",login);
Router.post("/profile/update", auth,singleUpload,updateProfile)
Router.get("/logout",logout);
export default Router;
 