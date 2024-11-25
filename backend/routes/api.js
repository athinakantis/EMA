const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM EMPLOYEES';
    db.query(sql)
        .then(([rows]) => {
            res.send(rows);
        })
        .catch((err) => console.log);
});

router.post('/add', async (req, res) => {
    const {
        firstname,
        lastname,
        employment_type,
        role,
        startdate,
        department,
        location,
        salary,
    } = req.body;

    try {
        console.log('Received request to api/add');
        console.log(req.body);
        const sql = `INSERT INTO EMPLOYEES (firstname, lastname, employment_type, role, startdate, department, location, salary) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

        db.execute(sql, [
            firstname,
            lastname,
            employment_type,
            role,
            startdate,
            department,
            location,
            salary,
        ]);
    } catch (err) {
        console.error(err);
    }
});

router.get('/employee/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = `select * from employees where id=?`;

        db.query(sql, [id]).then(([rows]) => {
            res.send(rows);
        });
    } catch (err) {
        console.log(err.message);
    }
});

router.delete('/employee/:id', async (req, res) => {
    try {
        console.log('received request to delete employee');
        const { id } = req.params;
        const sql = `delete from employees where id=? limit 1`;
        db.query(sql, [id]);
        res.send(
            JSON.stringify({
                status: 200,
                message: 'Employee was successfully removed!',
            })
        );
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;
