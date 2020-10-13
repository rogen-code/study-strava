import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from 'axios';

import Calendar from "./components/calendar"
import Navbar from "./components/navbar"
import ClassRegistration from "./components/sidebar/ClassRegistration"

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [school, setSchool] = useState("")
  const [classes, setClasses] = useState([])
  const [studentName, setName] = useState("")
  const [update, setUpdate] = useState(false)

  const didUpdate = () => {
    setUpdate(!update)
  }

  useEffect(() => {
    const studentID = window.location.pathname
    axios
      .get(`http://localhost:4000/getStudentData${studentID}`)
      .then((res) => {
        const schoolName = res.data[1][0].school_name
        setSchool(schoolName)
        const classesNames = res.data[0]
        setClasses(classesNames)
        const studentName = res.data[2][0].student_name
        setName(studentName)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [update])

  return (
    <div>
      <Navbar />
      <div>
        <Calendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <ClassRegistration
          school={school}
          classes={classes}
          studentName={studentName}
          setUpdate={didUpdate}
          update={update}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
