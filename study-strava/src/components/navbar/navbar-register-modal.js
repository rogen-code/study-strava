import React, { useState, useRef } from 'react'
import axios from "axios"
import { Modal, Button, Form } from 'react-bootstrap';

const validator = require('validator');




function RegisterModal({ visible, setVisible, classes, student, school, update, setUpdate }) {
  const [selectedClass, setSelectedClass] = useState(null)
  const ActivityName = useRef()
  const ActivityDescription = useRef()
  const SelectedDate = useRef()

  const handleClick = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:4000/registerActivity", {
        activityName: validator.escape(ActivityName.current.value),
        activityDate: SelectedDate.current.value,
        activityDescription: validator.escape(ActivityDescription.current.value),
        studentName: student,
        schoolName: school,
        selectedClass,
      })
      .then((res) => {
        ActivityDescription.current.value = null
        ActivityName.current.value = null
        SelectedDate.current.value = null
        setSelectedClass(null)
        setVisible(!visible)
        setUpdate(!update)
      })
      .catch((err) => {
        console.log(err)
      })
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
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setVisible(!visible)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setVisible(!visible)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default RegisterModal



{/* <form className="register_modal" onSubmit={handleClick}>
          <label htmlFor="fname" >Activity Name</label><br/>
          <input type="text" id="fname" name="fname" ref={ActivityName}/><br/>
          <label htmlFor="fdescription" >Activity Description</label><br/>
          <textarea
            type="text"
            id="fdescription"
            name="fdescription"
            maxLength="255"
            ref={ActivityDescription}
            required="required"
          />
          <br/>
          <label htmlFor="fClass">Which Class?</label><br/>
          <select onChange={(e) => setSelectedClass(e.target.value)} >
            {classes.map((cla) => (
              <option key={cla.class_id} value={cla.class_id}>
                {cla.class_name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="fDate">Activity Date</label><br/>
          <input type="date" id="fDate" name="fDate" ref={SelectedDate} />
          <br />
          <button type="submit"> Submit Here</button>
        </form>
      ) */}