import React, { Component } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./container/dashboard/dashboard";
import { Layout } from "./hoc/Layout/Layout";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <Dashboard />
      </Layout>
    );
  }
}
export default App;
