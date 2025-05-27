import db from "../../config/db.js";
import sharp from "sharp";
import path from "path";
import fs from "fs";

////API:http://localhost:8000/v1/api/employees
export const getAllEmployees = (req, res) => {
  const query = "SELECT * FROM employees";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    }
    res.status(200).json({ success: true, data: results });
  });
};
//API:http://localhost:8000/v1/api/employee/2
export const getEmployeeById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM employees WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching employee:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
};
// // Add Student API
//API:http://localhost:8000/v1/api/employee
export const createEmployee = async (req, res) => {
  const {
    employee_id, salary, joining_salary, name, designation, subject, email, phone, gender, address, joining_date, photo
  } = req.body;

  if (
    !employee_id || !name || !designation || !subject || !gender ||
    !phone || !email || !address || !joining_date
  ) {
    return res.status(400).json({ error: 'All fields are required!' });
  }
  //Photo check

  if (!req.file) {
    return res.status(400).json({ error: "Photo is required!" });
  }

  try {
    const fileName = `${name.split(" ")[0]}_c_${employee_id}.jpg`;

    // Absolute dir path
    const dir = path.resolve("public/uploads/employees_photo");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Absolute upload path
    const uploadPath = path.join(dir, fileName);

    // Compress and save
    await sharp(req.file.buffer)
      .resize({ width: 800 })
      .jpeg({ quality: 70 })
      .toFile(uploadPath);


    const sql = `INSERT INTO employees
        (employee_id, salary , joining_salary, name, designation,
        subject, email, phone, gender, address, joining_date, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

    db.query(sql, [employee_id, salary, joining_salary, name, designation, subject, email,
      phone, gender, address, joining_date, fileName
    ], (err, result) => {
      if (err) {
        console.error('Error inserting student:', err);
        res.status(500).send('Server error');
      } else {
        res.send({ message: 'Employee added successfully!', employeeId: result.insertId });
      }
    });

  } catch (error) {
    console.error("Image processing error:", error);
    res.status(500).json({ error: "Image upload failed!" });
  }

}
// Update Student API
//API:http://localhost:8000/v1/api/employee/13
export const updateEmployee = (req, res) => {
  const id = req.params.id;

  const selectSql = `SELECT * FROM employees WHERE id = ?`;
  db.query(selectSql, [id], async (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('Employees not found');
    }

    const oldData = results[0];
    const {
      employee_id = oldData.employee_id,
      name = oldData.name,
      designation = oldData.designation,
      subject = oldData.subject,
      email = oldData.email,
      salary = oldData.salary,
      joining_salary = oldData.joining_salary,
      phone = oldData.phone,
      gender = oldData.gender,
      address = oldData.address,
      joining_date = oldData.joining_date,
      photo = oldData.photo
    } = req.body;
    try {
      let photo = oldData.photo;
      // যদি নতুন ছবি আসে, তাহলে আগেরটা ডিলিট করে নতুনটা save করবো
      if (req.file) {

        // পুরানো ছবি ফাইল ডিলিট
        const oldPhotoPath = path.resolve('public/uploads/students_photo', oldData.photo);

        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
        // নতুন ছবির ফাইল নাম
        const fileName = `${name.split(" ")[0]}_c_${employee_id}.jpg`;

        const dir = path.resolve('public/uploads/employees_photo');
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        const uploadPath = path.join(dir, fileName);

        await sharp(req.file.buffer)
          .resize({ width: 800 })
          .jpeg({ quality: 70 })
          .toFile(uploadPath);
        photo = fileName;
      }

      // Update query
      const updateSql = `UPDATE employees SET
      employee_id = ?, name = ?, designation = ?, subject = ?, salary = ?, joining_salary = ?, email = ?, phone = ?,
      gender = ?, address = ?, joining_date = ?, photo = ?
      WHERE id = ?`;

      db.query(updateSql, [
        employee_id, name, designation, subject, salary, joining_salary, email, phone,
        gender, address, joining_date, photo, id
      ], (err, result) => {
        if (err) {
          console.error('Error updating teacher:', err);
          return res.status(500).send('Server error');
        }
        res.send({ message: 'Teacher updated successfully!' });
      });

    } catch (error) {
      console.error('Image processing error:', error);
      res.status(500).json({ error: 'Image upload/update failed!' });
    }


  });
};

// Delete Student
//API:http://localhost:8000/v1/api/employee/12
export const deleteEmployee = (req, res) => {
  const sql = `DELETE FROM employees WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error deleting teacher:', err);
      res.status(500).send('Server error');
    } else {
      res.send({ message: 'Teacher deleted successfully!' });
    }
  });
}










export const getEmployeeDetails = (req, res) => {
  const query = `
    SELECT id, employee_id, name, designation, joining_salary, salary, joining_date
    FROM employees
    ORDER BY name
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB error on fetching employees." });

    res.status(200).json({ success: true, data: results });
  });
};
export const addSalaryIncrement = (req, res) => {
  const { id, increment_amount } = req.body;


  if (!id || !increment_amount) {
    return res.status(400).json({ success: false, message: "Employee ID and Increment Amount are required." });
  }

  // 1. Get current salary
  const getSalaryQuery = `SELECT salary FROM employees WHERE id = ?`;

  db.query(getSalaryQuery, [id], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error fetching salary" });
    if (result.length === 0) return res.status(404).json({ success: false, message: "Employee not found" });

    const previousSalary = result[0].current_salary;
    const newSalary = (parseFloat(previousSalary) + parseFloat(increment_amount)).toFixed(2);

    // 2. Insert increment record
    const insertIncrementQuery = `
      INSERT INTO salary_increments (employee_id, previous_salary, increment_amount, new_salary, increment_date)
      VALUES (?, ?, ?, ?, CURDATE())
    `;

    db.query(
      insertIncrementQuery,
      [employee_id, previousSalary, increment_amount, newSalary],
      (insertErr, insertResult) => {
        if (insertErr) return res.status(500).json({ success: false, message: "DB Error on increment insert" });

        // 3. Update employee's current salary
        const updateSalaryQuery = `UPDATE employees SET current_salary = ? WHERE id = ?`;

        db.query(updateSalaryQuery, [newSalary, employee_id], (updateErr) => {
          if (updateErr) return res.status(500).json({ success: false, message: "DB Error updating salary" });

          res.status(200).json({ success: true, message: "Salary incremented successfully." });
        });
      }
    );
  });
};