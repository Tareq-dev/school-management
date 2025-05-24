import db from "../../config/db.js";


export const getStudentsForRoll = (req, res) => {
  const { class_id, session_id } = req.query;
 
  if (!class_id || !session_id) {
    return res.status(400).json({ success: false, message: "Class and Session are required" });
  }

  const query = `
    SELECT id, name, guardian_name, gender, roll, class
    FROM students_registration
    WHERE class = ? AND session = ?
    ORDER BY name
  `;

  db.query(query, [class_id, session_id], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ success: false, message: "DB error" });
    }
    res.status(200).json({ success: true, data: results });
  });
};

export const assignRolls = (req, res) => {
  const rolls = req.body;

  if (!Array.isArray(rolls) || rolls.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  const query = "UPDATE students_registration SET roll = ? WHERE id = ?";

  rolls.forEach((item) => {
    db.query(query, [item.roll, item.id], (err) => {
      if (err) console.error("Roll assign error for id", item.id, err);
    });
  });

  res.status(200).json({ success: true, message: "Roll numbers assigned successfully!" });
};
