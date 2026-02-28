import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registercompany = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "company name is required"
            })
        }
        let company = await Company.findOne({ name });
        if (company) {
            return res.status(400).json({
                success: false,
                message: "company already exist"
            })
        };
        company = await Company.create({
            name: name,
            userId: req.id,

        })
        return res.status(201).json({
            success: true,
            message: "company registered successfully",
            company
        })
    } catch (err) {
        console.log(err)
    }
}

export const getcompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(401).json({
                success: false,
                message: "Componies not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "company fetched successfully",
            companies
        })
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "erron in fetching company "
        })

    }
}

export const getcompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(400).json({
                success: false,
                message: "company not found"
            })
        }
        return res.status(200).json({
            success: true,
            company,
            message: "company fetched successfully"
        })

    } catch (err) {
        console.log(err)
    }
}

export const updatecompany = async (req, res) => {
    try {
        const { name, description = "", website = "", location = "" } = req.body;

        const updateData = {
            name,
            description,
            website,
            location,
        };

        // ✅ upload only if file exists
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            updateData.logo = cloudResponse.secure_url;
        }

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        if (!company) {
            return res.status(400).json({
                success: false,
                message: "Problem in updating company"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Company information updated successfully",
        });

    } catch (err) {
        console.log(err); // ALWAYS log backend errors
        return res.status(500).json({
            success: false,
            message: "Error in updating company"
        });
    }
};