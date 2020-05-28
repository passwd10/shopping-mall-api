import AWS from 'aws-sdk';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { addItem } from '../services/itemService';

const router = express.Router();

require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECURE_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3({ /* ... */ }),
    bucket: "shopping-mall",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, file.originalname)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', upload.single('img'), (req, res) => {
  if (req.file) {
    const productInfo = JSON.parse(req.body.productInfo);
    productInfo.img = req.file.location;
    addItem(productInfo);
    res.status(200).send('Success upload img');
  } else {
    res.status(401).send('No file');
  }
})

export default router;
