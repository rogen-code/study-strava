import React from 'react'
import axios from "axios"

function DeleteButton({ sessionID, studentID, getNewData, update, setUpdate }) {

  function handleClick() {
    axios
      .delete(`http://localhost:4000/deleteSession/${sessionID}/${studentID.substring(1)}`)
      .then((r) => {
        setUpdate(!update)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <button onClick={() => handleClick()}>X</button>
  )
}

export default DeleteButton