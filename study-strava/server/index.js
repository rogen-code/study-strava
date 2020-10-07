const express = require('express')
const app = express()
const port = 4000


const { writeSchools, writeTeachers } = require("../db/mysql")

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/writeSchool", (req, res) => {
  writeSchools(req.body.name)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.post("/writeTeachers", (req, res) => {
  writeTeachers(req.body.teacherName, req.body.schoolName)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


//Add Schools

//Add Classes To Schools