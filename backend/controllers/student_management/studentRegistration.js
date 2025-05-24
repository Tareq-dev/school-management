import db from "../../config/db.js";
import sharp from "sharp";
import path from "path";
import fs from "fs";


export const getAllStudentRegistrations = (req, res) => {
  const query = "SELECT * FROM students_registration";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching students_registration:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    }
    res.status(200).json({ success: true, data: results });
  });
};

export const getStudentRegistrationById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM students_registration WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching student:", err);
      return res.status(500).json({ success: false, message: "DB Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
};

// Add Student API
export const createStudentRegistration = async (req, res) => {
  const {
    student_id, name, class: studentClass, roll, gender, birth_date,
    phone, email, address, guardian_name, guardian_phone, session, shift, discounts
  } = req.body;

  if (
    !student_id || !name || !studentClass || !roll || !gender || !birth_date ||
    !phone || !email || !address || !guardian_name || !guardian_phone || !session || !shift ||
    discounts === undefined || discounts === null
  ) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const sql = `INSERT INTO students_registration 
  (student_id, name, class, roll, gender, birth_date, phone, email, address, guardian_name, guardian_phone, photo, session, shift, discounts)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


  //Photo check
  if (!req.file) {
    return res.status(400).json({ error: "Photo is required!" });
  }

  try {
    const fileName = `${name.split(" ")[0]}_c_${studentClass}_r_${roll}.jpg`;

    // Absolute dir path
    const dir = path.resolve("public/uploads/students_photo");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Absolute upload path
    const uploadPath = path.join(dir, fileName);

    // Compress and save
    await sharp(req.file.buffer)
      .resize({ width: 800 })
      .jpeg({ quality: 70 })
      .toFile(uploadPath);

    db.query(sql, [
      student_id, name, studentClass, roll, gender, birth_date,
      phone, email, address, guardian_name, guardian_phone, fileName, session, shift, discounts
    ], (err, result) => {
      if (err) {
        console.error('Error inserting student:', err);
        res.status(500).send('Server error');
      } else {
        res.send({ message: 'Student added successfully!', studentId: result.insertId });
      }
    });

  } catch (error) {
    console.error("Image processing error:", error);
    res.status(500).json({ error: "Image upload failed!" });
  }
}

// Update Student API
// export const updateStudentRegistration = (req, res) => {
//   const id = req.params.id;

//   // আগে পুরানো ডাটা আনবো
//   const selectSql = `SELECT * FROM students_registration WHERE id = ?`;
//   db.query(selectSql, [id], (err, results) => {
//     if (err) {
//       console.error('Error fetching student:', err);
//       return res.status(500).send('Server error');
//     }
//     if (results.length === 0) {
//       return res.status(404).send('Student not found');
//     }

//     const oldData = results[0];

//     const {
//       student_id = oldData.student_id,
//       name = oldData.name,
//       class: studentClass = oldData.class,
//       roll = oldData.roll,
//       gender = oldData.gender,
//       birth_date = oldData.birth_date,
//       phone = oldData.phone,
//       email = oldData.email,
//       address = oldData.address,
//       guardian_name = oldData.guardian_name,
//       guardian_phone = oldData.guardian_phone,
//       photo = oldData.photo,
//       session = oldData.session,
//       shift = oldData.shift,
//       discounts = oldData.discounts
//     } = req.body;

//     // // Update
//     const updateSql = `UPDATE students_registration SET
//       student_id = ?, name = ?, class = ?, roll = ?, gender = ?, birth_date = ?, 
//       phone = ?, email = ?, address = ?, guardian_name = ?, guardian_phone = ?, photo = ?, session =?, shift=? , discounts = ? 
//       WHERE id = ?`;

//     db.query(updateSql, [
//       student_id, name, studentClass, roll, gender, birth_date,
//       phone, email, address, guardian_name, guardian_phone, photo, id, session, shift, discounts
//     ], (err, result) => {
//       if (err) {
//         console.error('Error updating student:', err);
//         return res.status(500).send('Server error');
//       }
//       res.send({ message: 'Student updated successfully!' });
//     });

//   });
// }

export const updateStudentRegistration = async (req, res) => {
  const id = req.params.id;

  // পুরানো ডাটা আনবো
  const selectSql = `SELECT * FROM students_registration WHERE id = ?`;
  db.query(selectSql, [id], async (err, results) => {
    if (err) {
      console.error('Error fetching student:', err);
      return res.status(500).send('Server error');
    }
    if (results.length === 0) {
      return res.status(404).send('Student not found');
    }

    const oldData = results[0];

    // req.body থেকে update data নেবে, না থাকলে পুরানো ডাটা দিবে
    const {
      student_id = oldData.student_id,
      name = oldData.name,
      class: studentClass = oldData.class,
      roll = oldData.roll,
      gender = oldData.gender,
      birth_date = oldData.birth_date,
      phone = oldData.phone,
      email = oldData.email,
      address = oldData.address,
      guardian_name = oldData.guardian_name,
      guardian_phone = oldData.guardian_phone,
      session = oldData.session,
      shift = oldData.shift,
      discounts = oldData.discounts,
    } = req.body;
    try {
      let photo = oldData.photo;
      // যদি নতুন ছবি আসে, তাহলে আগেরটা ডিলিট করে নতুনটা save করবো
      if (req.file) {

        // পুরানো ছবি ফাইল ডিলিট
        const oldPhotoPath = path.resolve('public/uploads/students_photo', oldData.photo);
        
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        }
        // নতুন ছবির ফাইল নাম
        const fileName = `${name.split(" ")[0]}_c_${studentClass}_r_${roll}.jpg`;
        const dir = path.resolve('public/uploads/students_photo');
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        const uploadPath = path.join(dir, fileName);

        await sharp(req.file.buffer)
          .resize({ width: 800 })
          .jpeg({ quality: 70 })
          .toFile(uploadPath);

        photo = fileName;
      }

      // Update query
      const updateSql = `UPDATE students_registration SET
        student_id = ?, name = ?, class = ?, roll = ?, gender = ?, birth_date = ?, 
        phone = ?, email = ?, address = ?, guardian_name = ?, guardian_phone = ?, photo = ?, session = ?, shift = ?, discounts = ?
        WHERE id = ?`;

      db.query(updateSql, [
        student_id, name, studentClass, roll, gender, birth_date,
        phone, email, address, guardian_name, guardian_phone, photo, session, shift, discounts,
        id
      ], (err, result) => {
        if (err) {
          console.error('Error updating student:', err);
          return res.status(500).send('Server error');
        }
        res.send({ message: 'Student updated successfully!' });
      });

    } catch (error) {
      console.error('Image processing error:', error);
      res.status(500).json({ error: 'Image upload/update failed!' });
    }
  });
};
// Delete Student

export const deleteStudentRegistration = (req, res) => {
  const sql = `DELETE FROM students_registration WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Error deleting student:', err);
      res.status(500).send('Server error');
    } else {
      res.send({ message: 'Student deleted successfully!' });
    }
  });
}





