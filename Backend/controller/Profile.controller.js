import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

export const updateProfile = async (req, res) => {
    try {

        const { fullName, email, mobileNumber, bio = "", skills = "" } = req.body;
        const file = req.file;
        const userId = req.id;

        let cloudResponse;

        // ===============================
        // Resume Upload
        // ===============================

        if (file) {

            // Only allow PDF
            if (file.mimetype !== "application/pdf") {
                return res.status(400).json({
                    success: false,
                    message: "Only PDF resumes are allowed"
                });
            }

            // 5MB file limit
            if (file.size > 5 * 1024 * 1024) {
                return res.status(400).json({
                    success: false,
                    message: "Resume must be less than 5MB"
                });
            }

            // Upload to Cloudinary using stream
            cloudResponse = await new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "image",
                        folder: "jobportal/resumes",
                        type:'upload'
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                streamifier.createReadStream(file.buffer).pipe(stream);

            });

        }

        // ===============================
        // Find User
        // ===============================

        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Ensure profile object exists
        if (!user.profile) {
            user.profile = {};
        }

        // ===============================
        // Update User Fields
        // ===============================

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (mobileNumber) user.mobileNumber = mobileNumber;
        if (bio) user.profile.bio = bio;

        if (skills) {
            const skillsArray = skills.split(",");
            user.profile.skills = skillsArray;
        }

        // Save resume URL
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        // ===============================
        // Clean Response
        // ===============================

        const updatedUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            mobileNumber: user.mobileNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};