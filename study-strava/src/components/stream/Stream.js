import React from 'react'
import ActivityCardCol from "./ActivityCard"
import "../styles/streams.css"
import {Container, Row, Col} from 'react-bootstrap';
import useWindowSize from "../../helpers/screenSize"


function Stream({otherActivities, activeTab}) {
  let size = useWindowSize()
  let width = size.width

  if (activeTab !== "Stream") return null
  return (
    <Container className="tweet" fluid>
      <Row noGutters={true}>
        {width > 768 && (
          <Col>
            <div className="vertical-placeholder"></div>
          </Col>
        )}
        <Col md={7} lg={6}>
          <ActivityCardCol otherActivities={otherActivities} />
        </Col>
        {width > 1200 && (
          <Col>
            <div className="vertical-placeholder"></div>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default Stream
