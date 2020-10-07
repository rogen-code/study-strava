import React, { useState } from "react"
import ReactDOM from "react-dom"

import Calendar from "./components/calendar"
import Navbar from "./components/navbar"

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <Navbar />
    // <Calendar
    //   currentDate={currentDate}
    //   setCurrentDate={setCurrentDate}
    //   selectedDate={selectedDate}
    //   setSelectedDate={setSelectedDate}
    // />
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
