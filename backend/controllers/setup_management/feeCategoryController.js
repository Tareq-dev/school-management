import db from '../../config/db.js';

export const getAllFee_Categoty = (req, res) => {
    const query = "SELECT * FROM fee_categories";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, data: results });
    });
};

export const getFee_CategotyById = (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM fee_categories WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        if (results.length === 0) return res.status(404).json({ success: false, message: "Fee_Categoty not found" });
        res.status(200).json({ success: true, data: results[0] });
    });
};

export const addFee_Categoty = (req, res) => {
    const { name } = req.body;

    // Check if Fee_Categoty already exists
    const checkQuery = "SELECT * FROM fee_categories WHERE name = ?";
    db.query(checkQuery, [name], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });

        if (result.length > 0) {
            // Fee_Categoty already exists
            return res.status(409).json({ success: false, message: "Fee_Categoty already added!" });
        } else {
            // If not exists, then insert
            const insertQuery = "INSERT INTO fee_categories (name) VALUES (?)";
            db.query(insertQuery, [name], (err) => {
                if (err) return res.status(500).json({ success: false, message: "DB Error" });
                res.status(201).json({ success: true, message: "Fee_Categoty added!" });
            });
        }
    });
};

export const updateFee_Categoty = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = "UPDATE fee_categories SET name = ? WHERE id = ?";
    db.query(query, [name, id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, message: "Fee_Categoty updated!" });
    });
};

export const deleteFee_Categoty = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM fee_categories WHERE id = ?";
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "DB Error" });
        res.status(200).json({ success: true, message: "Fee_Categoty deleted!" });
    });
};
