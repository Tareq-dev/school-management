import db from '../../config/db.js';

export const getAllExam = (req, res) => {
    const query = "SELECT * FROM exam_types";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, data: results });
    });
};

export const getExamById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM exam_types WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        if (results.length === 0) return res.status(404).json({ success: false, message: "Exam not found" });
        res.status(200).json({ success: true, data: results[0] });
    });
};

export const addExam = (req, res) => {
    const { name } = req.body;

    // Check if Exam already exists
    const checkQuery = "SELECT * FROM exam_types WHERE name = ?";
    db.query(checkQuery, [name], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });

        if (result.length > 0) {
            // Exam already exists
            return res.status(409).json({ success: false, message: "Exam already added!" });
        } else {
            // If not exists, then insert
            const insertQuery = "INSERT INTO exam_types (name) VALUES (?)";
            db.query(insertQuery, [name], (err) => {
                if (err) return res.status(500).json({ success: false, message: "DB Error" });
                res.status(201).json({ success: true, message: "Exam added!" });
            });
        }
    });
};

export const updateExam = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = "UPDATE exam_types SET name = ? WHERE id = ?";
    db.query(query, [name, id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, message: "Exam updated!" });
    });
};

export const deleteExam = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM exam_types WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, message: "Exam deleted!" });
    });
};
