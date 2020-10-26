import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from 'axios';
import "./components/styles/main.css"
import 'bootstrap/dist/css/bootstrap.min.css';


import Calendar from "./components/calendar/calendar.js"
import NavigationBar from "./components/navbar/navbar"
import ClassRegistration from "./components/sidebar/ClassRegistration"
import Stream from "./components/stream/Stream"


function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [school, setSchool] = useState("")
  const [classes, setClasses] = useState([])
  const [studentName, setName] = useState("")
  const [update, setUpdate] = useState(false)
  const [tests, setTests] = useState([])
  const [userActivities, setUserActivites] = useState([])
  const [activeTab, setActiveTab] = useState("Stream")
  const [otherActivities, setOtherActivities] = useState([])
  const studentID = window.location.pathname

  const didUpdate = () => {
    setUpdate(!update)
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4000/getStudentData${studentID}`)
      .then((res) => {
        const schoolName = res.data[1][0].school_name
        setSchool(schoolName)
        const classesNames = res.data[0]
        setClasses(classesNames)
        const stuName = res.data[2][0].student_name
        setName(stuName)
        const classTests = res.data[3]
        setTests(classTests)
        const userActivities = res.data[4]
        setUserActivites(userActivities)
        const othersActivities = res.data[5]
        setOtherActivities(othersActivities)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [update, studentID])

  return (
    <div>
      <NavigationBar
        classes={classes}
        update={update}
        setUpdate={didUpdate}
        studentName={studentName}
        school={school}
        setActiveTab={setActiveTab}
      />
      {activeTab === "Calendar" && (
        <Calendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          tests={tests}
          userActivities={userActivities}
          activeTab={activeTab}
        />
      )}
     {/* <ClassRegistration
          school={school}
          classes={classes}
          studentName={studentName}
          setUpdate={didUpdate}
          update={update}
      /> */}
      {activeTab === "Stream" && (
        <Stream
          otherActivities={otherActivities}
          activeTab={activeTab}
          studentID={studentID}
          studentName={studentName}
        />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
