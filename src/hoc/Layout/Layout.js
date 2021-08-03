import React, { Component } from "react";
import Navbar from "../../component/navbar/Navbar";
import { Container } from "react-bootstrap";
import Model from "../../component/UI/model/model";
import Configuration from "../../component/configuration/configuration";
import classes from "./Layout.module.css";
export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      label: "Choose Private Key...",
      appId: "",
      baseUrl: "",
      privateKey:""
    };
  }
  handleClose = () => {
    this.setState((state) => (state.showModel = !state.showModel));
  };

  fileUploaded = async (e) => {
    console.log(e);
    const file = e.target.files.item(0);
    console.log(file);
    const text = await file.text();
    console.log(text);
    this.setState({ label: file.name,privateKey:text});
  };
  changeHandler = (e, id) => {
    console.log(e,id,'BBBBBBBBBBBBBBBBBBbbbbb')
    let newState = { ...this.state };
    newState[id] = e.target.value;
    console.log(newState)
    this.setState(newState);
  };
  render() {
    return (
      <>
        <Navbar title="Redash" handleShow={this.handleClose} />
        <Container fluid className={classes.Container}>
          {this.props.children}
        </Container>
        <Model
          submitClicked={this.handleClose}
          cancelClicked={this.handleClose}
          show={this.state.showModel}
          title="Configure Redash"
        >
          <Configuration
            label={this.state.label}
            appId={this.state.appId}
            baseUrl={this.state.baseUrl}
            privateKey={this.state.privateKey}
            fileUploaded={(e) => {
              this.fileUploaded(e);
            }}
            changed={(e, id) => {
              this.changeHandler(e, id);
            }}
          />
        </Model>
      </>
    );
  }
}
