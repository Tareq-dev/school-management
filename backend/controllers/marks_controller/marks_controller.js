import db from "../../config/db.js";

// 1️⃣ get student list by filter
//http://localhost:8000/v1/api/marks/list?session=2024&class=4&shift=morning&group=science
export const getStudentListForMarkEntry = (req, res) => {
    const { session, class: classId, shift, group } = req.query;

    if (!session || !classId || !shift) {
        return res.status(400).json({ message: "session, class, shift দিতে হবে।" });
    }

    let sql = `SELECT student_id, roll, name FROM students_registration WHERE class = ? AND shift = ? AND session = ?`;
    let values = [classId, shift, session];

    if (classId == 9 || classId == 10) {
        if (!group) {
            return res.status(400).json({ message: "Class 9-10 এর জন্য group দিতে হবে।" });
        }
        sql += ` AND \`group\` = ?`;
        values.push(group);
    }

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).send('Server error');
        }
        res.json(result);
    });
};

// 2️⃣ mark entry API http://localhost:8000/v1/api/marks/entry
export const insertMarks = (req, res) => {
    const { session, class: classId, shift, group, subject, exam_type, marks } = req.body;

    if (!session || !classId || !shift || !subject || !exam_type) {
        return res.status(400).json({ message: "সব ইনপুট দিতে হবে।" });
    }
    // class 9/10 check
    if ((classId == 9 || classId == 10) && !group) {
        return res.status(400).json({ message: "Class 9-10 এর জন্য group দিতে হবে।" });
    }

    const sql = `
    INSERT INTO marks (student_id, class, \`group\` , shift, session, subject, exam_type, mark, entry_date)
    VALUES ?
  `;
    const values = marks.map(item => [
        item.student_id,
        classId,
        classId == 9 || classId == 10 ? group : null,
        shift,
        session,
        subject,
        exam_type,
        item.mark,
        new Date()
    ]);

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting marks:', err);
            return res.status(500).send('Server error');
        }
        res.json({ message: "Marks entry successful!" });
    });
};

// Insert formate
// {
//   "session": "2024",
//   "class": 1,
//   "shift": "morning",
//   "group": "",
//   "subject": "Bangla",
//   "exam_type": "1st Term",
//   "marks": [
//     { "student_id": "STU001", "mark": 75 },
//     { "student_id": "STU002", "mark": 62 },
//     { "student_id": "STU003", "mark": 80 },
//     { "student_id": "STU004", "mark": 59 },
//     { "student_id": "STU005", "mark": 96 }
//   ]
// }


export const updateMark = (req, res) => {
    const { student_id, class: classId, group, shift, session, subject, exam_type, mark } = req.body;

    // Individual field validations
    if (!student_id) return res.status(400).json({ message: "Student ID দিতে হবে।" });
    if (!classId) return res.status(400).json({ message: "Class দিতে হবে।" });
    if (!shift) return res.status(400).json({ message: "Shift দিতে হবে।" });
    if (!session) return res.status(400).json({ message: "Session দিতে হবে।" });
    if (!subject) return res.status(400).json({ message: "Subject দিতে হবে।" });
    if (!exam_type) return res.status(400).json({ message: "Exam Type দিতে হবে।" });
    if (mark === undefined || mark === null) return res.status(400).json({ message: "Mark দিতে হবে।" });
    if ((classId == 9 || classId == 10) && !group) {
        return res.status(400).json({ message: "Class 9-10 এর জন্য group দিতে হবে।" });
    }

    // Check if data exists first
    const checkSql = `
        SELECT * FROM marks
        WHERE student_id = ? 
        AND class = ?
        AND shift = ?
        AND session = ?
        AND subject = ?
        AND exam_type = ?
        ${(classId == 9 || classId == 10) ? 'AND \`group\` = ?' : ''}
    `;

    const checkValues = (classId == 9 || classId == 10)
        ? [student_id, classId, shift, session, subject, exam_type, group]
        : [student_id, classId, shift, session, subject, exam_type];

    db.query(checkSql, checkValues, (err, rows) => {
        if (err) {
            console.error('Error checking mark:', err);
            return res.status(500).send('Server error');
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: "এই তথ্যের কোনো মার্ক পাওয়া যায়নি। আগে মার্ক এন্ট্রি করুন।" });
        }

        // Data exists, proceed to update
        const updateSql = `
            UPDATE marks 
            SET mark = ?
            WHERE student_id = ? 
            AND class = ? 
            AND shift = ? 
            AND session = ? 
            AND subject = ? 
            AND exam_type = ?
            ${(classId == 9 || classId == 10) ? 'AND \`group\` = ?' : ''}
        `;

        const updateValues = (classId == 9 || classId == 10)
            ? [mark, student_id, classId, shift, session, subject, exam_type, group]
            : [mark, student_id, classId, shift, session, subject, exam_type];

        db.query(updateSql, updateValues, (err, result) => {
            if (err) {
                console.error('Error updating mark:', err);
                return res.status(500).send('Server error');
            }
            res.json({ message: "Mark updated successfully!" });
        });
    });
};

