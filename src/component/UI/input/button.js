import React from "react";
import { Button } from "react-bootstrap";

const button = props => {
  const defaultVariant = "outline-primary btn-md";
  return (
    <Button
      variant={props.variant || defaultVariant}
      disabled={props.disabled}
      onClick={props.clicked}
      type={props.type||'button'}
      className={props.className}
    >
      {props.children}
    </Button>
  );
};
export default button;
