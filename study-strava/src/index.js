import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import axios from 'axios';
import "./components/styles/main.css"
import 'bootstrap/dist/css/bootstrap.min.css';


import Calendar from "./components/calendar/calendar.js"
import NavigationBar from "./components/navbar/navbar"
import Stream from "./components/stream/Stream"
import StudySession from "./components/study_sessions/study_sessions"


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
  const [activityCount, setActivityCount] = useState(0)
  const [yourFollowers, setYourFollowers] = useState([])
  const [youFollow, setYouFollow] = useState([])
  const [yourUpcomingStudySessions, setYourUpcomingStudySessions] = useState([])
  const [yourStudySessions, setYourStudySessions] = useState([])
  const [futureTests, setFutureTests] = useState([])

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
        setActivityCount(userActivities.length)
        const followers = res.data[5]
        setYourFollowers(followers)
        const following = res.data[6]
        setYouFollow(following)
        const upcomingStudySession = res.data[7]
        setYourUpcomingStudySessions(upcomingStudySession)
        const historicalStudySession = res.data[8]
        setYourStudySessions(historicalStudySession)
        const futureTestsData = res.data[9]
        setFutureTests(futureTestsData)
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
          yourStudySessions={yourStudySessions}
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
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          studentID={studentID}
          studentName={studentName}
          activityCount={activityCount}
          yourFollowers={yourFollowers}
          youFollow={youFollow}
          userActivities={userActivities}
          upcomingStudySession={yourUpcomingStudySessions}
          school={school}
          classes={classes}
          update={update}
          setUpdate={setUpdate}
        />
      )}
      {activeTab === "Study Sessions" && (
        <StudySession
          studentID={studentID}
          setActiveTab={setActiveTab}
          futureTests={futureTests}
          yourUpcomingStudySessions={yourUpcomingStudySessions}
          update={update}
          setUpdate={didUpdate}
          studentName={studentName}
          activityCount={activityCount}
          youFollow={youFollow}
          userActivities={userActivities}
          yourFollowers={yourFollowers}
          school={school}
          classes={classes}
        />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
