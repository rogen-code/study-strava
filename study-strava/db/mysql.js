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

module.exports.writeStudySessions = (sessionName, sessionURL, sessionDate, sessionDescription, className, teacherName, schoolName, periodNumber ) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO STUDY_SESSIONS (session_name, session_url, session_date, session_description, class_id, teacher_id) VALUES (?,?,?,?,
        (select class_id from classes where class_name=? and teacher_id=(select teacher_id from teachers where teacher_name=?) and school_id=(select school_id from schools where school_name=?) and period_number=?),(select teacher_id from teachers where teacher_name=? and school_id=(select school_id from schools where school_name=?)));`,
      [sessionName, sessionURL, sessionDate, sessionDescription, className, teacherName, schoolName, periodNumber, teacherName, schoolName],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.registerStudySessionSeed = (sessionName, sessionDescription, sessionURL, studentName, schoolName) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Session_Registrations (session_id, student_id) VALUES ((select session_id from study_sessions where session_name=? and session_description=? and session_url=?), (select student_id from students where student_name=? and school_id=(select school_id from schools where school_name=?)));`,
      [sessionName, sessionDescription, sessionURL, studentName, schoolName],
      (error, results) => {
        console.log(error)
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.registerStudySession = (sessionID, studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Session_Registrations (session_id, student_id) VALUES (?, ?);`,
      [sessionID, studentID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.deleteStudySession = (sessionID, studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM Session_Registrations where session_id=? and student_id=?;`,
      [sessionID, studentID],
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

module.exports.writeFollower = (followerID, followingID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Followers_Following (student_follower, student_following) VALUES (?, ?);`,
      [followerID, followingID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.writeFollowerSeed = (followerName, followerSchool, followingName, followingSchool) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO Followers_Following (student_follower, student_following) VALUES ((select student_id from students where student_name=? and school_id=(select school_id from schools where school_name=?)), (select student_id from students where student_name=? and school_id=(select school_id from schools where school_name=?)));`,
      [followerName, followerSchool, followingName, followingSchool],
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

module.exports.writeActivity = (
  activityName,
  activityDate,
  activityDescription,
  studentName,
  schoolName,
  classID
) => {
  console.log(activityName, activityDate)
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO activities (activity_name, activity_date, activity_description, student_id, school_id, class_id) VALUES (?, ?, ?, (select student_id from students where student_name=?), (select school_id from schools where school_name=?), ?)`,
      [activityName, activityDate, activityDescription, studentName, schoolName, classID],
      (error, results) => {
        if (error) console.log(error)
        if (error) reject(error)
        console.log(results)
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
      `select * from activities where student_id=?`,
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

module.exports.getAllFutureTestsForStudent = (studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select distinct test_id, test_name, test_date, test_description, classes.class_name, teachers.teacher_name from Tests join Classes on tests.class_id=classes.class_id join Classes_Students on tests.class_id=Classes_Students.class_id join Teachers on Classes.teacher_id=Teachers.teacher_id where Classes_Students.class_id in (select class_id from Classes_Students where student_id=?) and test_date > Now() ORDER BY DATE(test_date) ASC;`,
      [studentID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getAllFollowers = (studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from students where student_id in (select student_following from Followers_Following where student_follower=?)`,
      [studentID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getAllFollowing = (studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select * from students where student_id in (select student_follower from Followers_Following where student_following=?)`,
      [studentID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getActivitesForSimilarClasses = (studentID, offset) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select activity_date, activity_description, activity_id, activity_name, likes, Students.student_name from Activities JOIN Students on Activities.student_id=Students.student_id where Students.student_id in (select student_following from Followers_Following where student_follower=?) and activity_date < Now() ORDER BY DATE(activity_date) DESC LIMIT 20 OFFSET ? ;`,
      [studentID, offset],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getFutureRegisteredStudySessions = (studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select Study_Sessions.session_id, session_name, session_url, session_date, session_description, likes, teachers.teacher_name from Study_Sessions join Teachers on Study_sessions.teacher_id where Study_Sessions.teacher_id=Teachers.teacher_id and session_id in (select session_id from Session_Registrations where Session_Registrations.student_id = ?) and session_date > Now() ORDER BY DATE(session_date) ASC;`,
      [studentID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getNotEnrolledFutureStudySessions = (studentID, offset = 0, query) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select DISTINCT Study_Sessions.session_id, session_name, session_url, session_date, session_description, likes, teachers.teacher_name from Study_Sessions JOIN Teachers on Study_sessions.teacher_id=Teachers.teacher_id join Classes on Teachers.teacher_id=Classes.teacher_id and session_date > Now() and session_id NOT IN (select session_id from Session_Registrations where Session_Registrations.student_id = ?)  and Classes.class_name in (select class_name from Classes where class_id in (select class_id from Classes_Students where student_id= ?)) WHERE Study_Sessions.session_name like '%${query}%' or teachers.teacher_name like '%${query}%' ORDER BY DATE(session_date) ASC LIMIT 20 OFFSET ?;`,
      [studentID, studentID, offset],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}

module.exports.getAllRegisteredStudySessions = (studentID) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `select Study_Sessions.session_id, session_name, session_url, session_date, session_description, likes, teachers.teacher_name from Study_Sessions join Teachers on Study_sessions.teacher_id join Session_Registrations on Study_Sessions.session_id=Session_Registrations.session_id where Study_Sessions.teacher_id=Teachers.teacher_id and student_id=?;`,
      [studentID],
      (error, results) => {
        if (error) reject(error)
        resolve(results)
      }
    )
  })
}
