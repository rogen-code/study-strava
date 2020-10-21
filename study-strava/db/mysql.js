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

module.exports.writeClass = (className, teacherName, schoolName, periodNum) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Classes (class_name, teacher_id, school_id, period_number) VALUES (?, (select teacher_id from Teachers where teacher_name=?), (select school_id from Schools where school_name=?), ?);`,
      [className, teacherName, schoolName, periodNum],
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

module.exports.writeTest = (testName, testDate, testDescription, className, teacherName, schoolName, periodNumber) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Tests (test_name, test_date, test_description, school_id, class_id) VALUES (?, ?, ?, (select school_id from schools where school_name=?),
      (select class_id from classes where class_name=? and teacher_id in (select teacher_id from teachers where teacher_name=? and school_id=(select school_id from schools where school_name=?)) and period_number=?));`,
      [testName, testDate, testDescription, schoolName, className, teacherName, schoolName, periodNumber],
      (error, results) => {
        if (error) console.log(error)
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.writeActivity = (activityName, activityDate, activityDescription, studentName, schoolName, classID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Activities (activity_name, activity_date, activity_description, student_id, school_id, class_id) VALUES (?, ?, ?, (select student_id from students where student_name=?), (select school_id from schools where school_name=?), ?)`,
      [activityName, activityDate, activityDescription, studentName, schoolName, classID],
      (error, results) => {
        if (error) console.log(error)
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.writeActivitySeed = (activityName, activityDate, activityDescription, studentName, schoolName, className, periodNumber, teacherName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Activities (activity_name, activity_date, activity_description, student_id, school_id, class_id) VALUES (?, ?, ?, (select student_id from students where student_name=?), (select school_id from schools where school_name=?), (select class_id from classes where class_name=? and teacher_id in (select teacher_id from teachers where teacher_name=? and school_id=(select school_id from schools where school_name=?)) and period_number=?))`,
      [activityName, activityDate, activityDescription,studentName, schoolName, className, teacherName, schoolName, periodNumber],
      (error, results) => {
        if (error) console.log(error)
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
  teacherName,
  periodNumber
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Classes_Students (class_id, student_id) VALUES (
        (select class_id from classes where school_id=
          (select school_id from schools WHERE school_name=?)
            AND teacher_id in
          (select teacher_id from Teachers WHERE teacher_name=?)
            AND class_name=?
            AND period_number=?
        ),
        (
        (select student_id from Students WHERE student_name=?
          AND
          school_id=(select school_id from schools WHERE school_name=?)
        ))
      );`,
      [schoolName, teacherName, className, periodNumber, studentName, schoolName],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.deleteClass = (
  studentName,
  schoolName,
  className,
  teacherName
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM Classes_Students where class_id=
        (select class_id from classes where school_id=
          (select school_id from schools WHERE school_name=?)
            AND teacher_id=
          (select teacher_id from Teachers WHERE teacher_name=?)
            AND class_name=?
        ) AND
        (
        (select student_id from Students WHERE student_name=?
          AND
          school_id=(select school_id from schools WHERE school_name=?)
        ))
      ;`,
      [schoolName, teacherName, className, studentName, schoolName],
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
      `select class_name, class_id, period_number, teachers.teacher_name from Classes join Teachers on Classes.teacher_id=teachers.teacher_id where class_id IN (select class_id from Classes_Students where student_id=?)`,
      [studentID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getActivities = (studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from Activites where student_id=?`,
      [studentID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getStudentName = (studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select student_name from Students where student_id=?;`,
      [studentID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getAllClassesAtSchool = (schoolName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select classes.class_name, classes.period_number, teachers.teacher_name from Classes INNER JOIN teachers on classes.teacher_id = teachers.teacher_id where classes.school_id=(select school_id from schools where school_name=?);`,
      [schoolName],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getAllTestsForStudent = (studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select distinct test_id, test_name, test_date, test_description, classes.class_name, teachers.teacher_name from Tests join Classes on tests.class_id=classes.class_id join Classes_Students on tests.class_id=Classes_Students.class_id join Teachers on Classes.teacher_id=Teachers.teacher_id where Classes_Students.class_id in (select class_id from Classes_Students where student_id=?) ;`,
      [studentID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

