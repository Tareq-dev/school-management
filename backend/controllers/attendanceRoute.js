import db from "../config/db.js";

export const attendanceData = (req, res) => {
  const attendanceData = req.body; // array of {student_id, class, attendance_date, status}

  const values = attendanceData.map(item => [
    item.student_id, item.class, item.attendance_date, item.status
  ]);

  const sql = `INSERT INTO attendance (student_id, class, attendance_date, status) VALUES ?`;

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error inserting attendance:', err);
      return res.status(500).send('Server error');
    }
    res.send({ message: 'Attendance submitted successfully!' });
  });
};


export const getAttendanceDataByDate = (req, res) => {
  const { className, date } = req.query;

  const sql = `SELECT * FROM attendance WHERE class = ? AND attendance_date = ?`;

  db.query(sql, [className, date], (err, result) => {
    if (err) {
      console.error('Error fetching attendance:', err);
      return res.status(500).send('Server error');
    }
    res.send(result);
  });
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
    res.send(result);
  });
};