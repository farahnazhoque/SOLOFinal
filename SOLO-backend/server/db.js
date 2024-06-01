const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const multer = require('multer');
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware
const { uploadMedia } = require('../services/awsS3_upload'); 

const app = express();
const port = process.env.PORT || 3001;
// Use the cors middleware
app.use(cors());

app.use(bodyParser.json());

const pool = mysql.createPool({
    host: "solotestdb.cxqsaw0a4eyq.us-west-1.rds.amazonaws.com",
    user: "admin",
    port: 3306,
    password: "SoloTestDB",
    database: "SoloTestDB"
});

// Ensure the uploads directory exists within the services directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const upload = multer({ dest: uploadsDir  });

// Test endpoint
app.get('/test', (req, res) => {
    res.send('Server is working');
});

// Upload endpoint
app.post('/upload', (req, res, next) => {
    console.log('Request received at /upload');
    next();
  }, upload.single('file'), async (req, res) => {
      console.log('Processing upload');
      try {
        const file = req.file;
        if (!file) {
          console.log('No file uploaded.'); // Log if no file is uploaded
          return res.status(400).send('No file uploaded.');
        }
  
        console.log('(backend) File received:', file.originalname, file.mimetype); // Log original name and MIME type
  
        const mediaPath = file.path; // Use the file path directly
        console.log('Media path:', mediaPath); // Log the media path
  
        if (!fs.existsSync(mediaPath)) {
          console.log('File does not exist at path:', mediaPath);
          return res.status(500).send('File does not exist.');
        }
  
        const mediaName = file.originalname;
  
        const bucketName = 'solo-media-bucket-test'; // replace with your bucket name
        const mediaUrl = await uploadMedia(bucketName, mediaPath, mediaName);
  
        fs.unlinkSync(mediaPath);
  
        res.send({ mediaUrl });
      } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file.');
      }
  });

app.post('/api/users', upload.single('profilePhoto'), async (req, res) => {
    const { name, email, password, role } = req.body;
    const profilePhoto = req.file ? req.file.path : null;

    console.log('Received data:', req.body); // Log received data
    console.log('Received file:', req.file); // Log received file

    try {
        let query;
        if (role === 'Coach') {
            query = 'INSERT INTO coach (name, email, password, profile_photo) VALUES (?, ?, ?, ?)';
        } else if (role === 'Athlete') {
            query = 'INSERT INTO athlete (name, email, password, profile_photo) VALUES (?, ?, ?, ?)';
        } else {
            return res.status(400).send('Invalid role');
        }

        const [result] = await pool.query(query, [name, email, password, profilePhoto]);
        res.send({ id: result.insertId, name, email, password, profilePhoto, role });
    } catch (error) {
        console.error('Database query error:', error); // More specific error message
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = pool;
