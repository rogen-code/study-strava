import React from "react"
import { Card, Button } from 'react-bootstrap';
import formatDay from "../../helpers/formatDay"
import format from "date-fns/format"
import axios from 'axios'

function SessionCards({
  activityData,
  studentID,
  update,
  setUpdate,
  getNewData,
  searchRef
}) {
  const dateString = "MMMM co p"

  function handleRegister(sessionID, studentID) {
    axios
      .post("http://localhost:4000/registerStudySession", {
        sessionID,
        studentID,
      })
      .then(() => {
        setUpdate(!update)
      })
      .then(() => {
        searchRef.current.value = ""
        getNewData()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
      {activityData.map((session) => (
        <Card key={session.session_id} className="session_cards">
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Card.Title>{session.session_name}</Card.Title>
            <Card.Text>
              {session.session_description} <br />
              {format(formatDay(session.session_date), dateString)}
            </Card.Text>
            <Button onClick={() => handleRegister(session.session_id, studentID)}>Register!</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default SessionCards