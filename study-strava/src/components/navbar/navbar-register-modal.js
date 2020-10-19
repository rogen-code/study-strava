import React, { useState, useRef } from 'react'
import axios from "axios"
const validator = require('validator');

function RegisterModal({ visible, setVisible, classes, studentName, school }) {
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
        studentName,
        schoolName: school,
        selectedClass,
      })
      .then((res) => {
        ActivityDescription.current.value = null
        ActivityName.current.value = null
        SelectedDate.current.value = null
        setSelectedClass(null)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      {visible && (
        <form className="register_modal" onSubmit={handleClick}>
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
      )}
    </>
  )
}

export default RegisterModal