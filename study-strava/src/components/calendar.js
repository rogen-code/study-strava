import React, { useState } from "react";
import "./styles/calendar.css";

import addMonths from "date-fns/addMonths"
import subMonths from "date-fns/subMonths"
import format from "date-fns/format"
import startOfWeek from "date-fns/startOfWeek"
import startOfMonth from "date-fns/startOfMonth"
import endOfMonth from "date-fns/endOfMonth"
import endOfWeek from "date-fns/endOfWeek"
import addDays from "date-fns/addDays"
import isSameMonth from "date-fns/isSameMonth"
import isSameDay from "date-fns/isSameDay"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const header = () => {
    const dateFormat = "MMMM yyyy"
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="column col-center">
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="column col-end">
          <div className="icon" onClick={nextMonth}>
            chevron_right
          </div>
        </div>
      </div>
    )
  }

  const days = () => {
    const days = []
    const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']
    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div className="column col-center" key={i}>
          {/* {format(addDays(startDate, i), dateFormat)} */}
          {daysOfWeek[i]}
        </div>
      )
    }
    return <div className="days row">{days}</div>;
  }

  const cells = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)
    const dateFormat = "d"
    const rows = []
    let days = []
    let day = startDate
    let formattedDate = ""
    while (day <= endDate) {
      for (let i = 0; i < 7; i += 1) {
        formattedDate = format(day, dateFormat)
        const cloneDay = day
        days.push(
          <div
            className={`column cell ${!isSameMonth(day, monthStart)
              ? "disabled" : isSameDay(day, selectedDate)
              ? "selected" : "" }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        )
        day = addDays(day, 1)
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = []
    }
    return <div className="body">{rows}</div>
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const onDateClick = (day) => {
    setSelectedDate(day)
  }

  return (
    <div className="calendar">
      <div>{header()}</div>
      <div>{days()}</div>
      <div>{cells()}</div>
    </div>
  )
}

export default Calendar
