import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
dotenv.config()
export const register = async (req, res) => {
    try {
        const { fullName, email, mobileNumber, password, role } = req.body;
        if (!fullName || !email || !mobileNumber || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Fill all the credential properly"
            })
        };
        const file = req.file;
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already exists please login"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            fullName,
            email,
            mobileNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully"
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Fill all fields carefully"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            });
        }

        if (role !== user.role) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Role"
            });
        }

        const tokenData = {
            userId: user._id,
            role: user.role
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        const userData = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.mobileNumber,
            role: user.role,
            profile: user.profile
        };

        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,        // required for HTTPS (Vercel)
                sameSite: "none",    // required for cross-site cookies
                maxAge: 1 * 24 * 60 * 60 * 1000
            })
            .json({
                success: true,
                message: `Welcome back ${user.fullName}`,
                user: userData
            });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logged Out Successful"
        })

    } catch (err) {
        console.log(err);
    }
}
