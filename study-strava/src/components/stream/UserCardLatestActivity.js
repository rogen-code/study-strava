import React, { useState, seEffect } from 'react';
import format from "date-fns/format"
import {Container, Row, Col, Modal, Button, ListGroup} from 'react-bootstrap';


function LatestActivity({ userActivities }) {
  const [show, setShow] = useState(false)
  if (!userActivities.length) return null

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const activityName = userActivities[userActivities.length - 1].activity_name

  const dt = userActivities[userActivities.length - 1].activity_date
  const year = dt.substring(0, 4)
  const month = Number(dt.substring(5, 7)) - 1
  const day = dt.substring(8, 10)
  const dateString = "MMMM i yyyy "

  const formatDay = format(new Date(year, month, day), dateString)

  return (
    <>
      <Container onClick={handleShow} className="user-card-latest">
        <Row>Latest Activity</Row>
        <Row className="activity-card-latest">
          <strong>{activityName}</strong> {` • ${formatDay}`}
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  )
}

export default LatestActivity