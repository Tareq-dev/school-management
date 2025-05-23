import db from '../../config/db.js';

export const getAllShift = (req, res) => {
    const query = "SELECT * FROM shifts";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, data: results });
    });
};

export const getShiftById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM shifts WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        if (results.length === 0) return res.status(404).json({ success: false, message: "Shift not found" });
        res.status(200).json({ success: true, data: results[0] });
    });
};

export const addShift = (req, res) => {
    const { name } = req.body;

    // Check if Shift already exists
    const checkQuery = "SELECT * FROM shifts WHERE name = ?";
    db.query(checkQuery, [name], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });

        if (result.length > 0) {
            // Shift already exists
            return res.status(409).json({ success: false, message: "Shift already added!" });
        } else {
            // If not exists, then insert
            const insertQuery = "INSERT INTO shifts (name) VALUES (?)";
            db.query(insertQuery, [name], (err) => {
                if (err) return res.status(500).json({ success: false, message: "DB Error" });
                res.status(201).json({ success: true, message: "Shift added!" });
            });
        }
    });
};

export const updateShift = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = "UPDATE shifts SET name = ? WHERE id = ?";
    db.query(query, [name, id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, message: "Shift updated!" });
    });
};

export const deleteShift = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM shifts WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, message: "Shift deleted!" });
    });
};
