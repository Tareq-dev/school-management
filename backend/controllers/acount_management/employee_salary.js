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



export const giveSalary = (req, res) => {
    const { selectedEmployees } = req.body;

    if (!selectedEmployees || !Array.isArray(selectedEmployees) || selectedEmployees.length === 0) {
        return res.status(400).json({ message: "কাউকে সিলেক্ট করা হয়নি।" });
    }

    const employeeIds = selectedEmployees.map(emp => emp.employee_id);
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    // Step 1: Check if salary already given this month
    const placeholdersCheck = employeeIds.map(() => '?').join(',');
    const sqlCheck = `
        SELECT employee_id 
        FROM employee_salary 
        WHERE MONTH(pay_date) = ? AND YEAR(pay_date) = ? AND employee_id IN (${placeholdersCheck})
    `;
 
    db.query(sqlCheck, [currentMonth, currentYear, ...employeeIds], (err, paidEmployees) => {
        if (err) {
            console.error('Error checking salary:', err);
            return res.status(500).json({ message: 'Server error during salary check' });
        }
        const alreadyPaidIds = paidEmployees.map(emp => emp.employee_id);
        const unpaidEmployeeIds = employeeIds.filter(id => !alreadyPaidIds.includes(id));

        if (unpaidEmployeeIds.length === 0) {
            return res.status(400).json({ message: "সিলেক্ট করা সকল employee-এর salary এই মাসে already দেয়া হয়েছে।" });
        }

        // Step 2: Fetch unpaid employee info
        const placeholdersFetch = unpaidEmployeeIds.map(() => '?').join(',');
        const sqlFetch = `SELECT employee_id, name, email, salary FROM employees WHERE employee_id IN (${placeholdersFetch})`;

        db.query(sqlFetch, unpaidEmployeeIds, (err, employees) => {
            if (err) {
                console.error('Error fetching employee info:', err);
                return res.status(500).json({ message: 'Server error during employee fetch' });
            }

            if (employees.length === 0) {
                return res.status(404).json({ message: "কোনো employee পাওয়া যায়নি।" });
            }

            // Step 3: Prepare insert values
            const values = employees.map(emp => [
                emp.employee_id,
                emp.name,
                emp.email,
                emp.salary,
                new Date()
            ]);

            const sqlInsert = `
                INSERT INTO employee_salary (employee_id, name, email, salary, pay_date)
                VALUES ?
            `;

            db.query(sqlInsert, [values], (err, result) => {
                if (err) {
                    console.error('Error inserting salaries:', err);
                    return res.status(500).json({ message: 'Server error during salary insert' });
                }

                res.json({
                    message: `${result.affectedRows} জন employee-এর salary সফলভাবে দেয়া হয়েছে।`,
                    skipped: alreadyPaidIds
                });
            });
        });
    });
};

