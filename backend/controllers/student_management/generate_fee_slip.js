import db from "../../config/db.js";
import PDFDocument from 'pdfkit';
import fs from 'fs';

// API: http://localhost:8000/v1/api/get-fee?class=7&feeCategory=1

export const getStudentsDataForFees = (req, res) => {
    const { session, class: class_id, feeCategory } = req.query;
    if (!session || !feeCategory || !class_id) {
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
           const studentQuery = `SELECT id, student_id, session, name, roll, gender, email, guardian_name, discounts FROM students_registration WHERE class = ? AND session = ? ORDER BY roll`;

db.query(studentQuery, [class_id, session], (stuErr, stuResults) => {
    if (stuErr) return res.status(500).json({ success: false, message: "DB error on student fetch" });

    const finalData = stuResults.map(student => {
        const discount = student.discounts || 0;
        const payable = feeAmount - (feeAmount * discount) / 100;

        return {
            ...student,
            feeAmount,
            discount,
            payable,
            fee_name
        };
    });

    res.status(200).json({ success: true, data: finalData });
});
        });
    });
};
//API : http://localhost:8000/v1/api/generate-slip/84?class=7&feeCategory=3
export const generateSlip = (req, res) => {
    const { id: studentId } = req.params;
    const { feeCategory, class: classId } = req.query;
    if (!feeCategory) {
        return res.status(400).json({ success: false, message: "Fee Category is required" });
    }
    const categoryQuery = `SELECT name FROM fee_categories WHERE id = ?`;
    db.query(categoryQuery, [feeCategory], (catErr, catResult) => {
        if (catErr) return res.status(500).json({ success: false, message: "DB error on category fetch" });
        if (catResult.length === 0) return res.status(404).json({ success: false, message: "Fee Category not found" });

        const fee_name = catResult[0].name;
        const query = `
    SELECT s.name, s.student_id, s.roll, s.discounts,s.guardian_name, s.class, s.shift, s.session, f.amount AS fee_amount
    FROM students_registration s
    JOIN fee_amount f ON s.class = f.class_id
    WHERE s.id = ? AND f.fee_category_id = ?
    LIMIT 1
  `;
        console.log(studentId)
        db.query(query, [studentId, feeCategory], (err, result) => {
            if (err) return res.status(500).json({ success: false, message: "DB Error" });
            if (result.length === 0) return res.status(404).json({ success: false, message: "Data not found" });

            const student = result[0];
            const payable = student.fee_amount - (student.fee_amount * (student.discounts || 0)) / 100;

            // Generate PDF Slip
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const filePath = `./public/slips/registration-slip-${student.student_id}.pdf`;
            doc.pipe(fs.createWriteStream(filePath));
            // const schoolName = "Bright Future Academy";
            // const schoolAddress = "123, Education Road, Dhaka, Bangladesh";
            function drawCopy(startY, copyTitle) {
                // Header
                doc
                    .fontSize(14)
                    .font('Helvetica-Bold')
                    .fillColor('#003366')
                    .text('Bright Future Academy', 40, startY, { align: 'center', width: 510 })
                    .fontSize(11)
                    .fillColor('#000')
                    .text('123, Education Road, Dhaka, Bangladesh', 40, startY + 18, { align: 'center', width: 510 });

                doc
                    .moveTo(40, startY + 45)
                    .lineTo(550, startY + 45)
                    .lineWidth(1)
                    .strokeColor('#004080')
                    .stroke();

                doc
                    .fontSize(11)
                    .fillColor('#004080')
                    .font('Helvetica-Bold')
                    .text(`${copyTitle}`, 40, startY + 50, { align: 'center' });

                let tableY = startY + 80;
                const startX = 50;
                const colWidths = [150, 290];  // দুই কলাম: Field & Details
                const tableWidth = colWidths.reduce((a, b) => a + b, 0);
                const rowHeight = 18;

                // Table Header Background
                doc
                    .rect(startX, tableY, tableWidth, rowHeight)
                    .fillColor('#cce0ff')
                    .fill()
                    .strokeColor('#004080')
                    .lineWidth(0.8)
                    .stroke();

                // Draw vertical column lines (header)
                let colX = startX;
                colWidths.forEach((width) => {
                    doc
                        .moveTo(colX, tableY)
                        .lineTo(colX, tableY + rowHeight)
                        .stroke();
                    colX += width;
                });
                doc
                    .moveTo(startX + tableWidth, tableY)
                    .lineTo(startX + tableWidth, tableY + rowHeight)
                    .stroke();

                // Header Text
                const headers = ['Field', 'Details'];
                colX = startX;
                headers.forEach((header, index) => {
                    doc
                        .font('Helvetica-Bold')
                        .fontSize(9)
                        .fillColor('#003366')
                        .text(header, colX + 6, tableY + 5);
                    colX += colWidths[index];
                });

                tableY += rowHeight;

                // Data Rows (remark বাদ)
                const dataRows = [
                    ['Name', student.name],
                    ['Guardian Name', student.guardian_name],
                    ['Student ID', student.student_id],
                    ['Roll', student.roll],
                    ['Class', student.class],
                    ['Session', student.session],
                    ['Shift', student.shift],
                    [`${fee_name}`, `${student.fee_amount} Tk`],
                    ['Discount', `${student.discounts}%`],
                    ['Payable Amount', `${payable.toFixed(2)} Tk`],
                ];

                dataRows.forEach(([field, details], i) => {
                    // Alternate row color
                    if (i % 2 === 0) {
                        doc
                            .rect(startX, tableY, tableWidth, rowHeight)
                            .fillColor('#f9f9f9')
                            .fill();
                    }

                    // Row border (full row rectangle)
                    doc
                        .strokeColor('#cccccc')
                        .lineWidth(0.5)
                        .rect(startX, tableY, tableWidth, rowHeight)
                        .stroke();

                    // Vertical column lines inside row
                    colX = startX;
                    colWidths.forEach((width) => {
                        doc
                            .moveTo(colX, tableY)
                            .lineTo(colX, tableY + rowHeight)
                            .stroke();
                        colX += width;
                    });
                    doc
                        .moveTo(startX + tableWidth, tableY)
                        .lineTo(startX + tableWidth, tableY + rowHeight)
                        .stroke();

                    // Texts
                    colX = startX;
                    [field, details].forEach((text, j) => {
                        doc
                            .font('Helvetica')
                            .fontSize(9)
                            .fillColor('#000')
                            .text(text, colX + 6, tableY + 5, { width: colWidths[j] - 12 });
                        colX += colWidths[j];
                    });

                    tableY += rowHeight;
                });

                // Footer
                doc
                    .fontSize(8)
                    .fillColor('#555555')
                    .text('Note: This slip is computer generated and does not require a signature.', startX, tableY + 8, { width: tableWidth, align: 'center' })
                    .text(`Generated on: ${new Date().toLocaleDateString()}`, startX, tableY + 20, { width: tableWidth, align: 'center' });
            }

            // Draw Both Copies
            drawCopy(40, 'Student Copy');

            doc
                .moveTo(40, 400)
                .lineTo(550, 400)
                .lineWidth(0.5)
                .dash(3, { space: 3 })
                .strokeColor('#004080')
                .stroke();

            drawCopy(420, 'School Copy');

            doc.end();

            res.status(200).json({ success: true, message: "Slip generated", file: filePath });
        });
    })

};


