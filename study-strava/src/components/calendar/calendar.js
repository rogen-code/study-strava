import React, { useEffect } from "react"
import "../styles/calendar.css"

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
import getDate from "date-fns/getDate"
import getMonth from "date-fns/getMonth"
import getYear from "date-fns/getYear"
import isDate from "date-fns/isDate"
import parseISO from "date-fns/parse"
import toDate from "date-fns/toDate"

import TestButton from "./TestButton"
import ActivityButton from "./ActivityButton"
import SessionButton from "./SessionButton"


import { Container, Row, Col } from 'react-bootstrap';

const Calendar = ({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  tests,
  userActivities,
  activeTab,
  yourStudySessions,
}) => {

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const header = () => {
    const dateFormat = "MMMM yyyy"
    return (
      <div className="header row flex-middle">
        <div className="column col-start">
          <div
            className="icon"
            onClick={prevMonth}
            onKeyDown={prevMonth}
            role="button"
            tabIndex="0"
          >
            chevron_left
          </div>
        </div>
        <div className="column col-center">
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="column col-end">
          <div
            className="icon"
            onClick={nextMonth}
            onKeyDown={prevMonth}
            role="button"
            tabIndex="-1"
          >
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



  const testDates = {}
  const testFormat = "yyyy-MM-dd"
  if (tests[0]) {
    tests.forEach((test) => {
      const formatDay = test.test_date.split("T")[0]
      testDates[formatDay]
        ? testDates[formatDay].push(test)
        : (testDates[formatDay] = [test])
    })
  }

  const activityDates = {}
  if (userActivities[0]) {
    userActivities.forEach((activity) => {
      const formatDay = activity.activity_date.split("T")[0]
      activityDates[formatDay]
        ? activityDates[formatDay].push(activity)
        : activityDates[formatDay] = [activity]
    })
  }

  const studySessions = {}
  if (yourStudySessions !== undefined) {
    yourStudySessions.forEach((activity) => {
      const formatDay = activity.session_date.split("T")[0]
      studySessions[formatDay]
        ? studySessions[formatDay].push(activity)
        : studySessions[formatDay] = [activity]
    })
  }


  let responsiveSizing = false;

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
            {testDates[format(day, testFormat)] &&
              testDates[format(day, testFormat)].map((d) => (
                <TestButton day={d} key={d.test_id} />
              ))}
            {activityDates[format(day, testFormat)] &&
              activityDates[format(day, testFormat)].map((d) => (
                <ActivityButton day={d} key={d.activity_id} />
              ))}
            {studySessions[format(day, testFormat)] &&
              studySessions[format(day, testFormat)].map((d) => (
                <SessionButton day={d} key={d.session_id} />
              ))}
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
