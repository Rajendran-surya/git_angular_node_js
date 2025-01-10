const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const multer = require('multer');
const router = express.Router();
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'), 
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname), 
});

const upload = multer({ storage });


router.post('/signup', upload.single('profile_image'), async (req, res) => {
    const { name, email, password, latitude, longitude } = req.body;


    if (!name || !email || !password || !latitude || !longitude) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
       
        const token = jwt.sign({ email }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '1h' });

      
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, profile_image, latitude, longitude, token) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                name,
                email,
                hashedPassword,
                req.file ? req.file.path : null,  
                latitude,
                longitude,
                token,
            ]
        );


        res.status(201).json({ message: 'User registered', userId: result.insertId, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});

router.post('/uploadprofileimage', upload.single('profile_image'), async (req, res) => {
    console.log('Uploaded File:', req.file);  // Log the file object to check if it's being received

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const imagePath = req.file.path; 
        console.log('imagePath File:',imagePath); 
       
  
        const username = req.body.name; 
        console.log('username File:', username); 
        if (!username) {
            return res.status(400).send('Username is required.');
        }


        await db.execute('UPDATE users SET profile_image = ? WHERE name = ?', [imagePath, username]);

        res.json({ profile_image: imagePath }); 
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Error uploading image.');
    }
});



// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;


    if (!username || !password) {
        return res.status(400).json({ message: 'Missing username or password' });
    }

    try {
     
        const [users] = await db.execute('SELECT * FROM users WHERE name = ?', [username]);
        const user = users[0];

        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

  
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '1h' });


        await db.execute('UPDATE users SET token = ? WHERE id = ?', [token, user.id]);


        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
});

module.exports = router;
