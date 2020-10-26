import React, { useState } from 'react'
import { Modal, Button, ListGroup } from 'react-bootstrap'

function UserCardNumbers({ title, number, modalDisplay}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)



  return (
  <>
    <div className="user-card-numbers-text" onClick={handleShow}>
      <div>{title}</div>
      <div>{number}</div>
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ListGroup>
          {modalDisplay && modalDisplay.map((item) => (
            <ListGroup.Item key={item.student_id || item.activity_id}>{item.student_name || item.activity_name}</ListGroup.Item>
          ))}
        </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  )
}

export default UserCardNumbers
