const express = require("express")
const app = express()
const port = 4000
const cors = require("cors")
var xss = require("xss");


const {
  writeSchools,
  writeTeachers,
  writeClass,
  writeStudent,
  registerClass,
  getSchool,
  getClasses,
  getAllClassesAtSchool,
  getStudentName,
  deleteClass,
  getAllTestsForStudent,
  deleteStudySession,
  writeActivity,
  getActivities,
  getActivitesForSimilarClasses,
  getAllFollowers,
  getAllFollowing,
  registerStudySession,
  getFutureRegisteredStudySessions,
  getAllRegisteredStudySessions,
  getNotEnrolledFutureStudySessions,
  getAllFutureTestsForStudent,
} = require("../db/mysql")

app.use(express.json())

app.use("/", express.static("build"))
app.use("/:studentID", express.static("build"))
app.use(cors())

app.get("/sessions/hello", (req, res) => {
  console.log('hi')
  getRegisteredStudySessions(5)
    .then((classes) => {
      res.send(classes)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.post("/writeSchool", (req, res) => {
  writeSchools(req.body.schoolName)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.post("/writeTeacher", (req, res) => {
  writeTeachers(req.body.teacherName, req.body.schoolName)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.post("/writeClass", (req, res) => {
  writeClass(req.body.className, req.body.teacherName, req.body.schoolName)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.post("/writeStudent", (req, res) => {
  writeStudent(req.body.studentName, req.body.schoolName)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.post("/registerStudySession", (req, res) => {
  registerStudySession(req.body.sessionID, req.body.studentID.substring(1))
    .then((result) => {
      res.send(result)
    })
    .catch((e) => {
      res.status(404).send(e)
    })
})

app.post("/registerClass", (req, res) => {
  registerClass(
    req.body.studentName,
    req.body.schoolName,
    req.body.className,
    req.body.teacherName,
    req.body.periodNumber
  )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.post("/registerActivity", (req, res) => {
  writeActivity(
    req.body.activityName,
    req.body.activityDate,
    req.body.activityDescription,
    req.body.studentName,
    req.body.schoolName,
    req.body.selectedClass
  )
    .then((result) => {
      console.log(req.body)
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.put("/deleteClass", (req, res) => {
  console.log(req.body.studentName)
  deleteClass(
    req.body.studentName,
    req.body.schoolName,
    req.body.className,
    req.body.teacherName
  )
    .then((result) => {
      console.log(result)
      res.send(result)
    })

    .catch((err) => {
      res.send(err)
    })
})

app.delete("/deleteSession/:sessionID/:studentID", (req, res) => {
  console.log(req.params.sessionID, req.params.studentID)

  deleteStudySession(Number(req.params.sessionID), Number(req.params.studentID))
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.get("/getSchool/:studentID", (req, res) => {
  getSchool(req.params.studentID)
    .then((name) => {
      res.send(name)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get("/getClasses/:studentID", (req, res) => {
  getClasses(req.params.studentID)
    .then((name) => {
      res.send(name)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get("/getStudentData/:studentID", (req, res) => {
  Promise.all([
    getClasses(req.params.studentID),
    getSchool(req.params.studentID),
    getStudentName(req.params.studentID),
    getAllTestsForStudent(req.params.studentID),
    getActivities(req.params.studentID),
    getAllFollowers(req.params.studentID),
    getAllFollowing(req.params.studentID),
    getFutureRegisteredStudySessions(req.params.studentID),
    getAllRegisteredStudySessions(req.params.studentID),
    getAllFutureTestsForStudent(req.params.studentID)
  ])
    .then((data) => {
      res.send(data)
    })
    .catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
})

app.get("/getActivityData/:studentID/:offset", (req, res) => {
  getActivitesForSimilarClasses(req.params.studentID, Number(req.params.offset))
    .then((data) => {
      res.send(data)
    })
    .catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
})

app.get("/getAllClassesAtSchool/:schoolName", cors(), (req, res) => {
  getAllClassesAtSchool(req.params.schoolName)
    .then((classes) => {
      res.send(classes)
    })
    .catch((e) => {
      res.send(e)
    })
})

app.get("/getNotEnrolled/:query", (req, res) => {
  const splitQuery = req.params.query.split("&")
  const studentID = splitQuery[0]
  const offset = splitQuery[1]
  const query = xss(splitQuery[2])
  getNotEnrolledFutureStudySessions(Number(studentID), Number(offset) * 20, query)
    .then((data) => {
      res.send(data)
    })
    .catch((e) => {
      console.log(e)
      res.status(400).send(e)
    })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})