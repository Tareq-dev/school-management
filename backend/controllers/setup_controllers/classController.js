import db from '../../config/db.js';

export const getAllClasses = (req, res) => {
  const query = "SELECT * FROM classes";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    res.status(200).json({ success: true, data: results });
  });
};

export const getClassById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM classes WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    if (results.length === 0) return res.status(404).json({ success: false, message: "Class not found" });
    res.status(200).json({ success: true, data: results[0] });
  });
};

export const addClass = (req, res) => {
  const { name } = req.body;
  const query = "INSERT INTO classes (name) VALUES (?)";
  db.query(query, [name], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    res.status(201).json({ success: true, message: "Class added!" });
  });
};

export const updateClass = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = "UPDATE classes SET name = ? WHERE id = ?";
  db.query(query, [name, id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    res.status(200).json({ success: true, message: "Class updated!" });
  });
};

export const deleteClass = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM classes WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    res.status(200).json({ success: true, message: "Class deleted!" });
  });
};
