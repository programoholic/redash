import React from "react";
import Input from "../UI/input/input";
import Button from "../UI/input/button";
import { Row, Col } from "react-bootstrap";
import AxiosClient from "../../core/axios";
import { Form } from "react-bootstrap";
import { Mauth } from "../../core/mauthClient";
const configuration = (props) => {
  const checkConnection = async () => {
    const mauth = new Mauth(props.appId, props.privateKey, {});
    const headers = mauth.generateMauthHeaders(
      "GET",
      "/sensor_studies/3Ti4nx7crI1rO3KKmRq6bF",
      {},
      {},
      ""
    );
    console.log("clicked : ", headers);
    const res = await AxiosClient.get(
      "/sensor_studies/3Ti4nx7crI1rO3KKmRq6bF",
      {
        proxy: {
          host: "localhost",
          port: 9090,
          protocol: "https",
          auth: false,
        },
        // headers:{...headers}
      }
    );
    console.log(res);
  };
  const fileUploaded = async (e) => {
    console.log(e);
    const file = e.target.files.item(0);
    console.log(file);
    const text = await file.text();
    console.log(text);
  };
  return (
    <>
      <Form.Group as={Row}>
        <Input
          type="file"
          label={props.label}
          onChange={(e) => {
            props.fileUploaded(e);
          }}
        />
      </Form.Group>
      <Form.Group as={Row}>
        <Input
          type="text"
          placeholder="enter base url"
          id="baseUrl"
          onChange={(e) => props.changed(e, "baseUrl")}
          value={props.baseUrl}
        />
      </Form.Group>
      <Form.Group as={Row}>
        <Input
          type="text"
          placeholder="enter app Id"
          id="appId"
          onChange={(e, id) => props.changed(e, "appId")}
          value={props.appId}
        />
      </Form.Group>
      <Form.Group as={Row}>
        <Button clicked={() => checkConnection()}> Check Connection</Button>
      </Form.Group>
      {/* <Row>
      <Col md={12}>
        <Input type="text" placeholder="enter base url" id="baseUrl" onChange={(e)=>props.changed(e,"baseUrl")} value={props.baseUrl} />
      </Col>
      <Col md={12}>
        <Input type="text" placeholder="enter app Id" id="appId" onChange={(e,id)=>props.changed(e,"appId")} value={props.appId}/>
      </Col>
      <Col md={12}>
        <Input type="file" label={props.label} onChange={(e)=>{props.fileUploaded(e)}} />
      </Col>
    </Row>
    <Row>
      <Col md={12}>
         <Button clicked={()=>checkConnection()}> Check Connection</Button>
      </Col>
    </Row> */}
    </>
  );
};

export default configuration;
