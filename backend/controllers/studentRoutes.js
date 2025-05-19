import db from "../config/db.js";

export const getAllStudents = (req, res) => {
  const query = "SELECT * FROM students";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    }
    res.status(200).json({ success: true, data: results });
  });
};

export const getStudentById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM students WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching student:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
};
// Add Student API
export const createStudent = (req, res) => {
  const {
    student_id, name, class: studentClass, roll, gender, birth_date,
    phone, email, address, guardian_name, guardian_phone, photo
  } = req.body;


  if (
    !student_id || !name || !studentClass || !roll || !gender || !birth_date ||
    !phone || !email || !address || !guardian_name || !guardian_phone || !photo
  ) {
    return res.status(400).json({ error: 'All fields are required!' });
  }


  const sql = `INSERT INTO students 
  (student_id, name, class, roll, gender, birth_date, phone, email, address, guardian_name, guardian_phone, photo)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [
    student_id, name, studentClass, roll, gender, birth_date,
    phone, email, address, guardian_name, guardian_phone, photo
  ], (err, result) => {
    if (err) {
      console.error('Error inserting student:', err);
      res.status(500).send('Server error');
    } else {
      res.send({ message: 'Student added successfully!', studentId: result.insertId });
    }
  });
}
// Update Student API
export const updateStudents = (req, res) => {
  const id = req.params.id;

  // আগে পুরানো ডাটা আনবো
  const selectSql = `SELECT * FROM students WHERE id = ?`;
  db.query(selectSql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching student:', err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('Student not found');
    }

    const oldData = results[0];

    const {
      student_id = oldData.student_id,
      name = oldData.name,
      class: studentClass = oldData.class,
      roll = oldData.roll,
      gender = oldData.gender,
      birth_date = oldData.birth_date,
      phone = oldData.phone,
      email = oldData.email,
      address = oldData.address,
      guardian_name = oldData.guardian_name,
      guardian_phone = oldData.guardian_phone,
      photo = oldData.photo
    } = req.body;

    // // Update
    const updateSql = `UPDATE students SET
      student_id = ?, name = ?, class = ?, roll = ?, gender = ?, birth_date = ?, 
      phone = ?, email = ?, address = ?, guardian_name = ?, guardian_phone = ?, photo = ?
      WHERE id = ?`;

    db.query(updateSql, [
      student_id, name, studentClass, roll, gender, birth_date,
      phone, email, address, guardian_name, guardian_phone, photo, id
    ], (err, result) => {
      if (err) {
        console.error('Error updating student:', err);
        return res.status(500).send('Server error');
      }
      res.send({ message: 'Student updated successfully!' });
    });

  });
}
// Delete Student

export const deleteStudent =(req, res)=>{
  const sql = `DELETE FROM students WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error deleting student:', err);
      res.status(500).send('Server error');
    } else {
      res.send({ message: 'Student deleted successfully!' });
    }
  });
}





