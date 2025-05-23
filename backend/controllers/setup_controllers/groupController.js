import db from '../../config/db.js';

export const getAllGroup = (req, res) => {
  const query = "SELECT * FROM groups";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    res.status(200).json({ success: true, data: results });
  });
};

export const getGroupById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM groups WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    if (results.length === 0) return res.status(404).json({ success: false, message: "Group not found" });
    res.status(200).json({ success: true, data: results[0] });
  });
};

export const addGroup = (req, res) => {
  const { name } = req.body;

  // Check if Group already exists
  const checkQuery = "SELECT * FROM Groups WHERE name = ?";
  db.query(checkQuery, [name], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });

    if (result.length > 0) {
      // Group already exists
      return res.status(409).json({ success: false, message: "Group already added!" });
    } else {
      // If not exists, then insert
      const insertQuery = "INSERT INTO groups (name) VALUES (?)";
      db.query(insertQuery, [name], (err) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(201).json({ success: true, message: "Group added!" });
      });
    }
  });
};

export const updateGroup = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const query = "UPDATE Groups SET name = ? WHERE id = ?";
  db.query(query, [name, id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    res.status(200).json({ success: true, message: "Group updated!" });
  });
};

export const deleteGroup = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM groups WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    res.status(200).json({ success: true, message: "Group deleted!" });
  });
};
