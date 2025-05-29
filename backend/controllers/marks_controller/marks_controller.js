import db from "../../config/db.js";

// 1️⃣ get student list by filter
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


// 2️⃣ mark entry API
export const insertMarks = (req, res) => {
    const { session, classId, shiftId, groupId, subjectId, examTypeId, marks } = req.body;

    if (!session || !classId || !shiftId || !subjectId || !examTypeId) {
        return res.status(400).json({ message: "সব ইনপুট দিতে হবে।" });
    }

    // class 9/10 check
    if ((classId == 9 || classId == 10) && !groupId) {
        return res.status(400).json({ message: "Class 9-10 এর জন্য group দিতে হবে।" });
    }

    const sql = `
    INSERT INTO marks (student_id, class, group, shift, session, subject, exam_type, mark, entry_date)
    VALUES ?
  `;

    const values = marks.map(item => [
        item.student_id,
        classId,
        classId == 9 || classId == 10 ? groupId : null,
        shiftId,
        session,
        subjectId,
        examTypeId,
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
