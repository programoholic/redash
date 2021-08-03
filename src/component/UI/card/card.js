import React from "react";
import { Card } from "react-bootstrap";

const card = (props) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {props.children}
      </Card.Body>
    </Card>
  );
};

export default card;
