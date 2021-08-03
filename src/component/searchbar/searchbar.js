import React from "react";
import { Row, Col } from "react-bootstrap";
import Input from "../UI/input/input";
import Button from "../UI/input/button";
import classes from "./searchbar.module.css";
import Search from "@material-ui/icons/SearchOutlined";
const searchBar = (props) => {
  return (
    // <form classNameName={classNamees.SearchBar} onSubmit={(e)=>{e.preventDefault();}}>
    //   <Row>
    //     <Col md={9} xs={7}>
    //       <Input value={props.value} onChange={props.onChange} />
    //     </Col>
    //     <Col md={3} xs={5}>
    //       <Button disabled={props.value.length < 1} clicked={props.clicked} type={"submit"} classNameName={classNamees.Button}>
    //         Search
    //       </Button>
    //     </Col>
    //   </Row>
    // </form>
    <div
      className={[classes.SearchBar, "row justify-content-center"].join(" ")}
    >
      <div className="col-12 col-md-10 col-lg-8">
        <form
          className="card card-sm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="card-body row no-gutters align-items-center">
            <div className="col-auto">
              <Search />
            </div>
            <div className="col">
              <Input
                value={props.value}
                onChange={props.onChange}
                type="search"
                placeholder="Search Keys using pattern"
                className="form-control form-control-lg form-control-borderless"
              />
               {props.value === "*" && (
              <span className={[classes.Feedback, "col-auto"].join(" ")}>
                * is not allowed for performance reasons !
              </span>
            )}
            </div>
            <div className="col-auto">
              <Button
                disabled={props.value.length < 1 || props.value === "*"}
                clicked={props.clicked}
                variant="btn btn-lg btn-success"
                type="submit"
                className={[classes.Buttons, "btn btn-lg btn-success"].join(
                  " "
                )}
              >
                Search
              </Button>
            </div>
          </div>
          {/* <div className="row">
            {props.value === "*" && (
              <span className={[classes.Feedback, "col-auto"].join(" ")}>
                * is not allowed for performance reasons !
              </span>
            )}
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default searchBar;
