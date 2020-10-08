const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'study_strava',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports.writeSchools = (schoolName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Schools (school_name) VALUES (?);`,
      [schoolName],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.writeTeachers = (teacherName, schoolName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Teachers (teacher_name, school_id) VALUES (?, (select school_id from Schools where school_name=?));`,
      [teacherName, schoolName],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.writeClass = (className, teacherName, schoolName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Classes (class_name, teacher_id, school_id) VALUES (?, (select teacher_id from Teachers where teacher_name=?), (select school_id from Schools where school_name=?));`,
      [className, teacherName, schoolName],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.writeStudent = (studentName, schoolName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Students (student_name, school_id) VALUES (?, (select school_id from Schools where school_name=?));`,
      [studentName, schoolName],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.registerClass = (
  studentName,
  schoolName,
  className,
  teacherName
) => {
  return new Promise((resolve, reject) => {

    // select student_id from Students where student_name="Amy Rogen";

    // select class_id from Classes where school_id=(select school_id from Schools where school_name="Hawken") AND teacher_id=(select teacher_id from Teachers where teacher_name="rogen") AND class_id=(select class_id from Classes where class_name="AP World History")

    pool.query(
      `INSERT INTO Classes_Students (class_id, student_id) VALUES ((select class_id from Classes where school_id=(select school_id from Schools where school_name=?) AND teacher_id=(select teacher_id from Teachers where teacher_name=?) AND class_id=(select class_id from Classes where class_name=?)), (select student_id from Students where student_name=?));`,
      [schoolName, teacherName, className, studentName],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

