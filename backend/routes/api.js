const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM EMPLOYEES';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data: ', err.message);
            res.status(500).json({ error: 'Failed to retrieve data' });
        } else {
            res.json(results)
        }
    })
})

router.post('/add', (req, res) => {
    const { firstname, lastname, employment_type, role, startdate, department, location, salary } = req.body;
    console.log('Received request to api/add')
    console.log(req.body)
    const sql = `INSERT INTO EMPLOYEES (firstname, lastname, employment_type, role, startdate, department, location, salary) VALUES('${firstname}', '${lastname}', '${employment_type}', '${role}', '${startdate}', '${department}', '${location}', ${salary})`

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error adding to the database: ', err.message)
            res.status(500).json({ error: 'Failed to add to database' })
        } else {
            res.json({status: 200, message: `${firstname} ${lastname} was added to employees!`})
        }
    })
})

module.exports = router;