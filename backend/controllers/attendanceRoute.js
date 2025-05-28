import db from "../config/db.js";

//Post

//Date formate will be 2025-05-28
export const attendanceData = (req, res) => {
  const { attendance_date, type, class: classNum, attendanceList } = req.body;

  if (!attendance_date || !classNum || !attendanceList.length || !type) {
    return res.status(400).json({ message: "All field required" });
  }
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
      item.employee_id,
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
//http://localhost:8000/v1/api/attendance?type=employee
//query:- student/employee
//body:- {"attendance_date":"2025-05-20","employee_id":"TCH009","status":"absent"}

export const updateAttendance = (req, res) => {
  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ message: "type=student অথবা type=employee দিতে হবে।" });
  }

  let sql = "";
  let values = [];

  if (type === "student") {
    const { status, roll, class: classNum, attendance_date } = req.body;

    if (!status || !classNum || !roll || !attendance_date) {
      return res.status(400).json({ message: "status, roll, class আর attendance_date দিতে হবে।" });
    }

    sql = `UPDATE students_attendance SET status = ? WHERE roll = ? AND class = ? AND attendance_date = ?`;
    values = [status, roll, classNum, attendance_date];

  } else if (type === "employee") {
    const { status, employee_id, attendance_date } = req.body;

    if (!status || !employee_id || !attendance_date) {
      return res.status(400).json({ message: "status, employee_id আর attendance_date দিতে হবে।" });
    }

    sql = `UPDATE employees_attendance SET status = ? WHERE employee_id = ? AND attendance_date = ?`;
    values = [status, employee_id, attendance_date];

  } else {
    return res.status(400).json({ message: "Invalid type. type=student অথবা type=employee হতে হবে।" });
  }

  // query run
  db.query(sql, values, (err, result) => {
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

//API : http://localhost:8000/v1/api/attendance?type=student
//Query:type=student, body : {"date": "2025-05-23","class": "10"}
export const getAttendanceDataByDate = (req, res) => {
  const { type } = req.query;
  const { class: className, date } = req.body;

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

//http://localhost:8000/v1/api/attendance-monthly?type=student&className=5&month=5&year=2025
export const getAttendanceDataByMonth = (req, res) => {
  const { type } = req.query;
  const { className, month, year } = req.query;

  if (!type) {
    return res.status(400).json({ message: "type=student অথবা type=employee দিতে হবে।" });
  }

  let sql = "";
  let values = [];

  if (type === "student") {
    if (!className || !month || !year) {
      return res.status(400).json({ message: "className, month আর year দিতে হবে।" });
    }

    sql = `
      SELECT a.student_id, s.name AS student_name, a.roll, a.class, a.attendance_date, a.status
      FROM students_attendance a
      INNER JOIN students_registration s ON a.student_id = s.student_id
      WHERE a.class = ? AND MONTH(a.attendance_date) = ? AND YEAR(a.attendance_date) = ?
      ORDER BY a.attendance_date ASC, a.roll ASC
    `;
    values = [className, month, year];

  } else if (type === "employee") {
    if (!month || !year) {
      return res.status(400).json({ message: "month আর year দিতে হবে।" });
    }

    sql = `
      SELECT a.employee_id, e.name AS employee_name, a.attendance_date, a.status
      FROM employees_attendance a
      INNER JOIN employees e ON a.employee_id = e.employee_id
      WHERE MONTH(a.attendance_date) = ? AND YEAR(a.attendance_date) = ?
      ORDER BY a.attendance_date ASC, a.employee_id ASC
    `;
    values = [month, year];

  } else {
    return res.status(400).json({ message: "Invalid type. type=student অথবা type=employee হতে হবে।" });
  }

  // query run
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error fetching attendance list:', err);
      return res.status(500).send('Server error');
    }

    if (result.length) {
      res.json(result);
    } else {
      return res.status(404).json({ message: "কোনো ডেটা পাওয়া যায়নি।" });
    }
  });
};
//API http://localhost:8000/v1/api/attendance/monthly-list?type=student&person_id=STU001&month=5&year=2025
export const getSinglePersonMonthlyListAndSummary = (req, res) => {
  const { type, person_id, month, year } = req.query;

  if (!type || !person_id || !month || !year) {
    return res.status(400).json({ message: "type, person_id, month, year দিতে হবে।" });
  }

  let listSql = "";
  let summarySql = "";
  let values = [person_id, month, year];

  if (type === "student") {
    listSql = `
      SELECT 
        a.attendance_date, 
        a.status, 
        s.name AS person_name
      FROM students_attendance a
      INNER JOIN students_registration s ON a.student_id = s.student_id
      WHERE a.student_id = ? AND MONTH(a.attendance_date) = ? AND YEAR(a.attendance_date) = ?
      ORDER BY a.attendance_date ASC
    `;

    summarySql = `
      SELECT 
        COUNT(CASE WHEN status='present' THEN 1 END) AS present_days,
        COUNT(CASE WHEN status='absent' THEN 1 END) AS absent_days
      FROM students_attendance
      WHERE student_id = ? AND MONTH(attendance_date) = ? AND YEAR(attendance_date) = ?
    `;

  } else if (type === "employee") {
    listSql = `
      SELECT 
        a.attendance_date, 
        a.status, 
        e.name AS person_name
      FROM employees_attendance a
      INNER JOIN employees e ON a.employee_id = e.employee_id
      WHERE a.employee_id = ? AND MONTH(a.attendance_date) = ? AND YEAR(a.attendance_date) = ?
      ORDER BY a.attendance_date ASC
    `;

    summarySql = `
      SELECT 
        COUNT(CASE WHEN status='present' THEN 1 END) AS present_days,
        COUNT(CASE WHEN status='absent' THEN 1 END) AS absent_days
      FROM employees_attendance
      WHERE employee_id = ? AND MONTH(attendance_date) = ? AND YEAR(attendance_date) = ?
    `;

  } else {
    return res.status(400).json({ message: "Invalid type. type=student অথবা type=employee হতে হবে।" });
  }

  // আগে list data আনবো
  db.query(listSql, values, (err, listResult) => {
    if (err) {
      console.error('Error fetching attendance list:', err);
      return res.status(500).send('Server error');
    }

    // তারপর summary আনবো
    db.query(summarySql, values, (err, summaryResult) => {
      if (err) {
        console.error('Error fetching summary:', err);
        return res.status(500).send('Server error');
      }

      if (!listResult.length) {
        return res.status(404).json({ message: "কোনো ডেটা পাওয়া যায়নি।" });
      }

      const finalData = {
        person_name: listResult[0].person_name,
        attendance_list: listResult.map(item => ({
          date: item.attendance_date,
          status: item.status
        })),
        summary: summaryResult[0]
      };

      res.json(finalData);
    });
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