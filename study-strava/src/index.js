import React, { useState } from "react"
import ReactDOM from "react-dom"

import Calendar from "./components/calendar"
import Navbar from "./components/navbar"
import ClassRegistration from "./components/classregistration"

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

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
        <ClassRegistration />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
