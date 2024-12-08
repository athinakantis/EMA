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

router.get('/teamleads/', (req, res) => {
    // Get department, employeeId, employee firstname, lastname and departmentId
    const sql = `SELECT 
    d.departmentName,
    d.departmentId,
     tl.employeeId,
    e.firstname,
    e.lastname
    FROM 
    teamleads tl
    JOIN 
    department d ON tl.departmentId = d.departmentId
    JOIN 
    employees e ON tl.employeeId = e.id;`;

    db.query(sql).then((data) => {
        console.log(data[0]);
        res.send(data[0]);
    });
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

        db.query(sql, [id]).then(([rows]) => res.send(rows));
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/employeeCount/:filter/:value', async (req, res) => {
    const { filter, value } = req.params;
    try {
        const sql = `select count(id) as count from employees where ${filter} = ?;`;

        db.execute(sql, [value]).then((data) => {
            res.send(JSON.stringify(data[0][0].count));
        });
    } catch (err) {
        console.error(err);
    }
});

router.get('/employees/:filter/:value/:offset', async (req, res) => {
    const { filter, value, offset } = req.params;
    try {
        if (filter === 'salary') {
            db.execute(
                `select * from employees order by salary ${value} limit 8 offset ?;`,
                [+offset]
            ).then(([rows]) => res.send(rows));
        } else {
            const sql = `select * from employees where ${filter} = ? order by firstname limit 8 offset ?;`;
            db.execute(sql, [value, +offset]).then(([rows]) => res.send(rows));
        }
    } catch (err) {
        console.error(err);
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
router.patch('/employee/:id', async (req, res) => {
    try {
        const { department, location, salary, id } = req.body.data;
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
