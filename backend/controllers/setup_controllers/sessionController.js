import db from '../../config/db.js';

export const getAllSession = (req, res) => {
  const query = "SELECT * FROM sessions";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    res.status(200).json({ success: true, data: results });
  });
};

export const getSessionById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM sessions WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    if (results.length === 0) return res.status(404).json({ success: false, message: "Session not found" });
    res.status(200).json({ success: true, data: results[0] });
  });
};

export const addSession = (req, res) => {
  const { year } = req.body;

  // Check if session already exists
  const checkQuery = "SELECT * FROM sessions WHERE year = ?";
  db.query(checkQuery, [year], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });

    if (result.length > 0) {
      // Session already exists
      return res.status(409).json({ success: false, message: "Session already added!" });
    } else {
      // If not exists, then insert
      const insertQuery = "INSERT INTO sessions (year) VALUES (?)";
      db.query(insertQuery, [year], (err) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(201).json({ success: true, message: "Session added!" });
      });
    }
  });
};


export const updateSession = (req, res) => {
  const { id } = req.params;
  const { year } = req.body;
  const query = "UPDATE sessions SET year = ? WHERE id = ?";
  db.query(query, [year, id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    res.status(200).json({ success: true, message: "Session updated!" });
  });
};

export const deleteSession = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM sessions WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ success: false, message: "DB Error" });
    res.status(200).json({ success: true, message: "Session deleted!" });
  });
};
