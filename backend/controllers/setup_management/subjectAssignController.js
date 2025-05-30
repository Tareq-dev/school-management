import db from '../../config/db.js';

// Get all subject assignments
export const getAllAssignments = (req, res) => {
    const query = `
    SELECT 
  sa.id, 
  c.name AS class_name, 
  s.name AS subject_name, 
  sa.full_mark, 
  sa.pass_mark
FROM subject_assignments sa
JOIN classes c ON sa.class_id = c.id
JOIN subjects s ON sa.subject_id = s.id;
  `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, data: results });
    });
};

// Assign subject to class
export const assignSubject = (req, res) => {
  const { class_id, subject_id, full_mark, pass_mark } = req.body;

  // Basic Validation
  if (!class_id || !subject_id || full_mark == null || pass_mark == null) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // Check if already exists
  const checkQuery = "SELECT * FROM subject_assignments WHERE class_id = ? AND subject_id = ?";
  db.query(checkQuery, [class_id, subject_id], (err, results) => {
    if (err) {
      console.error("DB Check Error:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: "This subject is already assigned to this class!" });
    }

    // Insert if not exists
    const insertQuery = "INSERT INTO subject_assignments (class_id, subject_id, full_mark, pass_mark) VALUES (?, ?, ?, ?)";
    db.query(insertQuery, [class_id, subject_id, full_mark, pass_mark], (err) => {
      if (err) {
        console.error("DB Insert Error:", err);
        return res.status(500).json({ success: false, message: "DB Error" });
      }
      res.status(201).json({ success: true, message: "Subject assigned successfully!" });
    });
  });
};

// Update subject assignment
export const updateAssignment = (req, res) => {
    const { id } = req.params;
    const { full_mark, pass_mark } = req.body;
    const query = "UPDATE subject_assignments SET full_mark = ?, pass_mark = ? WHERE id = ?";
    db.query(query, [full_mark, pass_mark, id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, message: "Assignment updated!" });
    });
};
