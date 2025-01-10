const express = require('express');
const db = require('../db');
const geolib = require('geolib');
const router = express.Router();


router.post('/create', async (req, res) => {
    const { class: courseClass, subject, board, latitude, longitude, userId } = req.body;


    console.log('Request body:', req.body);

    try {
        const [result] = await db.execute(
            'INSERT INTO courses (class, subject, board, latitude, longitude, created_by) VALUES (?, ?, ?, ?, ?,NOW())',
            [courseClass, subject, board, latitude, longitude]
        );
        console.log('Insert result:', result); 
        res.status(201).json({ message: 'Course created' });
    } catch (error) {

        console.error('Error creating course:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/updateCourse', async (req, res) => {
    const { id, class: courseClass, subject, board, latitude, longitude } = req.body;
    try {
        const [result] = await db.execute(
            'UPDATE courses SET class = ?, subject = ?, board = ?, latitude = ?, longitude = ? WHERE id = ?',
            [courseClass, subject, board, latitude, longitude, id]
        );
        res.json({ success: true, message: 'Course updated successfully!' });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/deleteCourse/:id', async (req, res) => {
    const courseId = req.params.id;
    try {
        const [result] = await db.execute('DELETE FROM courses WHERE id = ?', [courseId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json({ success: true, message: 'Course deleted successfully!' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ error: error.message });
    }
});



router.get('/getCourseList', async (req, res) => {
    const username = req.query.username; // Get the username from query params
    try {
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        // Get the user's latitude, longitude, and other details from the users table using the username
        const [userData] = await db.execute('SELECT * FROM users WHERE name = ?', [username]);

        if (!userData || userData.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = userData[0]; // User details
        const userLatitude = user.latitude;
        const userLongitude = user.longitude;

        // Get all courses from the courses table
        const [courses] = await db.execute('SELECT * FROM courses');

        // Filter courses based on distance from the user
        const filteredCourses = courses.filter(course =>
            geolib.isPointWithinRadius(
                { latitude: userLatitude, longitude: userLongitude },
                { latitude: course.latitude, longitude: course.longitude },
                16093 // 10 miles in meters
            )
        );

        // Combine user details and filtered courses in the response
        res.json({
            user,
            courses: filteredCourses,
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
