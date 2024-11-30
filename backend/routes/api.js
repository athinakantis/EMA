const express = require('express');
const router = express.Router();
const db = require('../db');

// GET requests
router.get('/employees', (req, res) => {
    const sql = 'select * from employees order by firstname';
    db.query(sql)
        .then(([rows]) => {
            res.send(rows);
        })
        .catch(console.log);
});

router.get('/employees/range/:offset', (req, res) => {
    const { offset } = req.params;

    const sql = `select * from employees order by firstname limit 8 offset ?`;
    db.query(sql, [+offset])
        .then((data) => {
            res.send(data[0]);
        })
        .catch(console.log);
});

router.get('/employeeCount', (req, res) => {
    const sql = `select count(id) as count from employees;`;

    db.query(sql)
        .then((data) => {
            if (Number.isInteger(data[0][0].count)) {
                res.send(JSON.stringify(data[0][0].count));
            } else {
                res.status(500).send(
                    JSON.stringify({
                        message: 'Error retrieving employeecount from database',
                    })
                );
            }
        })
        .catch(console.log);
});

router.get('/employee/:id/', async (req, res) => {
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

// POST requests
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
        const sql = `insert into employees (firstname, lastname, employment_type, role, startdate, department, location, salary) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

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

        const id = await db.execute('select max(id) as id from employees');

        res.send(
            JSON.stringify({
                status: 200,
                message: 'Employee was successfully added!',
                id: id,
            })
        );
    } catch (err) {
        console.error(err);
    }
});

// DELETE requests
router.delete('/employee/:id', async (req, res) => {
    try {
        console.log('Received request to delete employee');
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

// PUT requests
router.put('/employee/:id', async (req, res) => {
    try {
        console.log('Received request to update employee');
        const { department, location, salary, id } = req.body.data;
        console.log(department, location, salary, id);
        const sql = `update employees set department = ? , location = ? , salary = ? where id = ?`;
        db.execute(sql, [department, location, salary, id]);
        res.send(
            JSON.stringify({
                status: 200,
                message: 'Employee was successfully updated!',
            })
        );
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
