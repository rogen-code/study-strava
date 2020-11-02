import React from 'react'
import axios from "axios"
import { Button } from 'react-bootstrap';


function DeleteButton({ sessionID, studentID, getNewData, update, setUpdate }) {

  function handleClick() {
    axios
      .delete(
        `http://localhost:4000/deleteSession/${sessionID}/${studentID.substring(1)}`)
      .then((r) => {
        setUpdate(!update)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <Button
      size="sm"
      variant="outline-danger"
      onClick={() => handleClick()}>
      X
    </Button>
  )
}

export default DeleteButton