import db from "../../config/db.js";


export const getEmployeesForSalary = (req, res) => {
    const sql = `SELECT employee_id, name, email, phone, salary FROM employees`;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching employees:', err);
            return res.status(500).send('Server error');
        }
        res.json(result);
    });
};
