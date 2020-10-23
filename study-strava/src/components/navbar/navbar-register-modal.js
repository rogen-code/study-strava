import React, { useState, useRef } from 'react'
import axios from "axios"
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const validator = require('validator');

function RegisterModal({ visible, setVisible, classes, student, school, update, setUpdate }) {
  const [selectedClass, setSelectedClass] = useState(null)
  const ActivityName = useRef()
  const ActivityDescription = useRef()
  const SelectedDate = useRef()
  const [failedSubmit, setFailedSubmit] = useState(false)

  function resetModal() {
    ActivityDescription.current.value = ""
    ActivityName.current.value = ""
    SelectedDate.current.value = null
    setSelectedClass(null)
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (
      selectedClass &&
      ActivityName.current.value &&
      ActivityDescription.current.value &&
      SelectedDate.current.value
    ) {
      axios
        .post("http://localhost:4000/registerActivity", {
          activityName: validator.escape(ActivityName.current.value),
          activityDate: SelectedDate.current.value,
          activityDescription: validator.escape(ActivityDescription.current.value),
          studentName: student,
          schoolName: school,
          selectedClass,
        })
        .then(() => {
          resetModal()
          setVisible(!visible)
          setUpdate(!update)
        })
        .catch(() => {
          resetModal()
          setFailedSubmit(true)
        })
    } else {
      resetModal()
      setFailedSubmit(true)
    }
  }


  return (
    <>
      {visible && (
        <Modal show={visible} onHide={setVisible}>
          <Modal.Header closeButton>
            <Modal.Title>Add Activity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicActivityName">
                <Form.Label>Activity Name</Form.Label>
                <Form.Control ref={ActivityName} type="text" placeholder="Enter activity name" required/>
              </Form.Group>
              <Form.Group controlId="formBasicActivityDescription">
                <Form.Label>Activity Description</Form.Label>
                <Form.Control ref={ActivityDescription} type="text" placeholder="Enter activity description" required/>
              </Form.Group>
              <Form.Group controlId="formBasicActivityDate">
                <Form.Label>Activity Date</Form.Label>
                <Form.Control ref={SelectedDate} type="date" placeholder="Enter activity date" required/>
              </Form.Group>
              <fieldset>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Label>What Class Was This For?</Form.Label>
                  {classes.map((className) => (
                    <Form.Check type="radio" name="selectedClass" label={className.class_name} onClick={() =>setSelectedClass(className.class_id)} required/>
                  ))}
                </Form.Group>
              </fieldset>
              {failedSubmit && <Alert variant="danger">Something went wrong! Try again. </Alert>}

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setVisible(!visible)}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => handleClick(e)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}


export default RegisterModal