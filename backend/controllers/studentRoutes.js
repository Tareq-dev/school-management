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




// Add Student API

