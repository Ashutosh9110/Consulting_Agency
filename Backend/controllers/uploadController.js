const Upload = require("../models/Upload")

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "File required" })
        }
        const file = await Upload.create({
            fileName: req.file.filename,
            filePath: req.file.path,
            mimeType: req.file.mimetype,
            userId: req.user.id
        })
        res.status(201).json({
            message: "File uploaded successfully",
            file
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
