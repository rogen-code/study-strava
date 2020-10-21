const express = require("express")
const app = express()
const port = 4000
const cors = require("cors")

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
  writeActivity,
  getActivities,
} = require("../db/mysql")

app.use(express.json())

app.use("/", express.static("build"))
app.use("/:studentID", express.static("build"))
app.use(cors())

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
    req.body.classId
  )
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
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
  ])
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})