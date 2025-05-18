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
