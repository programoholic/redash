import React from "react";
import { Navbar,Nav } from "react-bootstrap";
import Button from "../UI/input/button";
import * as classes from "./navbar.module.css";
import Settings from "@material-ui/icons/Settings";

const navbar = props => {
  return (
    <Navbar  className={[classes.Navbar,'ml-auto'].join(" ")}>
      <Navbar.Brand href="#home" className={classes.NavTitle}>{props.title}</Navbar.Brand>
      <Nav className="ml-auto">
      <Button variant="default" clicked={props.handleShow} className={[classes.Button,'float-right'].join(' ')}>
        <Settings />
        configure
      </Button>
      </Nav>
    </Navbar>
  );
};
export default navbar;
