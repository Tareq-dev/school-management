import db from '../../config/db.js';

export const getAllSubject = (req, res) => {
    const query = "SELECT * FROM subjects";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, data: results });
    });
};

export const getSubjectById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM subjects WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        if (results.length === 0) return res.status(404).json({ success: false, message: "Subject not found" });
        res.status(200).json({ success: true, data: results[0] });
    });
};

export const addSubject = (req, res) => {
    const { name } = req.body;

    // Check if Subject already exists
    const checkQuery = "SELECT * FROM subjects WHERE name = ?";
    db.query(checkQuery, [name], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });

        if (result.length > 0) {
            // Subject already exists
            return res.status(409).json({ success: false, message: "Subject already added!" });
        } else {
            // If not exists, then insert
            const insertQuery = "INSERT INTO subjects (name) VALUES (?)";
            db.query(insertQuery, [name], (err) => {
                if (err) return res.status(500).json({ success: false, message: "DB Error" });
                res.status(201).json({ success: true, message: "Subject added!" });
            });
        }
    });
};

export const updateSubject = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = "UPDATE subjects SET name = ? WHERE id = ?";
    db.query(query, [name, id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, message: "Subject updated!" });
    });
};

export const deleteSubject = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM subjects WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, message: "Subject deleted!" });
    });
};
