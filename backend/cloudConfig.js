const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

let storage;

// Use Cloudinary if valid credentials exist, otherwise fallback to local disk storage
if (
    process.env.CLOUD_NAME &&
    process.env.CLOUD_NAME !== 'demo_cloud' &&
    process.env.CLOUD_API_KEY &&
    process.env.CLOUD_API_KEY !== '123456789012345' &&
    process.env.CLOUD_API_SECRET &&
    process.env.CLOUD_API_SECRET !== 'your_cloudinary_api_secret_here' &&
    process.env.CLOUD_API_SECRET !== 'sample_secret_key'
) {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
    });

    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'spotlight_DEV',
            allowed_formats: ['png', 'jpg', 'jpeg', 'webp', 'avif', 'svg'],
        },
    });
} else {
    // Local disk storage fallback
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(__dirname, 'uploads');
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });
}

module.exports = {
    cloudinary,
    storage,
};
