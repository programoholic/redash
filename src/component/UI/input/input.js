import React from "react";
import { Form } from "react-bootstrap";
import classes from "./input.module.css";
const input = (props) => {
  const defaultType = "text";
  const defaultPlaceHolder = "Enter value";
  let input = null;

  input =
    props.type === "file" ? (
      <Form.File
        type="file"
        label={props.label}
        onChange={props.onChange}
        custom

        {...props}
      />
    ) : (
      <Form.Control
        className={classes.Input}
        type={props.type || defaultType}
        placeholder={props.placeholder || defaultPlaceHolder}
        value={props.value}
        id={props.id}
        onChange={(e)=>{props.onChange(e,props.id)}}
        {...props}
      />
    );
  return  input ;
};
export default input;
