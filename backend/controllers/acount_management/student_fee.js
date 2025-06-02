import db from "../../config/db.js";


// From getStudentsDataForFees controller
// API: http://localhost:8000/v1/api/get-fee?class=7&feeCategory=1

 export const submitFees = (req, res) => {
  const { fees } = req.body;
 
  if (!fees || !Array.isArray(fees) || fees.length === 0) {
    return res.status(400).json({ success: false, message: "No fee data provided" });
  }

  // Prepare values for bulk insert
  const values = fees.map(fee => [
    fee.student_id,
    fee.session,
    fee.class_id,      
    fee.fee_name,
    fee.feeAmount,
    fee.discount,
    fee.payable,
    new Date()
  ]);

  // Insert query
  const insertQuery = `
    INSERT INTO student_fee_payments 
    (student_id, session, class_id, fee_category, fee_amount, discount, payable, payment_date)
    VALUES ?
  `;

  db.query(insertQuery, [values], (err, result) => {
    if (err) {
      console.error("Insert Error:", err);
      return res.status(500).json({ success: false, message: "DB error while inserting fees", error: err });
    }

    res.status(200).json({ success: true, message: "Fees submitted successfully", insertedCount: result.affectedRows });
  });
};
