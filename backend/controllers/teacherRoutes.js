import db from "../config/db.js";

export const getAllteachers = (req, res) => {
    const query = "SELECT * FROM teachers";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching teachers:", err);
            return res.status(500).json({ success: false, message: "DB Error" });
        }
        res.status(200).json({ success: true, data: results });
    });
};
export const getTeacherById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM teachers WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error fetching Teacher:", err);
            return res.status(500).json({ success: false, message: "DB Error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "Teacher not found" });
        }
        res.status(200).json({ success: true, data: results[0] });
    });
};
// // Add Student API
export const createTeacher = (req, res) => {
    const {
        teacher_id, name, designation, subject, email, phone, gender, address, joining_date, photo
    } = req.body;


    if (
        !teacher_id || !name || !designation || !subject || !gender ||
        !phone || !email || !address || !joining_date || !photo
    ) {
        return res.status(400).json({ error: 'All fields are required!' });
    }


    const sql = `INSERT INTO teachers 
  ( teacher_id, name, designation, subject, email, phone, gender, address, joining_date, photo)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        teacher_id, name, designation, subject, email, phone, gender, address, joining_date, photo
    ], (err, result) => {
        if (err) {
            console.error('Error inserting teacher:', err);
            res.status(500).send('Server error');
        } else {
            res.send({ message: 'Teacher added successfully!', teacher_id: result.insertId });
        }
    });
}
// // Update Student API

export const updateTeacher = (req, res) => {
  const id = req.params.id;

  const selectSql = `SELECT * FROM teachers WHERE id = ?`;
  db.query(selectSql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching teacher:', err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('Teacher not found');
    }

    const oldData = results[0];

    const {
      teacher_id = oldData.teacher_id,
      name = oldData.name,
      designation = oldData.designation,
      subject = oldData.subject,
      email = oldData.email,
      phone = oldData.phone,
      gender = oldData.gender,
      address = oldData.address,
      joining_date = oldData.joining_date,
      photo = oldData.photo
    } = req.body;

    const updateSql = `UPDATE teachers SET
      teacher_id = ?, name = ?, designation = ?, subject = ?, email = ?, phone = ?,
      gender = ?, address = ?, joining_date = ?, photo = ?
      WHERE id = ?`;

    db.query(updateSql, [
      teacher_id, name, designation, subject, email, phone,
      gender, address, joining_date, photo, id
    ], (err, result) => {
      if (err) {
        console.error('Error updating teacher:', err);
        return res.status(500).send('Server error');
      }
      res.send({ message: 'Teacher updated successfully!' });
    });
  });
};
// // Delete Student
export const deleteTeacher =(req, res)=>{
  const sql = `DELETE FROM teachers WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error deleting teacher:', err);
      res.status(500).send('Server error');
    } else {
      res.send({ message: 'Teacher deleted successfully!' });
    }
  });
}
