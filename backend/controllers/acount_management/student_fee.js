import db from "../../config/db.js";

// API: http://localhost:8000/v1/api/get-fee?class=7&feeCategory=1

export const getStudentsDataForFeesManagement = (req, res) => {
    const { class: class_id, feeCategory } = req.query;

    if (!feeCategory || !class_id) {
        return res.status(400).json({ success: false, message: "fee Category and Class are required" });
    }

    // 1. Get fee amount
    const feeQuery = `SELECT amount FROM fee_amount WHERE fee_category_id = ? AND class_id = ?`;

    db.query(feeQuery, [feeCategory, class_id], (feeErr, feeResult) => {
        if (feeErr) return res.status(500).json({ success: false, message: "DB error on fee fetch" });
        if (feeResult.length === 0) return res.status(404).json({ success: false, message: "Fee not set" });

        const feeAmount = feeResult[0].amount;

        // 2. Get fee category name from fee_categories table
        const categoryQuery = `SELECT name FROM fee_categories WHERE id = ?`;

        db.query(categoryQuery, [feeCategory], (catErr, catResult) => {
            if (catErr) return res.status(500).json({ success: false, message: "DB error on category fetch" });
            if (catResult.length === 0) return res.status(404).json({ success: false, message: "Fee Category not found" });

            const fee_name = catResult[0].name;

            // 3. Get students list
            const studentQuery = `SELECT id, student_id, name, roll, gender, email, guardian_name, discounts FROM students_registration WHERE class = ? ORDER BY roll`;

            db.query(studentQuery, [class_id], (stuErr, stuResults) => {
                if (stuErr) return res.status(500).json({ success: false, message: "DB error on student fetch" });

                // 4. Prepare data with discounted fee
                const finalData = stuResults.map(student => {
                    const discount = student.discounts || 0;
                    const payable = feeAmount - (feeAmount * discount) / 100;
console.log(student)
                    return {
                        ...student,
                        feeAmount,
                        discount,
                        payable,
                        fee_name  // এইবার ডেটাবেস থেকে আনা নাম এখানে
                    };
                });

                // 5. Send response
                res.status(200).json({ success: true, data: finalData });
            });
        });
    });
};