import db from "../config/db.js";

//Post
export const attendanceData = (req, res) => {
  const { attendance_date, type, class: classNum, attendanceList } = req.body;

  if (!attendance_date || !classNum || !attendanceList.length || !type) {
    return res.status(400).json({ message: "All field required" });
  }
  console.log(attendance_date, type, classNum, attendanceList)
  let insertSql = "";
  let values = [];

  if (type === 'student') {
    insertSql = `INSERT INTO students_attendance (student_id, class, roll, attendance_date, status) VALUES ?`;

    values = attendanceList.map(item => [
      item.id,
      classNum,
      item.roll,
      attendance_date,
      item.status
    ]);

  } else if (type === 'employee') {
    insertSql = `INSERT INTO employees_attendance (employee_id, attendance_date, status) VALUES ?`;

    values = attendanceList.map(item => [
      item.id,
      attendance_date,
      item.status
    ]);

  } else {
    return res.status(400).json({ message: "Invalid type. Must be 'student' or 'employee'." });
  }

  db.query(insertSql, [values], (err, result) => {
    if (err) {
      console.error('Error inserting attendance:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json({
      message: `${type} attendance submitted successfully!`,
      inserted: result.affectedRows
    });
  });
  // const values = attendanceList.map(item => [
  //   item.student_id,
  //   classNum,
  //   item.roll,
  //   attendance_date,
  //   item.status
  // ]);

  // const insertSql = `INSERT INTO attendance (student_id, class, roll, attendance_date, status) VALUES ?`;

  // db.query(insertSql, [values], (err, result) => {
  //   if (err) {
  //     console.error('Error inserting attendance:', err);
  //     return res.status(500).json({ message: 'Server error' });
  //   }

  //   res.json({ message: 'Attendance submitted successfully!', inserted: result.affectedRows });
  // });
};
//Update Single attendance
export const updateAttendance = (req, res) => {
  const roll = req.params.id;
  const classNum = req.body.class;  // class client side থেকে body তে পাঠাবে
  const { status } = req.body;

  if (!status || !classNum) {
    return res.status(400).json({ message: "status আর class দিতে হবে।" });
  }

  const sql = `UPDATE attendance SET status = ? WHERE roll = ? AND class = ?`;

  db.query(sql, [status, roll, classNum], (err, result) => {
    if (err) {
      console.error('Error updating attendance:', err);
      return res.status(500).send('Server error');
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Attendance record পাওয়া যায়নি।" });
    }

    res.json({ message: "Attendance updated successfully!" });
  });
};
// export const getAllAttendance = (req, res) => {
//   const sql = `SELECT * FROM attendance`;

//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error('Error fetching attendance:', err);
//       return res.status(500).json({ message: 'Server error' });
//     }

//     if (result.length > 0) {
//       res.json(result);
//     } else {
//       return res.status(404).json({
//         message: "Attendance data পাওয়া যায়নি।"
//       });
//     }
//   });
// };
export const getAttendanceDataByDate = (req, res) => {
  const { type } = req.query;
  const { class:className, date } = req.body;

  if (!type || !date) {
    return res.status(400).json({ message: "type আর date দিতে হবে।" });
  }
  let sql = "";
  let values = [];
  if (type === 'student') {
    if (!className) {
      return res.status(400).json({ message: "Student attendance এর জন্য class দিতে হবে।" });
    }
    sql = `SELECT * FROM students_attendance WHERE class = ? AND attendance_date = ?`;
     
    db.query(sql, [className, date], (err, result) => {
      if (err) {
        console.error('Error fetching students attendance:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (result.length) {
        res.status(200).json({ data: result });
      } else {
        return res.status(404).json({ message: 'No data found' });
      }
    });
  }

  else if (type === 'employee') {
    sql = `SELECT * FROM employees_attendance WHERE attendance_date = ?`;
    values = [date];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error fetching employees attendance:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (result.length) {
        res.status(200).json({ data: result });
      } else {
        return res.status(404).json({ message: 'No data found' });
      }
    });
  }

  else {
    return res.status(400).json({ message: "Invalid type. Must be 'student' or 'employee'." });
  }


};

export const getAttendanceDataByMonth = (req, res) => {
  const { className, month, year } = req.query;

  const sql = `
        SELECT student_id,
          COUNT(CASE WHEN status='Present' THEN 1 END) AS present_days,
          COUNT(CASE WHEN status='Absent' THEN 1 END) AS absent_days
        FROM attendance
        WHERE class = ? AND MONTH(attendance_date) = ? AND YEAR(attendance_date) = ?
        GROUP BY student_id
      `;

  db.query(sql, [className, month, year], (err, result) => {
    if (err) {
      console.error('Error fetching monthly report:', err);
      return res.status(500).send('Server error');
    }
    if (result.length) {
      res.send(result);
    } else {
      return res.status(404).send('Not found any data');
    }
  });
};
export const getAttendanceDataByYear = (req, res) => {
  const { year } = req.query;

  const sql = `
    SELECT student_id,
      COUNT(CASE WHEN status='Present' THEN 1 END) AS total_present
    FROM attendance
    WHERE YEAR(attendance_date) = ?
    GROUP BY student_id
  `;
  db.query(sql, [year], (err, result) => {
    if (err) {
      console.error('Error fetching yearly report:', err);
      return res.status(500).send('Server error');
    }
    if (result.length) {
      res.send(result);
    } else {
      return res.status(404).send('Not found any data');
    }
  });


};