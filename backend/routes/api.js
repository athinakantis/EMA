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

module.exports = router;