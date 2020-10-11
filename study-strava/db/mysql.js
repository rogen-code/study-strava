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
    pool.query(
      `INSERT INTO Classes_Students (class_id, student_id) VALUES (
        (select class_id from classes where school_id=
          (select school_id from schools WHERE school_name=?)
            AND teacher_id=
          (select teacher_id from Teachers WHERE teacher_name=?)
        ),
        (
        (select student_id from Students WHERE student_name=?
          AND
          school_id=(select school_id from schools WHERE school_name=?)
        ))
      );`,
      [schoolName, teacherName, studentName, schoolName],
      (error, results) => {
        if (error) console.log(error)
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getSchool = (studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select school_name from schools where school_id=(select school_id from students where student_id=?)`,
      [studentID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getClasses = (studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from Classes where class_id IN (select class_id from Classes_Students where student_id=?)`,
      [studentID],
      (error, results) => {
        if (error) console.log(error)
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}






