import db from '../../config/db.js';

// Create Fee Amount
export const createFeeAmount = (req, res) => {
  const { class_id, fee_category_id, amount } = req.body;
  
   // validation: check required fields
  if (!class_id || !fee_category_id || !amount) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // validation: check if this combination already exists
  const checkSql = `
    SELECT * FROM fee_amount 
    WHERE class_id = ? AND fee_category_id = ?
  `;

  db.query(checkSql, [class_id, fee_category_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database Error", error: err });

    if (result.length > 0) {
      return res.status(409).json({ message: "Fee Amount already exists for this Class and Category." });
    }

    // insert if not exists
    const insertSql = `
      INSERT INTO fee_amount (class_id, fee_category_id, amount) 
      VALUES (?, ?, ?)
    `;

    db.query(insertSql, [class_id, fee_category_id, amount], (err, result) => {
      if (err) return res.status(500).json({ message: "Database Error", error: err });

      res.status(201).json({ message: "Fee Amount Created!", id: result.insertId });
    });
  });
};

// Get All Fee Amounts
export const getFeeAmounts = (req, res) => {
  const sql = `
    SELECT fee_amount.*, 
           classes.name AS class_name, 
           fee_categories.name AS fee_category_name
    FROM fee_amount
    JOIN classes ON fee_amount.class_id = classes.id
    JOIN fee_categories ON fee_amount.fee_category_id = fee_categories.id
    ORDER BY fee_amount.id DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database Error", error: err });
    res.status(200).json(results);
  });
};

// Get Single Fee Amount by ID
export const getFeeAmountById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM fee_amount WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database Error", error: err });
    if (result.length === 0) return res.status(404).json({ message: "Fee Amount not found" });
    res.status(200).json(result[0]);
  });
};

// Update Fee Amount
export const updateFeeAmount = (req, res) => {
  const { id } = req.params;
  const { class_id, fee_category_id, amount } = req.body;
  const sql = "UPDATE fee_amount SET class_id = ?, fee_category_id = ?, amount = ? WHERE id = ?";
  
  db.query(sql, [class_id, fee_category_id, amount, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database Error", error: err });
    res.status(200).json({ message: "Fee Amount Updated!" });
  });
};

// Delete Fee Amount
export const deleteFeeAmount = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM fee_amount WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database Error", error: err });
    res.status(200).json({ message: "Fee Amount Deleted!" });
  });
};
